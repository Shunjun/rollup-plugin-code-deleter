/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-05 22:43:21
 */

import { describe, expect, it } from 'vitest'
import { transform } from '@babel/core'

import { deleteCode } from '../src/deleteCode'

describe('delete test', () => {
  it('objectProperty', () => {
    const testCode = `const aa = {
      /* code-deleter */
      type: '123',
      render: () => {}
    }`
    const resultCode = `const aa = {
      render: () => {}
    }`

    try {
      const code = deleteCode(testCode)
      const transformCode = transform(resultCode)?.code

      expect(code).toEqual(transformCode)
    }
    catch (error) {}
  })

  it('variableDeclaration', () => {
    const testCode = `
    /* code-deleter */
    const aa = 1
    const bb = 2`
    const resultCode = `const bb = 2`

    try {
      const code = deleteCode(testCode)
      const transformCode = transform(resultCode)?.code

      expect(code).toEqual(transformCode)
    }
    catch (error) {}
  })
})
