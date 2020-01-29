import * as React from "react";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import spservices from "../service/spservices";
import { PageContext } from "@microsoft/sp-page-context";
export interface ITargetAudienceProps {
    pageContext:PageContext;
    groupIds: IPropertyFieldGroupOrPerson[];
    children?:any;
}
export interface ITargetAudienceState {
    children:any;
    canView?: boolean;
}
export default class TargetAudience extends React.Component<ITargetAudienceProps, ITargetAudienceState>{

        constructor(props: ITargetAudienceProps) {
            super(props);
            this.state = {
                canView: false,
                children:this.props.children
            } as ITargetAudienceState;
    
        }
        public componentDidMount():void{
            //needed to make the target audience work
            this.checkUserCanViewWebpart();   
          }
       
        public checkUserCanViewWebpart():void{
            const self = this;
            let proms = [];
            const _sv = new spservices();
            self.props.groupIds.map((item) => {
                proms.push(_sv.isMember(item.fullName, self.props.pageContext.legacyPageContext[`userId`], self.props.pageContext.site.absoluteUrl));
            });
            Promise.race(proms).then(val => {
                this.setState({ canView: true }); //atleast one promise resolved
            });
        }
      
    
    public render(): JSX.Element {
        return (<div>{this.state.canView?this.state.children:`Can't touch this!`}</div>);
    }
}