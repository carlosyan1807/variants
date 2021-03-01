import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'

import fs from 'fs'
import path from 'path'

import pkg from '../package.json'

const deps = Object.keys(pkg.dependencies)
const globals = {
  vue: 'Vue',
}

const config = []

config.push({
  input: 'packages/index.ts',
  output: [
    {
      dir: 'lib',
      format: 'esm',
      globals,
    },
  ],
  external(id) {
    return /^vue/.test(id) || deps.some((k) => new RegExp('^' + k).test(id))
  },
  plugins: [
    vue({ target: 'browser' }),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          removeComments: true,
        },
      },
      clean: true,
    }),
  ],
})

export default config
