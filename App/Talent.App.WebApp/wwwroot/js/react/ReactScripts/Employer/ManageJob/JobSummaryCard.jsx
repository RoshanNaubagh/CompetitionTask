import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        //url: 'http://localhost:51689/listing/listing/closeJob',
    }

    render() {
  //       <Card.Group>
  //   <Card>
  //     <Card.Content>
        
  //       <Card.Header>{this.props.JobTitle}</Card.Header>
  //       <Card.Meta> {this.props.city},{this.props.country}</Card.Meta>
  //       <Card.Description>
  //        {this.props.summary}
  //       </Card.Description>
  //     </Card.Content>
  //     <Card.Content extra>
  //       <div className='ui two buttons'>
  //         <Button basic color='red'>
  //           Expired
  //         </Button>
  //         <Button icon="close">
  //           Close
  //         </Button>
  //         <Button icon="edit">
  //           Edit
  //         </Button>
  //         <Button icon="copy">
  //           Copy
  //         </Button>
  //       </div>
  //     </Card.Content>
  //   </Card>
    
  // </Card.Group>
  <p key={this.props.id}>{this.props.title}</p>
    }
}