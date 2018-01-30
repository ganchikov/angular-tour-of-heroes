import {IDataProvider} from './IDataProvider';
import {Hero} from '../src/app/hero';
import {ConsoleLogger} from './logger';

export class HeroesDataService {
    private _logger: ConsoleLogger = new ConsoleLogger('HeroesDataService', true);

    constructor(private _dataprovider: IDataProvider) {
        _dataprovider.Connect(() => {
            this._logger.Log('connected');
        });
    }

    public GetHero(id: number, success: (heroItem: Hero) => void, error: (err) => void) {
        this._dataprovider.ReadItem<Hero>(id, item => {
            const heroItem: Hero = item.GetTypedItem(Hero);
            this._logger.Log('Retreved item id: ' + heroItem.id);
            success(heroItem);
        }, err => {
            this._logger.Log(err);
            error(err);
        });
    }
}
