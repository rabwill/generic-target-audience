import * as React from 'react';
import styles from './SampleTargetedComponent.module.scss';
import { ISampleTargetedComponentProps } from './ISampleTargetedComponentProps';
import GenTargetAudienceComponent, { IGenTargetAudienceComponentState } from '../../../common/GenTargetAudienceComponent';
export interface ISampleTargetedComponentState extends IGenTargetAudienceComponentState {
  description?: string;
}
export default class SampleTargetedComponent extends GenTargetAudienceComponent<ISampleTargetedComponentProps, ISampleTargetedComponentState>{
  constructor(props: ISampleTargetedComponentProps) {
    super(props);
    this.state = {
      description:this.props.description
    };  
  }

  public componentDidMount():void{
    //needed to make the target audience work
    this.checkUserCanViewWebpart();   
  }
 
  public renderWebpart(): JSX.Element {
    return (<div>{this.state.canView?
    <div className={styles.sampleTargetedComponent}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.column}>
            <span className={styles.title}>Sample webpart</span>           
            <p className={styles.subTitle}>{this.state.description}</p>
            <a href="https://aka.ms/spfx" className={styles.button}>
              <span className={styles.label}>Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div> :''}
    </div>
    );
  }

}
