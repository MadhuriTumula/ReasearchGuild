// Zero-dependency static server for the ResearchBridge demo.
// No build step, no npm install. Serves dist/ with caching disabled so a
// browser refresh always picks up your latest edit.
const http=require('http'),fs=require('fs'),path=require('path'),url=require('url');

const ROOT=path.join(__dirname,'..','dist');
const argPort=(process.argv.find(a=>a.startsWith('--port='))||'').split('=')[1];
const START_PORT=Number(argPort||process.env.PORT||8765);
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2'};

const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(url.parse(req.url).pathname);
  let file=path.join(ROOT,pathname);
  if(!file.startsWith(ROOT)){res.writeHead(403).end('Forbidden');return}
  if(pathname.endsWith('/'))file=path.join(file,'index.html');
  fs.stat(file,(err,stat)=>{
    if(err||stat.isDirectory()){
      // Single-page demo: unknown paths fall back to the app shell.
      file=path.join(ROOT,'index.html');
    }
    fs.readFile(file,(e,buf)=>{
      if(e){res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found');return}
      res.writeHead(200,{
        'Content-Type':TYPES[path.extname(file).toLowerCase()]||'application/octet-stream',
        'Cache-Control':'no-store, no-cache, must-revalidate',
        'Pragma':'no-cache'
      });
      res.end(buf);
      console.log(`${res.statusCode} ${req.method} ${pathname}`);
    });
  });
});

let port=START_PORT;
server.on('error',err=>{
  if(err.code==='EADDRINUSE'&&port<START_PORT+10){
    console.log(`Port ${port} busy, trying ${port+1}…`);
    server.listen(++port);
  }else{
    console.error(err.message);process.exit(1);
  }
});
server.listen(port,()=>{
  console.log(`\n  ResearchBridge demo running\n`);
  console.log(`  →  http://localhost:${port}\n`);
  console.log(`  Serving ${path.relative(process.cwd(),ROOT)||'dist'}/  ·  edit files and refresh  ·  Ctrl+C to stop\n`);
});
