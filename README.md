## `segmentInsert`

Load segment.io snippet on this page, given an apiToken as
a string. This does the same thing as the official snippet,
but is designed for usage with browserify and hardcodes
https:// instead of matching the page's scheme.

### Parameters

* `apiToken` **`string`**

### Examples

```js
var segmentInsert = require('segment-insert')
segmentInsert('my-api-token');
```

Returns `undefined`
