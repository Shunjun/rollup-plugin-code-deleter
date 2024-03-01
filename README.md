# rollup-plugin-code-deleter

[![NPM Version][npm-version-src]][npm-version-href]
[![NPM Downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A rollup plugin to delete code by Comments **WIP**

### Why
Maybe you have a common package that is used by multiple packages，like this:
```js
// package A
function renderForPackageB() {
  // ...more codes
}
function renderForPackageC() {
  // ...more codes
}

export const obj = {
  renderForPackageB,
  renderForPackageC,
  ...someOtherProperties
}
```

```js
// package B
import { obj } from 'A'
obj.renderForPackageB()
```

```js
// package C
import { obj } from 'A'
obj.renderForPackageC()
```
If you only build package B, the renderForPackageC will also be in your bundle.
The tree-shaking will not work, all codes used in renderForPackageC will bu in bundle.

If you know renderForPackageC does't need in your bundle. you can delete it from obj, to help you shrink the size of your bundle.

## Install
```sheel
npm install rollup-plugin-code-deleter --save-dev
```

## Usage
### In Rollup
```js
import codeDeleter from 'rollup-plugin-code-deleter'

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/app.js',
    format: 'umd',
    name: 'app'
  },
  plugins: [
    codeDeleter()
  ]
}
```

### In Vite
```js
import { defineConfig } from 'vite'
import codeDeleter from 'rollup-plugin-code-deleter'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [CodeDeleter()],
})
```

### In Code
you can comment the code where you want to delete
```js
const obj = {
  /** code-deleter */
  a: 1 // the property will be deleted
}
```

also you can specify which piece of code is deleted
```js
const obj = {
  /** code-deleter: pc */
  a: 1,
  /** code-deleter: mobile */
  b: 2
}
```

with config:
```js
import codeDeleter from 'rollup-plugin-code-deleter'
export default {
  plugins: [
    codeDeleter({
      delete: ['pc']
    })
  ]
}
```

the code will output
```js
const obj = {
  /** code-deleter: mobile */
  b: 2
}
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [ShunJun](https://github.com/shunjun)

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/rollup-plugin-code-deleter?style=flat&color=green
[npm-version-href]: https://npmjs.com/package/rollup-plugin-code-deleter
[npm-downloads-src]: https://img.shields.io/npm/dw/rollup-plugin-code-deleter
[npm-downloads-href]: https://npmjs.com/package/rollup-plugin-code-deleter
[bundle-src]: https://img.shields.io/bundlephobia/minzip/rollup-plugin-code-deleter
[bundle-href]: https://bundlephobia.com/result?p=rollup-plugin-code-deleter
[license-src]: https://img.shields.io/github/license/shunjun/rollup-plugin-code-deleter
[license-href]: https://github.com/Shunjun/rollup-plugin-code-deleter/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-blue
[jsdocs-href]: https://www.jsdocs.io/package/rollup-plugin-code-deleter
