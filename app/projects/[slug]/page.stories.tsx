import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { projects } from '@/data/projects';
import ProjectPage from './page';

const slugs = projects.map((p) => p.slug);

type Args = { slug: string };

const meta: Meta<Args> = {
  title: 'Pages/Project detail',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The dynamic project page (`app/projects/[slug]/page.tsx`). Switch the `slug` control to preview any project; each maps to a route like `/projects/<slug>`.',
      },
    },
  },
  args: { slug: slugs[0] },
  argTypes: {
    slug: { control: 'select', options: slugs },
  },
  render: ({ slug }) => <ProjectPage params={{ slug }} />,
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
