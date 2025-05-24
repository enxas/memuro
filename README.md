# Memuro

A lightweight and minimalist bookmarking app built with [Vue.js](https://vuejs.org/) and [Neutralino.js](https://neutralino.js.org/)


## Development

Run this before git commit:

```bash
./build.sh
```

In `vue-src` run:

```bash
npm run lint
npm run format
```

For browser data is stored in localStorage with key `Memuro`. For desktop data is stored at:

```bash
%HOMEPATH%\Documents\Memuro\data.json
```

Open `vue-src` separately for easier development.

To test built Vue frontend run:

```bash
neu run "--" --window-enable-inspector
```