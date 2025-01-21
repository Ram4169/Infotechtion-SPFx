import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../../configurations/pnpJSConfig/pnpJSConfig';
import { ISPListService } from './ISPListService';

export class SPListService implements ISPListService {
  private _sp: SPFI;
  constructor(context: WebPartContext) {
    this._sp = getSP(context);
  }

  getListItemById(
    listTitle: string,
    selectedColumn: string,
    expand: string,
    itemId: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this._sp.web.lists
        .getByTitle(listTitle)
        .items.select(selectedColumn)
        .expand(expand)
        .getById(itemId)()
        .then((listItems: any) => {
          resolve(listItems);
        })
        .catch((error) => {
          resolve({});
        });
    });
  }

  getAllListItems(
    listTitle: string,
    selectedColumn: string,
    expand: string,
    orderBy: string,
    isAsc: boolean
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._sp.web.lists
        .getByTitle(listTitle)
        .items.select(selectedColumn)
        .expand(expand)
        .orderBy(orderBy, isAsc)()
        .then((listItems: any[]) => {
          resolve(listItems);
        })
        .catch((error) => {
          resolve([]);
        });
    });
  }

  public getListItemByFilter(
    title: string,
    selectedColumn: string,
    expand: string,
    filter: string,
    orderBy: string,
    isAsc: boolean,
    count: number
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._sp.web.lists
        .getByTitle(title)
        .items.filter(filter)
        .select(selectedColumn)
        .expand(expand)
        .orderBy(orderBy, isAsc)
        .top(count)()
        .then((listItems: any[]) => {
          resolve(listItems);
        })
        .catch((error) => {
          resolve([]);
        });
    });
  }

  public createListItem(listTitle: string, data: any): Promise<any> {
    return this._sp.web.lists.getByTitle(listTitle).items.add(data);
  }

  public updateListItem(
    listTitle: string,
    id: number,
    data: any
  ): Promise<any> {
    const list = this._sp.web.lists.getByTitle(listTitle);
    return list.items.getById(id).update(data);
  }

  public deleteListItem(listTitle: string, id: number): Promise<any> {
    const list = this._sp.web.lists.getByTitle(listTitle);
    return list.items.getById(id).delete();
  }
}
