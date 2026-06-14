import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProjectCard from './ProjectCard';
import { projects } from '@/data/projects';

const meta = {
  title: 'Components/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DataViz: Story = {
  args: { project: projects[0] },
};

export const DataEngineering: Story = {
  args: { project: projects[1] },
};

export const Automation: Story = {
  args: { project: projects[2] },
};

export const Game: Story = {
  args: { project: projects[4] },
};

export const Gallery: Story = {
  args: { project: projects[0] },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 900 }}>
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} index={i} />
      ))}
    </div>
  ),
};
