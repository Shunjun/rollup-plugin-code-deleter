import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: ['rollup'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
