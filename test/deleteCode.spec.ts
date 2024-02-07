/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-05 22:43:21
 */

import { describe, expect, it } from 'vitest'
import { transform } from '@babel/core'

import { deleteCode } from '../src/deleteCode'
import type { Config } from '../src/types'

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

    const code = deleteCode(testCode)
    const transformCode = transform(resultCode)?.code

    expect(code).toEqual(transformCode)
  })

  it('variableDeclaration', () => {
    const testCode = `
    /* code-deleter */
    const aa = 1
    const bb = 2`
    const resultCode = `const bb = 2`

    const code = deleteCode(testCode)
    const transformCode = transform(resultCode)?.code

    expect(code).toEqual(transformCode)
  })
})

describe('config test', () => {
  it('delete', () => {
    const testCode = `const aa = {
      /* code-deleter: pc */
      a: "123",
      /* code-deleter: mobile */
      fn: () => {},
      /* code-deleter */
      obj: {
        c: 1
      },
      reg: /123/
    }`
    const resultCode = `const aa = {
      /* code-deleter: mobile */
      fn: () => {},
      reg: /123/
    }`
    const config: Config = {
      delete: ['pc'],
    }

    const code = deleteCode(testCode, config)
    const transformCode = transform(resultCode)?.code

    expect(code).toEqual(transformCode)
  })
})
