import { defineConfig, Options } from 'tsup'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig((options: Options) => ({
  clean: true,
  dts: true,
  treeshake: true,
  splitting: true,
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: isProduction,
  sourcemap: true,
  ...options,
}))
