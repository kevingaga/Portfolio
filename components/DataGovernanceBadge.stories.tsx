import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DataGovernanceBadge from './DataGovernanceBadge';

const sampleData = {
  lineage: 'Traçabilité complète source → transformation → output',
  freshness: 'Refresh automatique hebdomadaire (cron GitHub Actions)',
  quality: 'Score de complétude et de cohérence calculé à chaque ingestion',
  documentation: 'Dictionnaire de données auto-généré',
  monitoring: 'Dashboard logs : succès/échecs, dernière exécution, alerting',
};

const meta = {
  title: 'Components/DataGovernanceBadge',
  component: DataGovernanceBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'inline-radio', options: ['compact', 'full'] },
  },
  args: {
    data: sampleData,
  },
} satisfies Meta<typeof DataGovernanceBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Compact: Story = {
  args: { variant: 'compact' },
};

export const Full: Story = {
  args: { variant: 'full' },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
};

export const PartialDimensions: Story = {
  args: {
    variant: 'full',
    data: {
      lineage: 'Multi-sources → normalisation → output unique',
      quality: "Règles de validation par type d'exception",
      documentation: 'README pipeline + dictionnaire données',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640 }}>
        <Story />
      </div>
    ),
  ],
};
