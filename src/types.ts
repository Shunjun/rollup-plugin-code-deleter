/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-07 01:28:46
 */

import type { TransformOptions } from '@babel/core'

export interface Config {
  delete?: string[]
  babelOptions?: TransformOptions
  ignorePath?: string | string[]
}
