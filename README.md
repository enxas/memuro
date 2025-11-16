# Memuro

A lightweight and minimalist bookmarking app built with [Vue.js](https://vuejs.org/) and [Neutralino.js](https://neutralino.js.org/)


## Development

Run this before git commit:

```bash
./build.sh
```

Take binary and .neu file from `dist` folder.

For browser data is stored in localStorage with key `Memuro`. For desktop data is stored at:

```bash
%HOMEPATH%\Documents\Memuro\data.json
```

Open `vue-src` separately for easier development. Start it with `npm run dev` to test in browser.

To test desktop build run `npm run build` in Vue project (uses bin/ folder to run your app locally):

```bash
neu run "--" --window-enable-inspector 
```