import { MongoClient, Db, Collection, ObjectId} from 'mongodb';
import * as assert from 'assert';
import {Hero} from './hero-data';
import {ConsoleLogger} from './logger';

// export {Db} from 'mongodb';
const url = 'mongodb://localhost:27017';
const dbName = 'heroesdb';
const heroesCollectionName = 'heroes';
const countersCollectionName = 'counters';

export class DataService {
    private dbClient: MongoClient;
    private db: Db;
    private activeCollection: Collection<any>;
    private logger: ConsoleLogger = new ConsoleLogger('DataService', true);

    public establishConnection(callback: () => void) {
        const that = this;
        MongoClient.connect(url, function(err, client) {
            assert.equal(null, err);
            console.log('Successfully connected');
            that.dbClient = client;
            that.db = client.db(dbName);
            that.activeCollection = client.db(dbName).collection(heroesCollectionName);
            callback();
        });
    }

    private checkConnection(callback: () => void) {
        if (!this.dbClient) {this.establishConnection(callback); } else {callback(); }
    }

    public closeConnection(): void {
        if (this.dbClient) {
            this.dbClient.close(function(err, result) {
                this.dbClient = null;
            });
        }
    }

    public getHero(item_id: number, success: (item: Hero) => void, fail?: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.findOne({id: item_id})
            .then(foundHero => {
                if (foundHero) {
                    this.logger.Log(`read record: ${foundHero}`);
                    success(foundHero);
                } else {
                    this.logger.Log(`record not found for id ${item_id}`);
                    fail(null);
                }
            })
            .catch(err => {
                this.logger.Log(`failed to read record with id ${item_id}`);
                fail(err);
            });
        });
    }

    public getAllHeroes(success: (items: Hero[]) => void, fail?: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.find().toArray().
            then(heroes => {
                this.logger.Log('retrieved records');
                success(heroes);
            }).catch(err => {
                this.logger.Log('failed to read records');
                fail(err);
            });
        });
    }

    public insertItem(item: Hero, success: (item: Hero) => void, fail?: (err: any) => void) {
        this.checkConnection(() => {
            this.db.collection(countersCollectionName).findOneAndUpdate(
                {'_id': 'hero_id'}, {$inc: {'sequence_val': 1}}, {upsert: true, returnOriginal: false}
            )
            .then(incremental_result => {
                item.id = incremental_result.value.sequence_val;
                this.activeCollection.insertOne(item)
                .then(result => {
                    item._id = result.ops[0]._id;
                    this.logger.Log(`inserted hero with id ${item.id}`);
                    success(item);
                })
                .catch(err => {
                    this.logger.Log(`failed to insert record: ${err}`);
                    fail(err);
                });
            })
            .catch(err => {
                this.logger.Log(`failed to generate id: ${err}`);
                fail(err);
            });
        });
    }

    public updateItem(item: Hero, success: () => void, fail?: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.updateOne({'_id' : new ObjectId(item._id)},
            {$set : {'id' : item.id, 'name': item.name}}).then(result => {
                this.logger.Log(`updated hero with id ${item.id}`);
                success();
            })
            .catch(err => {
                this.logger.Log(`failed to update hero with id ${item.id}`);
                fail(err);
            });
        });
    }

    public deleteItem(itemId: number, success: () => void, fail?: (err: any) => void) {
        this.checkConnection(() => {
            this.activeCollection.deleteOne({id: itemId}).then(result => {
                this.logger.Log(`deleted hero with id ${itemId}`);
                success();
            }).catch(err => {
                this.logger.Log(`failed to delete hero with id ${itemId}`);
                fail(err);
            });
        });
    }
}
