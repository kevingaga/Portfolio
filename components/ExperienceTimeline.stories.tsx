import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ExperienceTimeline from './ExperienceTimeline';

const meta = {
  title: 'Components/ExperienceTimeline',
  component: ExperienceTimeline,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ExperienceTimeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
