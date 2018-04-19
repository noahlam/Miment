import cjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

export default {
  input: './src/miment.js',
  output: {
    file: './dist/miment.min.js',
    format: 'umd',
    name: 'miment'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    cjs(),
    uglify({}, minify)
  ]
}
