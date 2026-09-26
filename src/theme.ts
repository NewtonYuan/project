/** Colours sampled from the six solid swatches in the Blush Fairytale reference. */
export const theme = {
  colors: {
    cream: '#FFF9F2',
    sand: '#D9C5A6',
    blush: '#E7C6C0',
    lavender: '#DACBE4',
    sage: '#B9C5AE',
    blue: '#166198',
  },
  text: '#000000',
} as const

export type ThemeColor = keyof typeof theme.colors
