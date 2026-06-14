import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SkillBar from './SkillBar';

const meta = {
  title: 'Components/SkillBar',
  component: SkillBar,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    level: { control: { type: 'range', min: 0, max: 100, step: 5 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SkillBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expert: Story = {
  args: { name: 'Python / Pandas', level: 90 },
};

export const Advanced: Story = {
  args: { name: 'SQL / PostgreSQL', level: 85 },
};

export const Proficient: Story = {
  args: { name: 'Next.js / React', level: 75 },
};

export const Intermediate: Story = {
  args: { name: 'Java', level: 65 },
};

export const Stack: Story = {
  args: { name: '', level: 0 },
  render: () => (
    <div style={{ width: 360, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <SkillBar name="Python / Pandas" level={90} />
      <SkillBar name="SQL / PostgreSQL" level={85} />
      <SkillBar name="Power BI / ECharts" level={85} />
      <SkillBar name="Next.js / React" level={75} />
      <SkillBar name="Java" level={70} />
    </div>
  ),
};
