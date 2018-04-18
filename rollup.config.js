import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

export default {
    input: 'src/miment.js',
    output: {
        file: 'dist/miment-min.js',
        name: 'miment',
        format: 'umd'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        cjs(),
        filesize(),
        uglify()
    ]
};
