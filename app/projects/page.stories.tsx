import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProjectsPage from './page';

const meta = {
  title: 'Pages/Projects',
  component: ProjectsPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The projects index (`app/projects/page.tsx`): category filters plus the responsive table (desktop) / card list (mobile). Use the filter buttons to preview the filtered states.',
      },
    },
  },
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
