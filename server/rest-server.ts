import * as express from 'express';
import * as path from 'path';
import { HEROES } from './mock-heroes';
import {Hero} from '../src/app/hero';

// import {Server} from "ws";
const heroes: Hero[] = HEROES;
const app = express();

app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    console.log('requested landing page');
});

app.get('/api/heroes/:heroId', (req, res) => {
    res.set('Content-Type', 'text/json');
    const heroId = +req.params.heroId;
    const foundHero: Hero = heroes.find(hero => hero.id === heroId);
    if (foundHero) {
        res.json(foundHero);
        /*res.sendFile(path.join(__dirname, '..', '..', 'sources', 'client', 'wstest.html')); */
        console.log('requested hero ' + foundHero.id );
    } else {
        res.status(404).send('missing hero for id' + heroId);
        console.log('missing hero for id' + heroId );
    }
});

app.get('/api/heroes/', (req, res) => {
    res.set('Content-Type', 'text/json');
    res.json(heroes);
    /*res.sendFile(path.join(__dirname, '..', '..', 'sources', 'client', 'wstest.html')); */
    console.log('requested heroes list');
});



const server = app.listen(8000, 'localhost', () => {
    const {address, port} = server.address();
    console.log('Listening on http://localhost:' + port);

});


