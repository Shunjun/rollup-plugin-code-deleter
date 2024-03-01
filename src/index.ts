import type { Plugin } from 'rollup'
import { minimatch } from 'minimatch'
import { deleteCode } from './deleteCode'
import type { Config } from './types'
import { toArray } from './utils'

function codeDeleter(config: Config): Plugin {
  return {
    name: 'code-deleter',
    transform: {
      order: 'pre',
      handler(code, id) {
        const { ignorePath = [] } = config
        const isIgnorePath = toArray(ignorePath).some(pattern => minimatch(id, pattern))

        if (!/\.(t|j)sx?/.test(id) || !/code-deleter/.test(code) || isIgnorePath)
          return code

        return deleteCode(code, id, config)
      },
    },
  }
}

export default codeDeleter
