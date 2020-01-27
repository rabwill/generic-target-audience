import * as React from "react";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker";
import spservices from "../service/spservices";


export interface IGenTargetAudienceComponentProps {
    webAbsoluteUrl: string;
    userId: string;
    groupIds: IPropertyFieldGroupOrPerson[];
}

export interface IGenTargetAudienceComponentState {
    counter?: number;
}

export abstract class GenTargetAudienceComponent<TProps extends IGenTargetAudienceComponentProps, TState extends IGenTargetAudienceComponentState>
    extends React.Component<TProps, TState> {

    constructor(props: TProps) {
        super(props);
        this.state = {
            counter: 0
        } as TState;

    }
   

    public abstract renderWebpart(): React.ReactElement<IGenTargetAudienceComponentProps>;

    public render(): React.ReactElement<IGenTargetAudienceComponentProps> {
        const self = this;
        let proms = [];
        const _sv = new spservices();
        self.props.groupIds.map((item) => {
            proms.push(_sv.isMember(item.fullName, self.props.userId, self.props.webAbsoluteUrl));
        });
        Promise.race(proms).then(val => {
            this.setState({ counter: 1 }); //atleast one promise resolved
        });
        try {
            //render only if atleast one promise if resolved
            return this.state.counter > 0 ? this.renderWebpart() : null;
        }
        catch (error) {
            //todo
        }
    }

}

export default GenTargetAudienceComponent;