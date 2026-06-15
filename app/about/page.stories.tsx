import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AboutPage from './page';

const meta = {
  title: 'Pages/About',
  component: AboutPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The about page (`app/about/page.tsx`): identity, bio, languages, interests, contact, the experience timeline and the interactive skill galaxy.',
      },
    },
  },
} satisfies Meta<typeof AboutPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
