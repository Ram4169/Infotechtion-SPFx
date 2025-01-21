import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WebApiDataDisplayWebPartStrings';
import WebApiDataDisplay from './components/WebApiDataDisplay';
import { IWebApiDataDisplayProps } from './components/IWebApiDataDisplayProps';
import { getSP } from '../../configurations/pnpJSConfig/pnpJSConfig';

export interface IWebApiDataDisplayWebPartProps {
  description: string;
}

export default class WebApiDataDisplayWebPart extends BaseClientSideWebPart<IWebApiDataDisplayWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IWebApiDataDisplayProps> =
      React.createElement(WebApiDataDisplay, {
        description: this.properties.description,
        context: this.context,
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    getSP(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
