#!/usr/bin/env npx tsx

import * as fs from 'fs';
import * as path from 'path';

/**
 * Wraps generated CSS in @scope(.oui2) to (.oui2-end)
 * and includes OUI1 reset unsets
 */
function scopeCSS(): void {
  const cssPath = path.join(__dirname, '../dist/style.css');
  const resetPath = path.join(__dirname, '../src/styles/unset-oui1.css');
  const scopedPath = path.join(__dirname, '../dist/style.scoped.css');

  if (!fs.existsSync(cssPath)) {
    console.error('❌ CSS file not found at:', cssPath);
    process.exit(1);
  }

  if (!fs.existsSync(resetPath)) {
    console.error('❌ Unset CSS file not found at:', resetPath);
    process.exit(1);
  }

  const css = fs.readFileSync(cssPath, 'utf8');
  const resetCSS = fs.readFileSync(resetPath, 'utf8');

  // Create scoped CSS using @scope
  const scopedCSS = `/* OUI2 Library - Scoped CSS */
/* Uses CSS @scope to limit styles from .oui2 to .oui2-end */

@scope (.oui2) to (.oui2-end) {
  /* Include OUI1 reset unsets to prevent conflicts */
${resetCSS.replace(/^/gm, '  ')}

  /* OUI2 Component Styles */
${css.replace(/^/gm, '  ')}
}

/* Fallback for browsers that don't support @scope */
@supports not (selector(@scope)) {
  .oui2 {
    /* OUI1 reset unsets */
${resetCSS.replace(/^/gm, '    ')}

    /* OUI2 Component Styles */
${css.replace(/^/gm, '    ')}
  }
}
`;

  fs.writeFileSync(scopedPath, scopedCSS);
  console.log('✅ Scoped CSS created at:', scopedPath);
  console.log('🔧 Usage: Wrap your OUI2 components in <div className="oui2">...</div>');
  console.log('🔚 Optional: Use <div className="oui2-end"></div> to limit scope');
  console.log('📖 CSS @scope limits styles from .oui2 to .oui2-end boundaries');
}

if (require.main === module) {
  scopeCSS();
}

export { scopeCSS };