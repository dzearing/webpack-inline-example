# webpack-inline-example

Quick demo app which shows `html-webpack-plugin` EJS support combined with `html-inline-script-webpack-plugin` to inline Webpack output into the html as part of the bundle step.

## Usage

To build this example:

1. Run `yarn` to install dependencies.
2. Run `yarn build` to run webpack.

This will produce output in `./dist` folder, which you can inspect.

## Explainer

This example includes a `/src` folder with the following:

- `index.ejs` - the html template.
- `index.js` - the main script entry.
- `foo.inline.js` and `bar.inline.js` - scripts intended to be inlined into the html result.

The `webpack.config.js` is configured to build production by default (minify everything.) It contains the following entry definition:

```js
  entry: {
    index: "./src/index.js",
    "foo.inline": "./src/foo.inline.js",
    "bar.inline": "./src/bar.inline.js",
  },
```

This indicates 3 input files will be used to produce 3 output files. (Duh!)

The `html-webpack-plugin` is configured to include all 3 chunks:

```js
    new HtmlWebpackPlugin({
      title: "This is an html webpack plugin example with inline scripts.",
      template: "src/index.ejs",
      chunks: ["index", "foo.inline", "bar.inline"],
    }),
```

Normally, this would produce an `index.html` file which includes these 3 chunks as script references. The `html-inline-script-webpack-plugin` is used to automatically inline only the chunk files ending with `.inline.js` using the `scriptMatchPattern` option:

```js
    new HtmlInlineScriptPlugin({
      scriptMatchPattern: [/\.inline\.js$/], // matches inline JS files
    }),
```

This produces our final result: the `index.js` file is a script reference, but both inline files are injected into the html result:

```html
<html>
  <head>
    <title>This is an html webpack plugin example with inline scripts.</title>
    <script defer="defer" src="index.js"></script>
    <script defer="defer">
      document.addEventListener("DOMContentLoaded", function () {
        const e = document.createElement("div");
        (e.innerHTML = "i am foo!"), document.body.appendChild(e);
      });
    </script>
    <script defer="defer">
      document.addEventListener("DOMContentLoaded", function () {
        const e = document.createElement("div");
        (e.innerHTML = "i am bar!"), document.body.appendChild(e);
      });
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
