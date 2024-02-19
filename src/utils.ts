/**
 * @author        shunzi <tobyzsj@gmail.com>
 * @date          2024-02-19 21:37:01
 */

export function toArray<T>(some: T | T[]): T[] {
  if (Array.isArray(some))
    return some
  return [some]
}
