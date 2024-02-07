import type { Plugin } from 'rollup'
import { minimatch } from 'minimatch'
import { deleteCode } from './deleteCode'
import type { Config } from './types'

function codeDeleter(config: Config): Plugin {
  return {
    name: 'code-deleter',
    transform: {
      order: 'pre',
      handler(code, id) {
        const { ignorePath = [] } = config

        if (toArray(ignorePath).some(pattern => minimatch(id, pattern)))
          return code

        if (!/\.(t|j)sx?/.test(id))
          return code

        return deleteCode(code, config)
      },
    },
  }
}

function toArray<T>(some: T | T[]): T[] {
  if (Array.isArray(some))
    return some
  return [some]
}

export default codeDeleter
