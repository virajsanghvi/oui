import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox, ComboboxOption } from '@/components';
import { Avatar, AvatarFallback, AvatarImage } from '@/components';
import { useState } from 'react';
import { 
  Building2, 
  GraduationCap,
  Code,
  Globe,
  Plus,
  ChevronsUpDown
} from 'lucide-react';

const meta: Meta<typeof Combobox> = {
  title: 'UI/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when no option is selected',
    },
    searchPlaceholder: {
      control: { type: 'text' },
      description: 'Placeholder text for the search input',
    },
    emptyText: {
      control: { type: 'text' },
      description: 'Text shown when no options match the search',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the combobox is disabled',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'The size of the combobox',
    },
    onValueChange: {
      action: 'value-changed',
      description: 'Function called when the selected value changes',
    },
  },
  args: {
    onValueChange: (value: string) => console.log('Selected:', value),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for different use cases
const frameworkOptions: ComboboxOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'remix', label: 'Remix' },
];

const countryOptions: ComboboxOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'in', label: 'India' },
  { value: 'mx', label: 'Mexico' },
];

const departmentOptions: ComboboxOption[] = [
  { value: 'engineering', label: 'Engineering' },
  { value: 'design', label: 'Design' },
  { value: 'product', label: 'Product Management' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
  { value: 'operations', label: 'Operations' },
];

const skillOptions: ComboboxOption[] = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'swift', label: 'Swift' },
];

// Default combobox
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Combobox
        {...args}
        options={frameworkOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
        className="w-[200px]"
      />
    );
  },
};

// With default value
export const WithDefaultValue: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('react');
    
    return (
      <Combobox
        {...args}
        options={frameworkOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
        className="w-[200px]"
      />
    );
  },
};

// Small size
export const Small: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Combobox
        {...args}
        options={departmentOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select department..."
        size="sm"
        className="w-[180px]"
      />
    );
  },
};

// Large size
export const Large: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Combobox
        {...args}
        options={countryOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select country..."
        size="lg"
        className="w-[220px]"
      />
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('react');
    
    return (
      <Combobox
        {...args}
        options={frameworkOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select framework..."
        disabled
        className="w-[200px]"
      />
    );
  },
};

// Custom search and empty text
export const CustomText: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Combobox
        {...args}
        options={skillOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Choose your skill..."
        searchPlaceholder="Search programming languages..."
        emptyText="No programming language found."
        className="w-[250px]"
      />
    );
  },
};

// With some disabled options
export const WithDisabledOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    
    const optionsWithDisabled: ComboboxOption[] = [
      { value: 'frontend', label: 'Frontend Developer' },
      { value: 'backend', label: 'Backend Developer' },
      { value: 'fullstack', label: 'Full Stack Developer' },
      { value: 'devops', label: 'DevOps Engineer', disabled: true },
      { value: 'mobile', label: 'Mobile Developer' },
      { value: 'data', label: 'Data Scientist', disabled: true },
      { value: 'ml', label: 'ML Engineer', disabled: true },
      { value: 'security', label: 'Security Engineer' },
    ];
    
    return (
      <Combobox
        {...args}
        options={optionsWithDisabled}
        value={value}
        onValueChange={setValue}
        placeholder="Select role..."
        className="w-[200px]"
      />
    );
  },
};

// Form integration example
export const FormIntegration: Story = {
  render: (args) => {
    const [country, setCountry] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    
    return (
      <div className="w-[300px] space-y-6">
        <div className="space-y-2">
          <label htmlFor="country-combobox" className="text-sm font-medium">
            Country *
          </label>
          <Combobox
            {...args}
            options={countryOptions}
            value={country}
            onValueChange={setCountry}
            placeholder="Select your country..."
            searchPlaceholder="Search countries..."
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            Select your country for shipping and tax calculations
          </p>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="department-combobox" className="text-sm font-medium">
            Department
          </label>
          <Combobox
            {...args}
            options={departmentOptions}
            value={department}
            onValueChange={setDepartment}
            placeholder="Select department..."
            searchPlaceholder="Search departments..."
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            Choose the department you work in
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  },
};

// Long list with search
export const LongList: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>('');
    
    const cityOptions: ComboboxOption[] = [
      { value: 'new-york', label: 'New York' },
      { value: 'los-angeles', label: 'Los Angeles' },
      { value: 'chicago', label: 'Chicago' },
      { value: 'houston', label: 'Houston' },
      { value: 'phoenix', label: 'Phoenix' },
      { value: 'philadelphia', label: 'Philadelphia' },
      { value: 'san-antonio', label: 'San Antonio' },
      { value: 'san-diego', label: 'San Diego' },
      { value: 'dallas', label: 'Dallas' },
      { value: 'san-jose', label: 'San Jose' },
      { value: 'austin', label: 'Austin' },
      { value: 'jacksonville', label: 'Jacksonville' },
      { value: 'fort-worth', label: 'Fort Worth' },
      { value: 'columbus', label: 'Columbus' },
      { value: 'charlotte', label: 'Charlotte' },
      { value: 'san-francisco', label: 'San Francisco' },
      { value: 'indianapolis', label: 'Indianapolis' },
      { value: 'seattle', label: 'Seattle' },
      { value: 'denver', label: 'Denver' },
      { value: 'washington', label: 'Washington DC' },
      { value: 'boston', label: 'Boston' },
      { value: 'nashville', label: 'Nashville' },
      { value: 'baltimore', label: 'Baltimore' },
      { value: 'oklahoma-city', label: 'Oklahoma City' },
      { value: 'portland', label: 'Portland' },
    ];
    
    return (
      <Combobox
        {...args}
        options={cityOptions}
        value={value}
        onValueChange={setValue}
        placeholder="Select city..."
        searchPlaceholder="Search cities..."
        emptyText="No city found."
        className="w-[200px]"
      />
    );
  },
};

// Showcase - All sizes
export const AllSizes: Story = {
  render: () => {
    const [smallValue, setSmallValue] = useState<string>('');
    const [defaultValue, setDefaultValue] = useState<string>('');
    const [largeValue, setLargeValue] = useState<string>('');
    
    return (
      <div className="flex items-end gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Small</label>
          <Combobox
            options={frameworkOptions}
            value={smallValue}
            onValueChange={setSmallValue}
            placeholder="Select..."
            size="sm"
            className="w-[140px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Default</label>
          <Combobox
            options={frameworkOptions}
            value={defaultValue}
            onValueChange={setDefaultValue}
            placeholder="Select..."
            size="default"
            className="w-[160px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Large</label>
          <Combobox
            options={frameworkOptions}
            value={largeValue}
            onValueChange={setLargeValue}
            placeholder="Select..."
            size="lg"
            className="w-[180px]"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'All available combobox sizes displayed together.',
      },
    },
  },
};

// Showcase - All states
export const AllStates: Story = {
  render: () => {
    const [emptyValue, setEmptyValue] = useState<string>('');
    const [selectedValue, setSelectedValue] = useState<string>('react');
    const [disabledValue, setDisabledValue] = useState<string>('vue');
    
    return (
      <div className="flex flex-wrap gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Empty</label>
          <Combobox
            options={frameworkOptions}
            value={emptyValue}
            onValueChange={setEmptyValue}
            placeholder="Select framework..."
            className="w-[180px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">With Selection</label>
          <Combobox
            options={frameworkOptions}
            value={selectedValue}
            onValueChange={setSelectedValue}
            placeholder="Select framework..."
            className="w-[180px]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Disabled</label>
          <Combobox
            options={frameworkOptions}
            value={disabledValue}
            onValueChange={setDisabledValue}
            placeholder="Select framework..."
            disabled
            className="w-[180px]"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'All available combobox states displayed together.',
      },
    },
  },
};

// Showcase - Different use cases
export const UseCases: Story = {
  render: () => {
    const [framework, setFramework] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [skill, setSkill] = useState<string>('');
    const [department, setDepartment] = useState<string>('');
    
    return (
      <div className="grid grid-cols-2 gap-6 w-[500px]">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <label className="text-sm font-medium">Framework</label>
          </div>
          <Combobox
            options={frameworkOptions}
            value={framework}
            onValueChange={setFramework}
            placeholder="Choose framework..."
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <label className="text-sm font-medium">Country</label>
          </div>
          <Combobox
            options={countryOptions}
            value={country}
            onValueChange={setCountry}
            placeholder="Select country..."
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <label className="text-sm font-medium">Skill</label>
          </div>
          <Combobox
            options={skillOptions}
            value={skill}
            onValueChange={setSkill}
            placeholder="Choose skill..."
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <label className="text-sm font-medium">Department</label>
          </div>
          <Combobox
            options={departmentOptions}
            value={department}
            onValueChange={setDepartment}
            placeholder="Select department..."
            className="w-full"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Different use cases for the combobox component with contextually appropriate content.',
      },
    },
  },
};
// User Selection with Avatars and Actions
export const UserSelection: StoryObj = {
  render: () => {
    const [selectedUser, setSelectedUser] = useState<string>('shadcn');
    
    const userOptions: ComboboxOption[] = [
      {
        value: 'shadcn',
        label: 'shadcn',
        content: (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <span>shadcn</span>
          </div>
        ),
      },
      {
        value: 'leerob',
        label: 'leerob',
        content: (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/leerob.png" alt="leerob" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <span>leerob</span>
          </div>
        ),
      },
      {
        value: 'evilrabbit',
        label: 'evilrabbit',
        content: (
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://github.com/evilrabbit.png" alt="evilrabbit" />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <span>evilrabbit</span>
          </div>
        ),
      },
      {
        value: 'create-user',
        label: 'Create user',
        isAction: true,
        content: (
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-muted-foreground">
              <Plus className="h-3 w-3" />
            </div>
            <span>Create user</span>
          </div>
        ),
      },
    ];

    const handleUserChange = (value: string) => {
      setSelectedUser(value);
    };

    const handleActionSelect = (action: string) => {
      if (action === 'create-user') {
        alert('Create user action triggered!');
      }
    };

    const selectedOption = userOptions.find(user => user.value === selectedUser && !user.isAction);

    return (
      <div className="w-[240px]">
        <Combobox
          options={userOptions}
          value={selectedUser}
          onValueChange={handleUserChange}
          onActionSelect={handleActionSelect}
          placeholder="Search user..."
          searchPlaceholder="Search user..."
          emptyText="No user found."
          className="w-full"
          popoverClassName="w-[240px]"
          renderTrigger={(selectedOptions) => {
            const selectedOption = Array.isArray(selectedOptions) ? selectedOptions[0] : selectedOptions;
            return (
              <button className="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                {selectedOption ? (
                  selectedOption.content
                ) : (
                  <span className="text-muted-foreground">Search user...</span>
                )}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </button>
            );
          }}
        />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'User selection combobox with avatars and action items. Demonstrates custom content rendering and action handling.',
      },
    },
  },
};

// Multi Selection
export const MultiSelection: StoryObj = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['react', 'typescript']);
    
    const techOptions: ComboboxOption[] = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'csharp', label: 'C#' },
      { value: 'go', label: 'Go' },
    ];

    return (
      <div className="w-[350px]">
        <Combobox
          multiple
          options={techOptions}
          values={selectedValues}
          onValuesChange={setSelectedValues}
          placeholder="Select technologies..."
          searchPlaceholder="Search technologies..."
          emptyText="No technology found."
          className="w-full"
          popoverClassName="w-[350px]"
        />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Multi-selection combobox with checkboxes and badge display for selected items.',
      },
    },
  },
};

// Multi Selection with Categories
export const MultiSelectionWithCategories: StoryObj = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>(['react', 'nodejs']);
    
    const skillOptions: ComboboxOption[] = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'express', label: 'Express.js' },
      { value: 'nestjs', label: 'NestJS' },
      { value: 'fastify', label: 'Fastify' },
      { value: 'postgresql', label: 'PostgreSQL' },
      { value: 'mongodb', label: 'MongoDB' },
      { value: 'redis', label: 'Redis' },
      { value: 'mysql', label: 'MySQL' },
    ];

    return (
      <div className="w-[350px] space-y-2">
        <label className="text-sm font-medium">Technical Skills</label>
        <Combobox
          multiple
          options={skillOptions}
          values={selectedSkills}
          onValuesChange={setSelectedSkills}
          placeholder="Select your skills..."
          searchPlaceholder="Search skills..."
          emptyText="No skill found."
          className="w-full"
          popoverClassName="w-[350px]"
        />
        <p className="text-sm text-muted-foreground">
          Select multiple technologies you're proficient in
        </p>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Multi-selection combobox in a form context with labels and descriptions.',
      },
    },
  },
};

// Empty Multi Selection
export const EmptyMultiSelection: StoryObj = {
  render: () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    
    return (
      <div className="w-[250px]">
        <Combobox
          multiple
          options={frameworkOptions}
          values={selectedItems}
          onValuesChange={setSelectedItems}
          placeholder="Choose frameworks..."
          searchPlaceholder="Search frameworks..."
          className="w-full"
        />
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Multi-selection combobox with no initial selections.',
      },
    },
  },
};

// Multi Selection with Overflow
export const MultiSelectionWithOverflow: StoryObj = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(['react', 'vue', 'angular', 'svelte', 'typescript']);
    
    const techOptions: ComboboxOption[] = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'javascript', label: 'JavaScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'csharp', label: 'C#' },
      { value: 'go', label: 'Go' },
    ];

    return (
      <div className="w-[400px] space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Technologies (max 2 visible)</label>
          <Combobox
            multiple
            options={techOptions}
            values={selectedValues}
            onValuesChange={setSelectedValues}
            maxVisibleItems={2}
            placeholder="Select technologies..."
            searchPlaceholder="Search technologies..."
            emptyText="No technology found."
            className="w-full"
            popoverClassName="w-[400px]"
          />
          <p className="text-sm text-muted-foreground">
            Shows first 2 items, then "+X more" for overflow
          </p>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Technologies (max 3 visible)</label>
          <Combobox
            multiple
            options={techOptions}
            values={selectedValues}
            onValuesChange={setSelectedValues}
            maxVisibleItems={3}
            placeholder="Select technologies..."
            searchPlaceholder="Search technologies..."
            emptyText="No technology found."
            className="w-full"
            popoverClassName="w-[400px]"
          />
          <p className="text-sm text-muted-foreground">
            Shows first 3 items, then "+X more" for overflow
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Multi-selection combobox with overflow indicator. Shows a limited number of badges and displays "+X more" for additional selections.',
      },
    },
  },
};