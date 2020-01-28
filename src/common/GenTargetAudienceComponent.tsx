import * as React from "react";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import spservices from "../service/spservices";
import { PageContext } from "@microsoft/sp-page-context";

export interface IGenTargetAudienceComponentProps {
    pageContext:PageContext;
    groupIds: IPropertyFieldGroupOrPerson[];
}

export interface IGenTargetAudienceComponentState {
    canView?: boolean;
}

export abstract class GenTargetAudienceComponent<TProps extends IGenTargetAudienceComponentProps, TState extends IGenTargetAudienceComponentState>
    extends React.Component<TProps, TState> {
    constructor(props: TProps) {
        super(props);
        this.state = {
            canView: false
        } as TState;

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
  

    public abstract renderWebpart(): React.ReactElement<IGenTargetAudienceComponentProps>;

    public render(): React.ReactElement<IGenTargetAudienceComponentProps> {
         return this.renderWebpart() ;
    }

}

export default GenTargetAudienceComponent;