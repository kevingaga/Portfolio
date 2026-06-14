import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import StatBox from './StatBox';

const meta = {
  title: 'Components/StatBox',
  component: StatBox,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof StatBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '500k+',
    label: 'lignes traitées',
  },
};

export const Percentage: Story = {
  args: {
    value: '99%',
    label: 'uptime',
  },
};

export const Latency: Story = {
  args: {
    value: '< 200ms',
    label: 'queries',
  },
};

export const Grid: Story = {
  args: { value: '', label: '' },
  render: () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
      <StatBox value="500k+" label="lignes traitées" />
      <StatBox value="99%" label="uptime" />
      <StatBox value="< 200ms" label="queries" />
      <StatBox value="4" label="sites simulés" />
    </div>
  ),
};
