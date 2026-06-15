import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DEFAULT_LAYOUT } from '@/data/skillGalaxy';
import SkillGalaxy, { type SkillGalaxyProps } from './SkillGalaxy';

const meta: Meta<SkillGalaxyProps> = {
  title: 'Components/SkillGalaxy',
  component: SkillGalaxy,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A stellar map of skills: six clusters (families), each a coloured nebula of planets. Planet size = mastery, links = real connections. Click a planet for its card, drag a cluster name to reposition it, scroll to zoom, drag the background to pan.',
      },
    },
  },
  argTypes: {
    crownR: {
      control: { type: 'range', min: 120, max: 320, step: 2 },
      description: 'Distance of each family cluster from the galaxy core.',
    },
    clusterBase: {
      control: { type: 'range', min: 0, max: 60, step: 1 },
      description: 'Floor radius of a one-planet cluster.',
    },
    nodeSpacing: {
      control: { type: 'range', min: 10, max: 70, step: 1 },
      description: 'How far planets spread within a cluster.',
    },
    editable: {
      control: 'boolean',
      description:
        'Drag whole clusters to reposition them; the on-canvas panel shows a paste-ready snippet of the values.',
    },
  },
  args: {
    crownR: DEFAULT_LAYOUT.crownR,
    clusterBase: DEFAULT_LAYOUT.clusterBase,
    nodeSpacing: DEFAULT_LAYOUT.nodeSpacing,
    editable: false,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<SkillGalaxyProps>;

export const Default: Story = {};

/**
 * Tuning playground: use the sliders (crownR / clusterBase / nodeSpacing) to
 * shape the clusters, then drag each cluster to nudge it. The panel at the
 * bottom-left prints the exact `computeLayout({ … })` call — copy it into
 * `DEFAULT_LAYOUT` / `computeLayout` in `data/skillGalaxy.ts`.
 */
export const Playground: Story = {
  args: {
    editable: true,
    crownR: 268,
    clusterBase: 33,
    nodeSpacing: 22
  },
};
