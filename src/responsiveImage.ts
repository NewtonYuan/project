import { imageVariants } from './imageVariants'

export function responsiveImage(src: string, sizes: string) {
  return { src, ...imageVariants[src], sizes, decoding: 'async' as const }
}
