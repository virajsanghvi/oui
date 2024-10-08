/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { defaultSyntax, ParseOptions, Syntax } from './default_syntax';
import { executeAst } from './execute_ast';
import { isNil, isString } from '../../../services/predicate';
import { astToOpenSearchQueryDsl } from './ast_to_opensearch_query_dsl';
import { astToOpenSearchQueryString } from './ast_to_opensearch_query_string';
import { _AST, AST, Clause, Operator, OperatorType, Value } from './ast';

/**
 * This is the consumer interface for the query - it's effectively a wrapper construct around
 * the AST and some of its related utility functions (e.g. parsing, text representation, executing, etc...)
 * It is immutable - all mutating operations return a new (mutated) query instance.
 */
export class Query {
  static parse(
    text: string,
    options?: ParseOptions,
    syntax: Syntax = defaultSyntax
  ) {
    return new Query(syntax.parse(text, options), syntax, text);
  }

  static isMust(clause: Clause) {
    return AST.Match.isMustClause(clause);
  }

  static MATCH_ALL = Query.parse('');

  static isTerm(clause: Clause) {
    return AST.Term.isInstance(clause);
  }

  static isIs(clause: Clause) {
    return AST.Is.isInstance(clause);
  }

  static isField(clause: Clause) {
    return AST.Field.isInstance(clause);
  }

  // This ought to be `private`, but OSD has some customizations that rely on access to this field
  public ast: _AST;
  public text: string;
  private syntax: Syntax;

  constructor(ast: _AST, syntax: Syntax = defaultSyntax, text?: string) {
    this.ast = ast;
    this.text = text || syntax.print(ast);
    this.syntax = syntax;
  }

  hasSimpleFieldClause(field: string, value?: string) {
    return this.ast.hasSimpleFieldClause(field, value);
  }

  getSimpleFieldClause(field: string, value?: Value) {
    return this.ast.getSimpleFieldClause(field, value);
  }

  removeSimpleFieldClauses(field: string) {
    const ast = this.ast.removeSimpleFieldClauses(field);
    return new Query(ast, this.syntax);
  }

  addSimpleFieldValue(
    field: string,
    value: Value,
    must = true,
    operator: OperatorType = Operator.EQ
  ) {
    const ast = this.ast.addSimpleFieldValue(field, value, must, operator);
    return new Query(ast, this.syntax);
  }

  removeSimpleFieldValue(field: string, value: Value) {
    const ast = this.ast.removeSimpleFieldValue(field, value);
    return new Query(ast, this.syntax);
  }

  hasOrFieldClause(field: string, value?: Value) {
    return this.ast.hasOrFieldClause(field, value);
  }

  getOrFieldClause(field: string, value?: Value) {
    return this.ast.getOrFieldClause(field, value);
  }

  addOrFieldValue(
    field: string,
    value: Value,
    must = true,
    operator: OperatorType = Operator.EQ
  ) {
    const ast = this.ast.addOrFieldValue(field, value, must, operator);
    return new Query(ast, this.syntax);
  }

  removeOrFieldValue(field: string, value: Value) {
    const ast = this.ast.removeOrFieldValue(field, value);
    return new Query(ast, this.syntax);
  }

  removeOrFieldClauses(field: string) {
    const ast = this.ast.removeOrFieldClauses(field);
    return new Query(ast, this.syntax);
  }

  hasIsClause(flag: string) {
    return !isNil(this.ast.getIsClause(flag));
  }

  getIsClause(flag: string) {
    return this.ast.getIsClause(flag);
  }

  addMustIsClause(flag: string) {
    const ast = this.ast.addClause(AST.Is.must(flag));
    return new Query(ast, this.syntax);
  }

  addMustNotIsClause(flag: string) {
    const ast = this.ast.addClause(AST.Is.mustNot(flag));
    return new Query(ast, this.syntax);
  }

  removeIsClause(flag: string) {
    const ast = this.ast.removeIsClause(flag);
    return new Query(ast, this.syntax);
  }

  /**
   * Executes this query over the given iterable item and returns
   * a new array of all items that matched this query. Options:
   *
   * defaultFields: string[]
   *
   *    An array of field names to match the default clauses against. When not specified, the query
   *    will pick up all the string fields of each record and try to match against those.
   *
   * isClauseMatcher?: (record: any, flag: string, applied: boolean, explain?: []) => boolean
   *
   *    By default, the 'is' clauses will try to match against boolean fields - where the flag of the clause
   *    indicates the field name. You can change this behaviour by providing this matcher function for the
   *    is clause. For example, if the object has a `tags` field, one can create a matcher that checks if
   *    an object has a specific tag (e.g. "is:marketing", "is:kitchen", etc.)
   *
   * explain?: boolean
   *
   *    When set to `true`, each item in the returns array will have an `__explain` field that will hold
   *    information about why the objects matched the query (default to `false`, mainly/only useful for
   *    debugging)
   */
  static execute<T>(query: string | Query, items: T[], options = {}): T[] {
    const q = isString(query) ? Query.parse(query) : query;
    return executeAst(q.ast, items, options);
  }

  /**
   * Builds and returns an OpenSearch query out this query. Options:
   *
   * defaultFields?: string[]
   *
   *    An array of field names to match the default clauses against. When not specified, the query
   *    will pick up all the string fields of each record and try to match against those.
   *
   * isToQuery?: (flag: string, on: boolean) => Object (OpenSearch query object)
   *
   *    By default, "is" clauses will be translated to a term query where the flag is the field
   *    and the "on" value will be the value of the field. This function lets you change this default
   *    translation and provide your own custom one.
   *
   * termValuesToQuery?: (values: string[]) => Object (OpenSearch query object)
   *
   *    By default, "term" clauses will be translated to a "simple_query_string" query where all
   *    the values serve as terms in the query string. This function lets you change this default
   *    translation and provide your own custom one.
   *
   * fieldValuesToAndQuery?: (field: string, values: string[]) => Object (OpenSearch query object)
   *
   *    By default, "field" clauses will be translated to a match query where all the values serve as
   *    terms in the query (the operator is AND). This function lets you change this default translation
   *    and provide your own custom one.
   */
  static toOpenSearchQuery(query: string | Query, options = {}) {
    const q = isString(query) ? Query.parse(query) : query;
    return astToOpenSearchQueryDsl(q.ast, options);
  }

  static toOpenSearchQueryString(query: string | Query) {
    const q = isString(query) ? Query.parse(query) : query;
    return astToOpenSearchQueryString(q.ast);
  }

  // @deprecated Use `toOpenSearchQuery` instead
  static toESQuery(query: string | Query, options = {}) {
    return Query.toOpenSearchQuery(query, options);
  }

  // @deprecated Use `toOpenSearchQueryString` instead
  static toESQueryString(query: string | Query) {
    return Query.toOpenSearchQueryString(query);
  }
}
