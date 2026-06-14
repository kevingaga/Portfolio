import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SkillGraph from './SkillGraph';

const meta = {
  title: 'Components/SkillGraph',
  component: SkillGraph,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Skills grouped into thematic zones (Data, Dev, Automation). Bubble size scales with proficiency level.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SkillGraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
