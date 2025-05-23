import fs from 'fs'
import path from 'path'

const filePath = path.resolve('index.html')
let html = fs.readFileSync(filePath, 'utf8')

// Regex to uncomment the Neutralino globals script line
html = html.replace(
  /<!--\s*(<script src="%PUBLIC_URL%\/__neutralino_globals\.js"><\/script>)\s*-->/,
  '$1'
)

fs.writeFileSync(filePath, html, 'utf8')
console.log('[prebuild] Neutralino globals line uncommented')
