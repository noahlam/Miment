import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  input: './src/miment.js',
  output: {
    file: './lib/miment.js',
    format: 'cjs',
    name: 'miment',
    sourcemap: true
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    cjs()
  ]
}
