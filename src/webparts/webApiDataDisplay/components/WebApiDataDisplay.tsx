import * as React from 'react';
import styles from './WebApiDataDisplay.module.scss';
import type { IWebApiDataDisplayProps } from './IWebApiDataDisplayProps';
import DataGrid, {
  Scrolling,
  Pager,
  Paging,
  Column,
  Selection,
  DataGridTypes,
} from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import IRequestItem from '../../../models/IRequestItem';
import { IRequestProvider } from '../../../providers/RequestDataProvider/IRequestProvider';
import RequestProvider from '../../../providers/RequestDataProvider/RequestProvider';
import * as _ from 'lodash';

export interface IWebApiDataDisplayState {
  requestItem: IRequestItem;
  requestItems: IRequestItem[];
  selectedRow: IRequestItem;
  selectedRowId: number;
  showHideForm: boolean;
  isUpdateRequest: boolean;
}

export default class WebApiDataDisplay extends React.Component<
  IWebApiDataDisplayProps,
  IWebApiDataDisplayState
> {
  //Private variable declaration
  private _allItems: IRequestItem[];
  private requestProvider: IRequestProvider;

  constructor(props: IWebApiDataDisplayProps, state: IWebApiDataDisplayState) {
    super(props);

    // Populate with items for demos.
    this._allItems = [];
    this.requestProvider = new RequestProvider(props.context);

    this.state = {
      requestItem: {
        FirstName: '',
        LastName: '',
        Gender: '',
        Salary: 0,
      },
      requestItems: this._allItems,
      selectedRow: {} as IRequestItem,
      selectedRowId: 0,
      showHideForm: false,
      isUpdateRequest: false,
    };
  }

  public componentDidMount(): void {
    this.loadData();
  }

  /**
   * This method loads employee data from backend list
   */
  public loadData = () => {
    const requestProvider: IRequestProvider = new RequestProvider(
      this.props.context
    );
    requestProvider.getRequestDetails().then((data: IRequestItem[]) => {
      this.setState({ requestItems: data });
    });
  };

  /**
   * This method trigger on selection of row in data table
   * @param selectedRowData
   */
  public onSelectionChanged = (
    selectedRowData: DataGridTypes.SelectionChangedEvent
  ) => {
    this.setState({
      selectedRow: selectedRowData.selectedRowsData[0],
      selectedRowId: selectedRowData.selectedRowsData[0]?.Id,
    });
  };

  //Method to handle Save button action
  public handleSave = () => {
    const { requestItem, isUpdateRequest, selectedRowId } = this.state;
    let isRequestValid = this.validateRequestForm();

    if (isRequestValid) {
      //Update operation
      if (isUpdateRequest) {
        this.requestProvider
          .updateRequest(
            {
              FirstName: requestItem.FirstName,
              LastName: requestItem.LastName,
              Gender: requestItem.Gender,
              Salary: requestItem.Salary,
            },
            selectedRowId
          )
          .then((flag) => {
            if (flag) {
              this.setState({
                showHideForm: false,
                requestItem: {} as IRequestItem,
              });
              alert('Request updated successfully!');
              this.loadData();
            } else {
              alert(
                'Something went wrong while updating the request, Please try again!'
              );
            }
          });
      }
      //Create operation
      else {
        this.requestProvider
          .createRequest({ ...this.state.requestItem })
          .then((flag) => {
            if (flag) {
              this.setState({
                showHideForm: false,
                requestItem: {} as IRequestItem,
              });
              alert('Request submitted successfully!');
              this.loadData();
            } else {
              alert(
                'Something went wrong while creating the request, Please try again!'
              );
            }
          });
      }
    } else {
      alert(`Please fill out all the fields`);
    }
  };

  //Method to handle Update button action
  public handleUpdate = () => {
    if (_.isEmpty(this.state.selectedRow)) {
      alert(`Please select a row to perform update operation`);
    } else {
      this.setState({
        showHideForm: true,
        isUpdateRequest: true,
        requestItem: { ...this.state.selectedRow },
      });
    }
  };

  //Method to handle Delete button action
  public handleDelete = () => {
    if (_.isEmpty(this.state.selectedRow)) {
      alert(`Please select a row to perform delete operation`);
    } else {
      this.requestProvider
        .deleteRequest(this.state.selectedRowId)
        .then((flag) => {
          if (flag) {
            this.loadData();
            alert('Request deleted successfully!');
          } else {
            alert(
              'Something went wrong while deleting the request item, Please try again!'
            );
          }
        });
    }
  };

  /**
   * This method validates the form fields for null or empty
   * @returns boolean
   */
  private validateRequestForm = () => {
    const { requestItem } = this.state;
    let isFormValid = true;

    if (this.isNullorEmpty(requestItem.FirstName)) isFormValid = false;

    if (this.isNullorEmpty(requestItem.LastName)) isFormValid = false;

    if (this.isNullorEmpty(requestItem.Gender)) isFormValid = false;

    if (this.isNullorEmpty(requestItem.Salary)) isFormValid = false;

    return isFormValid;
  };

  private isNullorEmpty = (value: any): boolean => {
    if (value == null || value == undefined || value === 0 || value === '') {
      return true;
    }
    return false;
  };

  public render(): React.ReactElement<{}> {
    const { requestItem, requestItems, showHideForm } = this.state;

    return (
      <div className={styles.wpcontainer}>
        <div className={styles.wpcontainer__formContainer}>
          {showHideForm ? (
            <>
              <div>
                <h1>Employee Details</h1>
              </div>
              <div className={styles.wpcontainer__formContainer__form}>
                <div id="firstname">
                  <span className="reqField">First Name: </span>
                  <input
                    type="text"
                    value={requestItem.FirstName}
                    onChange={(event) =>
                      this.setState({
                        requestItem: {
                          ...requestItem,
                          FirstName: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div id="lastname">
                  <span className="reqField">Last Name: </span>
                  <input
                    type="text"
                    value={requestItem.LastName}
                    onChange={(event) =>
                      this.setState({
                        requestItem: {
                          ...requestItem,
                          LastName: event.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div id="gender">
                  <span className="reqField">Gender: </span>
                  <select
                    value={requestItem.Gender}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      this.setState({
                        requestItem: {
                          ...requestItem,
                          Gender: event.target.value,
                        },
                      })
                    }
                  >
                    <option value="Select">Please choose</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Neutral">Neutral</option>
                  </select>
                </div>
                <div id="salary">
                  <span className="reqField">Salary: </span>
                  <input
                    type="number"
                    min={1}
                    value={requestItem.Salary === 0 ? '' : requestItem.Salary}
                    onChange={(event) =>
                      this.setState({
                        requestItem: {
                          ...requestItem,
                          Salary: Number(event.target.value),
                        },
                      })
                    }
                  />
                </div>
                <div>
                  <button onClick={this.handleSave}>Save</button>
                  <button
                    onClick={() => {
                      this.setState({
                        showHideForm: false,
                        requestItem: {} as IRequestItem,
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          ) : (
            ''
          )}

          <div className={styles.wpcontainer__formContainer__formaction}>
            <button
              onClick={() =>
                this.setState({ showHideForm: true, isUpdateRequest: false })
              }
            >
              Create
            </button>
            <button onClick={this.handleUpdate}>Update</button>
            <button onClick={this.handleDelete}>Delete</button>
          </div>
        </div>

        <div className={styles.wpcontainer__gridContainer}>
          <DataGrid
            id="dataGrid"
            dataSource={requestItems}
            keyExpr="Id"
            showBorders={true}
            showRowLines={true}
            columnAutoWidth={true}
            onSelectionChanged={this.onSelectionChanged}
          >
            <Scrolling
              rowRenderingMode="virtual"
              columnRenderingMode="virtual"
            />
            <Paging defaultPageSize={10} />
            <Pager
              visible={true}
              allowedPageSizes={[5, 10, 15, 'all']}
              displayMode={'compact'}
              showPageSizeSelector={true}
              showInfo={true}
              showNavigationButtons={true}
            />
            <Selection mode="single" />
            {/* <Column caption="ID" dataField="Id" /> */}
            <Column caption="First Name" dataField="FirstName" />
            <Column caption="Last Name" dataField="LastName" />
            <Column caption="Gender" dataField="Gender" />
            <Column caption="Salary" dataField="Salary" />
          </DataGrid>
        </div>
      </div>
    );
  }
}
