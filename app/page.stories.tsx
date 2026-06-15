import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import HomePage from './page';

const meta = {
  title: 'Pages/Home',
  component: HomePage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The landing page (`app/page.tsx`): hero, "what I build" pillars, projects preview and contact CTA. Rendered without the global Nav/Footer (those live in the root layout).',
      },
    },
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
