export interface ISPListService {
  /**
   * By default 100 records will be returned
   * @param listTitle List Title
   * @param selectedColumn Column names by comma seprated
   * @param expand lookup column names by comma separated
   * @param itemId list item id to be fetched
   */
  getListItemById(
    listTitle: string,
    selectedColumn: string,
    expand: string,
    itemId: number
  ): Promise<any>;

  /**
   * All the records will be returned from SP list
   * @param listTitle List Title
   * @param selectedColumn Column names by comma seprated
   * @param expand lookup column names by comma separated
   * @param orderBy Sort Column
   * @param isAsc Sort Type true for ascending and false for descendiing
   */
  getAllListItems(
    listTitle: string,
    selectedColumn: string,
    expand: string,
    orderBy: string,
    isAsc: boolean
  ): Promise<any[]>;

  /**
   * Gets list item by filter
   * @param title List Title
   * @param selectedColumn Column names by comma seprated
   * @param expand lookup column names by comma separated
   * @param filter List items filter consition
   * @param orderBy Sort Column
   * @param isAsc Sort Type true for ascending and false for descendiing
   * @param count No of items you want to retrieve
   * @returns Promise<Items[]]>
   */
  getListItemByFilter(
    title: string,
    selectedColumn: string,
    expand: string,
    filter: string,
    orderBy: string,
    isAsc: boolean,
    count: number
  ): Promise<any[]>;

  /**
   * Creates list item
   * @param listTitle
   * @param data  payload
   * @returns Promise<any>
   */
  createListItem(listTitle: string, data: any): Promise<any>;

  /**
   * Update list item
   * @param listTitle
   * @param id of the list item
   * @param data  payload
   * @returns Promise<any>
   */
  updateListItem(listTitle: string, id: number, data: any): Promise<any>;

  /**
   * Delete list item
   * @param listTitle
   * @param id
   */
  deleteListItem(listTitle: string, id: number): Promise<any>;
}
