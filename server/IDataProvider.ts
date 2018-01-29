import {DataItem} from './DataItem';

export interface IDataProvider {
   Connect(callback: () => void): void;
   ReadItem<T> (key: any, success: (item: DataItem) => void, failure: (err: any) => void);
   /*ReadItems<T> (): T[];
   InsertItem<T> (item: T);
   UpdateItem<T> (item: T);
   DeleteItem<T> (key: T);*/
}
