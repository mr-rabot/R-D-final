
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')
const path = require('path')

const dev = process.env.NODE_ENV !== 'production'
const hostname = '0.0.0.0'
const port = process.env.PORT || 3000

// Explicitly define the app directory to avoid resolution issues on VPS
const appDir = process.cwd()
const app = next({ dev, hostname, port, dir: appDir })
const handle = app.getRequestHandler()

console.log(`[R&D SERVICES]: Initializing server in ${dev ? 'Development' : 'Production'} mode...`)

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      const { pathname } = parsedUrl

      // Static asset serving with absolute path safety
      if (pathname.startsWith('/images/') || pathname.startsWith('/resources/')) {
        const filePath = path.join(appDir, 'public', pathname)
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath)
          if (stat.isFile()) {
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
            fs.createReadStream(filePath).pipe(res)
            return
          }
        }
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error(`[SERVER ERROR]: ${req.method} ${req.url} ->`, err.message)
      
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/html')
      res.end(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Internal Server Error | R&D Services</title>
            <style>
              body { font-family: sans-serif; background: #f8fafc; color: #1e293b; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
              .card { max-width: 600px; background: white; padding: 40px; border-radius: 24px; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); text-align: center; }
              h1 { color: #2E6BDB; margin-top: 0; }
              p { color: #64748b; line-height: 1.6; }
              .error-box { margin-top: 24px; padding: 16px; background: #f1f5f9; border-radius: 12px; text-align: left; font-size: 13px; font-family: monospace; word-break: break-all; }
              button { margin-top: 32px; background: #2E6BDB; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: bold; cursor: pointer; transition: opacity 0.2s; }
              button:hover { opacity: 0.9; }
            </style>
          </head>
          <body>
            <div class="card">
              <h1>Scholarly Terminal Issue</h1>
              <p>The platform encountered an internal synchronization error. Our systems have logged this event for review.</p>
              <div class="error-box">
                <strong>Error Context:</strong> ${err.message || 'Unknown Runtime Failure'}
              </div>
              <button onclick="window.location.reload()">Attempt Recovery</button>
            </div>
          </body>
        </html>
      `)
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> R&D Services is active on http://${hostname}:${port}`)
  })
}).catch(err => {
  console.error('[NEXT.JS PREPARE FAILURE]:', err)
  process.exit(1)
})
