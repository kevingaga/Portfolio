import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CustomCursor from './CustomCursor';

const meta = {
  title: 'Components/CustomCursor',
  component: CustomCursor,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          minHeight: 360,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <p className="font-mono text-sm text-[var(--muted)]">
          Bouge la souris dans cette zone — l&apos;anneau suit le curseur et
          grossit au survol des éléments interactifs.
        </p>
        <button className="glass rounded-lg px-4 py-2 font-mono text-sm text-[var(--text)]">
          Survole-moi
        </button>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomCursor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
