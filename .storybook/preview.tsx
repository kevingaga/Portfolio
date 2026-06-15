import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { Epilogue, JetBrains_Mono, Lora } from 'next/font/google';
import { LanguageProvider } from '../lib/i18n/LanguageContext';
import '../app/globals.css';

// Same fonts as app/layout.tsx, so stories (and full pages) render with the
// real typography instead of falling back to the generic families.
const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});
const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const fontVars = `${epilogue.variable} ${jetbrainsMono.variable} ${lora.variable}`;

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
    (Story, context) => {
      // Full pages (layout: 'fullscreen') render edge-to-edge; components get
      // some breathing room. cursor:auto overrides the global `cursor:none`.
      const fullscreen = context.parameters.layout === 'fullscreen';
      return (
        <LanguageProvider>
          <div className={fontVars} style={{ padding: fullscreen ? 0 : '2rem', cursor: 'auto' }}>
            <Story />
          </div>
        </LanguageProvider>
      );
    },
  ],
};

export default preview;
