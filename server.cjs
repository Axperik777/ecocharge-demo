const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'dist');
http.createServer((req,res)=>{let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end()}
const file=path.resolve(root,'.'+(url.endsWith('/')?url+'index.html':url));
if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);return res.end()}
fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}
res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.json':'application/json','.jpg':'image/jpeg','.svg':'image/svg+xml'}[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)});
}).listen(Number(process.env.PORT)||4317,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+(process.env.PORT||4317)));
