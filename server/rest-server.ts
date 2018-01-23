import * as express from 'express';
import * as path from 'path';

// import {Server} from "ws";

const app = express();

app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    console.log('requested landing page');
});

app.get('/wstest', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'sources', 'client', 'wstest.html'));
    console.log('requested ws test page');
});

const server = app.listen(8000, 'localhost', () => {
    const {address, port} = server.address();
    console.log('Listening on http://localhost:' + port);

});


