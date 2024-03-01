/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-03-01 19:01:38
 */
import debug from 'debug'

export function debugFactory(namespace: string) {
  return debug(`code-deleter:${namespace}`)
}
