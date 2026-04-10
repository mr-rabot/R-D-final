
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

      // Robust explicit static file serving for VPS environments
      if (pathname.startsWith('/images/') || pathname.startsWith('/resources/')) {
        const filePath = path.join(process.cwd(), 'public', pathname)
        if (fs.existsSync(filePath)) {
          try {
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
              
              const readStream = fs.createReadStream(filePath)
              readStream.pipe(res)
              return
            }
          } catch (fileErr) {
            console.warn(`[STATIC SERVE WARNING]: Could not serve ${pathname}`, fileErr.message)
          }
        }
      }

      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error(`[SERVER CRITICAL ERROR]: ${req.method} ${req.url}`, err.stack || err)
      
      res.statusCode = 500
      res.setHeader('Content-Type', 'text/html')
      res.end(`
        <!DOCTYPE html>
        <html>
          <head><title>Internal Server Error | R&D Services</title></head>
          <body style="font-family: sans-serif; padding: 60px; text-align: center; background: #f8fafc; color: #1e293b;">
            <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 24px; shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);">
              <h1 style="color: #2E6BDB; margin-bottom: 16px;">Scholarly Terminal Issue</h1>
              <p style="color: #64748b; line-height: 1.6;">The platform encountered an internal synchronization error. Our automated systems have logged this event for administrative review.</p>
              <div style="margin-top: 24px; padding: 16px; background: #f1f5f9; border-radius: 12px; text-align: left; font-size: 13px;">
                <strong>Error Reference:</strong> ${err.message || 'Unknown Context'}
              </div>
              <button onclick="window.location.reload()" style="margin-top: 32px; background: #2E6BDB; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: bold; cursor: pointer;">Attempt Recovery</button>
            </div>
          </body>
        </html>
      `)
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> R&D Services Ready on http://${hostname}:${port} [${process.env.NODE_ENV}]`)
  })
}).catch(err => {
  console.error('[NEXT.JS PREPARE FAILURE]', err)
  process.exit(1)
})
