import fs from 'fs'
import path from 'path'

const filePath = path.resolve('index.html')
let html = fs.readFileSync(filePath, 'utf8')

// Regex to re-comment the script line
html = html.replace(
  /(<script src="%PUBLIC_URL%\/__neutralino_globals\.js"><\/script>)/,
  '<!-- $1 -->'
)

fs.writeFileSync(filePath, html, 'utf8')
console.log('[postbuild] Neutralino globals line re-commented')
