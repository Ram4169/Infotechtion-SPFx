import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../configurations/pnpJSConfig/pnpJSConfig';
import IRequestItem from '../../models/IRequestItem';
import { IRequestProvider } from './IRequestProvider';
import { ISPListService } from '../../services/core/spService/ISPListService';
import { AppConstants } from '../../common/AppConstants';
import { SPListService } from '../../services/core/spService/SPListService';

export default class RequestProvider implements IRequestProvider {
  private _spListService: ISPListService;
  //@ts-ignore
  private _sp: SPFI;
  constructor(context: WebPartContext) {
    this._sp = getSP(context);
    this._spListService = new SPListService(context);
  }

  public createRequest = (postData: IRequestItem): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._spListService
        .createListItem(AppConstants.SPLists.RequestDetails, postData)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          console.log(
            `Error while adding details in ${AppConstants.SPLists.RequestDetails}. Error - ${error}`
          );
        });
    });
  };

  public updateRequest = (
    postData: IRequestItem,
    id: number
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      this._spListService
        .updateListItem(AppConstants.SPLists.RequestDetails, id, postData)
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          resolve(false);
          console.log(
            `Error while updating request details in ${AppConstants.SPLists.RequestDetails}. Error - ${error}`
          );
        });
    });
  };

  public getRequestDetails = async (): Promise<IRequestItem[]> => {
    let result = await this._spListService.getAllListItems(
      AppConstants.SPLists.RequestDetails,
      '*',
      '',
      'Created',
      false
    );
    return result;
  };

  public getRequestById = async (itemId: number): Promise<any[]> => {
    const result = await this._spListService.getListItemByFilter(
      AppConstants.SPLists.RequestDetails,
      '*',
      '',
      `Id eq ${itemId}`,
      'Id',
      true,
      1
    );
    return result;
  };

  public deleteRequest = async (itemId: number): Promise<any[]> => {
    return await this._spListService.deleteListItem(
      AppConstants.SPLists.RequestDetails,
      itemId
    );
  };
}
