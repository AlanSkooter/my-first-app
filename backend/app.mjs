import http from 'http';
import serveStatic from 'serve-static';
import path from 'path';
import router from './src/services/router.mjs';

const host = 'localhost';
const port = '8080';

const frontendPath = path.resolve(process.cwd(), './frontend/');
const serve = serveStatic(frontendPath, {
    index: ['index.html']
});

const server = http.createServer((req, res) => {
    serve(req, res, () => {
        router.lookup(req, res);
    });
});

server.listen(port, host, () => {
    console.log(`Server listining for ${host}:${port}`);
});