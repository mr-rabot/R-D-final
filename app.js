
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      // Explicitly serve static files from the public directory
      if (pathname.startsWith('/images/') || pathname.startsWith('/resources/')) {
        const filePath = path.join(process.cwd(), 'public', pathname)
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath)
          const ext = path.extname(filePath).toLowerCase()
          const mimeTypes = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.pdf': 'application/pdf',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
          
          res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'application/octet-stream',
            'Content-Length': stat.size
          })
          
          const readStream = fs.createReadStream(filePath)
          readStream.pipe(res)
          return
        }
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      // Detailed logging for VPS production debugging
      console.error(`[CRITICAL SERVER ERROR]: ${req.method} ${req.url}`)
      console.error(err.stack || err)
      
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/html')
      res.end('<h1>Internal Server Error</h1><p>The scholarly platform encountered a critical issue. Please check server logs for detailed diagnostics.</p>')
    }
  }).listen(port, (err) => {
    if (err) {
      console.error('[SERVER STARTUP ERROR]', err)
      throw err
    }
    console.log(`> Ready on http://${hostname}:${port}`)
  })
}).catch(err => {
  console.error('[NEXT.JS PREPARE ERROR]', err)
  process.exit(1)
})
