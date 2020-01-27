import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SampleTargetedComponentWebPartStrings';
import SampleTargetedComponent from './components/SampleTargetedComponent';
import { ISampleTargetedComponentProps } from './components/ISampleTargetedComponentProps';
import { PropertyFieldPeoplePicker, IPropertyFieldGroupOrPerson, PrincipalType } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';

export interface ISampleTargetedComponentWebPartProps {
  description: string;
  groups: IPropertyFieldGroupOrPerson[];
}

export default class SampleTargetedComponentWebPart extends BaseClientSideWebPart<ISampleTargetedComponentWebPartProps> {

  public render(): void {
    if(this.properties.groups){
    const element: React.ReactElement<ISampleTargetedComponentProps> = React.createElement(
      SampleTargetedComponent,
      {
        webAbsoluteUrl: this.context.pageContext.site.absoluteUrl,
        userId: this.context.pageContext.legacyPageContext[`userId`],
        groupIds: this.properties.groups,
        description: this.properties.description
      }
    );
    ReactDom.render(element, this.domElement);
    }
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldPeoplePicker('groups', {
                  label: 'Target Audience',
                  initialData: this.properties.groups,
                  allowDuplicate: false,
                  principalType: [PrincipalType.SharePoint],
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  context: this.context,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'peopleFieldId'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}