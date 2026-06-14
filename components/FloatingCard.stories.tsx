import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import FloatingCard from './FloatingCard';

const meta = {
  title: 'Components/FloatingCard',
  component: FloatingCard,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    value: { control: 'text' },
    icon: { control: 'text' },
    delay: { control: { type: 'range', min: 0, max: 3, step: 0.1 } },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FloatingCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Experience',
    value: '4 years · Air France, Sanofi, Decathlon',
    icon: '💼',
    delay: 0,
  },
};

export const Location: Story = {
  args: {
    title: 'Based in',
    value: 'Blagnac, France',
    icon: '📍',
    delay: 0.2,
  },
};

export const Stacked: Story = {
  args: { title: '', value: '', icon: '' },
  render: () => (
    <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <FloatingCard title="Experience" value="4 years in data" icon="💼" delay={0} />
      <FloatingCard title="Stack" value="Python · SQL · Next.js" icon="⚙️" delay={0.3} />
      <FloatingCard title="Focus" value="Data Governance" icon="🛡" delay={0.6} />
    </div>
  ),
};
