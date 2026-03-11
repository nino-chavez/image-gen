/**
 * Signal Dispatch Brand Style System
 * For Substack newsletter and related branding assets
 */

export const SIGNAL_DISPATCH_STYLES = {
  name: 'signal-dispatch',
  description: 'Signal Dispatch brand identity - dark, professional, tech-focused',

  // Brand colors extracted from ninochavez.co/blog
  colors: {
    background: '#0A0A0B',       // Near-black
    backgroundSecondary: '#121214',
    accent: '#E86C5D',           // Coral/salmon red (primary accent)
    accentSecondary: '#00CED1',  // Cyan/teal (secondary accent)
    text: '#FFFFFF',
    textMuted: '#9CA3AF',
    cardBackground: '#1A1A1D',
  },

  styles: {
    'banner': {
      background: 'Near-black gradient (#0A0A0B to #121214) - smooth horizontal transition',
      lineColor: 'Coral red accent (#E86C5D) with cyan highlights (#00CED1)',
      style: 'Minimalist tech aesthetic - clean lines, subtle geometric patterns, professional',
      elements: 'Abstract signal waves, circuit-like patterns, geometric nodes, subtle grid',
      personality: 'Sophisticated, analytical, forward-thinking',
    },
    'header': {
      background: 'Pure dark (#0A0A0B) with subtle texture',
      lineColor: 'Coral accent (#E86C5D) for emphasis, white for typography',
      style: 'Bold wordmark with minimal decoration - let typography breathe',
      elements: 'Signal waveforms, subtle network patterns, geometric accents',
      personality: 'Confident, clear, authoritative',
    },
    'social': {
      background: 'Dark gradient with coral accent glow',
      lineColor: 'Cyan (#00CED1) primary, coral (#E86C5D) secondary',
      style: 'Eye-catching but professional - stands out in feeds',
      elements: 'Abstract data visualization, flowing lines, tech motifs',
      personality: 'Modern, tech-savvy, thought-leader',
    },
  },

  default: {
    background: 'Near-black (#0A0A0B) with subtle depth',
    lineColor: 'Coral red (#E86C5D) with cyan accents (#00CED1)',
    style: 'Clean, dark, professional tech aesthetic',
    elements: 'Abstract geometric patterns, signal waves, network nodes',
    personality: 'Analytical mind sharing strategic insights',
  },

  // Typography guidance
  typography: {
    heading: 'Modern serif or clean sans-serif, slightly italicized for "Signal"',
    tagline: 'Light weight, subtle, professional',
  },

  // Brand tagline
  tagline: 'Strategy, insights, and the signals that matter',
};
