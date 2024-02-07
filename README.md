# rollup-plugin-code-deleter

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A rollup plugin to delete code by Comments

```js
// input
const obj = {
  /* code-deleter */
  a: 1,
  b: 2
}

// output
const obj = {
  b: 2
}
```

## Start
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

[MIT](./LICENSE) License © 2023-PRESENT [ShunJun]<https://github.com/shunjun>
