import IRequestItem from '../../models/IRequestItem';

export interface IRequestProvider {
  /**
   * This method sends create item request to SPList service
   * The SP list service implements a method to create item into SP list
   */
  createRequest(postData: IRequestItem): Promise<boolean>;

  /**
   * This method sends update item request to SPList service
   * The SP list service implements a method to update item into SP list
   */
  updateRequest(postData: IRequestItem, id: number): Promise<boolean>;

  /**
   * This method gets all the items from list
   */
  getRequestDetails(): Promise<IRequestItem[]>;

  /**
   * This method get item by id
   * @param itemId list item id
   */
  getRequestById(itemId: number): Promise<any[]>;

  /**
   * This method delete item
   * @param itemId
   */
  deleteRequest(itemId: number): Promise<any[]>;
}
