import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProjectDetail from './ProjectDetail';
import { projects } from '@/data/projects';

const meta = {
  title: 'Pages/ProjectDetail',
  component: ProjectDetail,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProjectDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithGovernance: Story = {
  args: { project: projects[0] },
};

export const WithoutGovernance: Story = {
  args: { project: projects[3] },
};

export const Game: Story = {
  args: { project: projects[4] },
};
