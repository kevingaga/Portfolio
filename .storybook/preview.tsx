import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { LanguageProvider } from '../lib/i18n/LanguageContext';
import '../app/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // App Router hooks (usePathname, useRouter…) are mocked by @storybook/nextjs.
    nextjs: {
      appDirectory: true,
    },
    // The portfolio is a dark UI — match it so components render in context.
    backgrounds: {
      options: {
        dark: { name: 'Dark', value: '#080c10' },
        surface: { name: 'Surface', value: '#0f1520' },
        light: { name: 'Light', value: '#ffffff' },
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  initialGlobals: {
    backgrounds: { value: 'dark' },
  },
  decorators: [
    (Story) => (
      <LanguageProvider>
        {/* cursor:auto overrides the global `cursor:none` so Storybook stays usable */}
        <div style={{ padding: '2rem', cursor: 'auto' }}>
          <Story />
        </div>
      </LanguageProvider>
    ),
  ],
};

export default preview;
