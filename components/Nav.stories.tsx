import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Nav from './Nav';

const meta = {
  title: 'Layout/Nav',
  component: Nav,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 240 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/' },
    },
  },
};

export const ProjectsActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/projects' },
    },
  },
};
