import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { MongoClient, Db, ObjectId} from 'mongodb';
import {ConsoleLogger} from './logger';

import { HEROES } from './mock-heroes';
import {Hero} from '../src/app/hero';

import {DbManager} from './dbclient';


// import {Server} from "ws";
// const heroes: Hero[] = HEROES;
const app = express();

const dbMgr = new DbManager();
const logger = new ConsoleLogger('express', true);

const url = 'mongodb://localhost:27017';
const dbName = 'heroesdb';
const counterCollectionName = 'counters';
const collectionName = 'heroes';
let dbClient: MongoClient;

MongoClient.connect(url, function(err, client) {
    // assert.equal(null, err);
    console.log(`Successfully connected to db ${client.db.name}`);
    dbClient = client;
});

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

app.options('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    console.log('requested landing page');
});

app.get('/api/heroes/:heroId', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    const heroId = +req.params.heroId;
    logger.Log(`requested hero id: ${heroId}`);
    dbMgr.getHero(heroId, hero => {
        res.status(200).json(hero);
        logger.Log(`retrieved hero id: ${hero.id}`);
    }, err => {
        const msg = `missing hero for id: ${heroId}`;
        res.status(404).send(msg);
        logger.Log(msg);
    });
});

app.get('/api/heroes/', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    logger.Log('requested all heroes');
    dbMgr.getAllHeroes(heroes => {
        res.status(200).json(heroes);
        logger.Log('retrieved heroes');
    }, err => {
        res.status(404).send(err);
        logger.Log(err);
    });
});

app.post('/api/heroes', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    logger.Log('requested to add new hero');
    try {
        const hero: Hero = new Hero();
        // hero.id = getNextId();
        hero.name = req.body.name;
        dbMgr.insertItem(hero, (enriched_hero) => {
            res.status(200).json(enriched_hero);
            logger.Log(`inserted hero with id ${enriched_hero.id}`);
        }, (err) => {
            res.status(404).send(err);
            logger.Log(err);
        });
    } catch (err) {
        res.status(404).send('bad request');
        logger.Log('cant parse data: ' + req.body);
    }
});

app.put('/api/heroes', (req, res) => {
    logger.Log('requested to update hero');
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    try {
        const hero = new Hero(req.body._id, +req.body.id, req.body.name);
        dbMgr.updateItem(hero, () => {
            res.status(200).json(hero);
            logger.Log(`updated hero with id ${hero.id}`);
        }, err => {
            res.status(404).send(err);
            logger.Log(err);
        });
    } catch (err) {
        res.status(404).send('bad request');
        logger.Log('cant parse data: ' + req.body);
    }
});

app.delete('/api/heroes/:heroId', (req, res) => {
    logger.Log(`requested to delete hero id ${req.params.id}`);
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    try {
        const heroId: number = +req.params.heroId;
        dbMgr.deleteItem(+req.params.heroId, () => {
            res.status(200).json(heroId);
        }, (err) => {
            res.status(404).send(err);
            logger.Log(err);
        });
    } catch (err) {
        res.status(404).send('bad request');
        logger.Log('cant parse data: ' + req.body);
    }
});

const server = app.listen(8001, 'localhost', () => {
    const {address, port} = server.address();
    console.log('Listening on http://localhost:' + port);
    // db.establishConnection();
});
