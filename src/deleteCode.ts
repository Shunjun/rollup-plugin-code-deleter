import { parseSync, transformFromAstSync } from '@babel/core'
import type { NodePath } from '@babel/traverse'
import traverse from '@babel/traverse'
import type { Comment } from '@babel/types'
import { minimatch } from 'minimatch'
import type { Config } from './types'

export function deleteCode(code: string, config?: Config) {
  try {
    const ast = parseSync(code, { ...config?.babelOptions, babelrc: false })
    if (!ast)
      return code

    const removePath: NodePath[] = []
    traverse(ast, {
      enter(path) {
        const leadingComments = path.node.leadingComments || []
        if (leadingComments.length > 0 && checkComments(leadingComments, config?.delete || [])) {
          removePath.push(path)
          path.skip()
        }
      },
    })
    removePath.forEach(item => item.remove())
    const result = transformFromAstSync(ast)

    return result?.code || code
  }
  catch (error) {
    return code
  }
}

function checkComments(
  comments: Comment[],
  deleteConfig: string [],
) {
  const deleteIds: string[] = []
  const deleteIndex: number[] = []

  comments.forEach ((comment, index) => {
    if (checkId(comment.value)) {
      const ids = getIds(comment.value)
      deleteIds.push(...ids)
      deleteIndex.push (index)
    }
  })

  let shouldDelete = false

  if (!deleteConfig.length) {
    // delete all
    shouldDelete = !!deleteIds.length
  }
  else {
    // test deleteId with miniMatch
    shouldDelete = deleteIds.some((id) => {
      if (id === 'all')
        return true
      return deleteConfig.some(pattern => minimatch(id, pattern))
    })
  }

  if (shouldDelete)
    deleteIndex.reverse().forEach(index => comments.splice(index, 1))

  return shouldDelete
}

function getIds(value: string) {
  if (checkId(value)) {
    const comment = getComment(value)
    const idString = comment.replace('code-deleter', '').replace(/^:/, '').trim()

    if (!idString)
      return ['all']

    return idString.split(',').map(item => item.trim())
  }
  return []
}

function checkId(value: string) {
  const comment = getComment (value)
  return comment.startsWith('code-deleter')
}

function getComment(value: string) {
  return value.trim().replace(/(^\**\s*)|(\s*\**$)/g, '')
}
