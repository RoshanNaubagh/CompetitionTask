﻿import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment,Card,Button } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            yesorno:false,
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
       
        this.loadData(() =>
        this.setState({ loaderData })
    )   
        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
    
         };

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/GetEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
                $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer '+cookies,
                'Content-Type': 'application/json'
            },
            type: 'GET',
            // data: {
            //     activePage: this.state.activePage,
            //     sortByDate: this.state.sortBy.date,
            //     showActive: this.state.filter.showActive,
            //     showClosed: this.state.filter.showClosed,
            //     showDraft: this.state.filter.showDraft,
            //     showExpired: this.state.filter.showExpired,
            //     showUnexpired: this.state.filter.showUnexpired
            // },
            contentType: 'application/json',
            dataType: 'json',
            success: function (res) {
                console.log(res);
                this.setState({ loadJobs: res.myJobs, totalPages: Math.ceil(res.totalCount / 6) }, callback);
            }.bind(this),
            error: function (res, a, b) {
                //this.init();
                console.log(res)
                console.log(a)
                console.log(b)
            }.bind(this)
        })
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    render() {
        const style={
            display:"inline-flex"
        }
        const card={
            display:"inline-block",
            padding:"30px",
            height:"370px",
            width:"33%",
            position:"realtive"
            
        }
        const footerbutton={
            fontSize:"8px",
            height:"auto",
            width:"auto",
            marginBottom:"10px"

        }
        const siglebutton={
            width:"8%",
            backgroundColor:"white",
            marginRight:"3%",
            fontSize:"inherit",
            borderWidth:"1",
            color:"blue"
        }

        const countitem={
                position:"absolute",
                marginLeft:"250px",
                marginTop:"30px",
                backgroundColor:"black",
                color:"white",
                boxShadow: "5px 10px 18px grey"
                
        }
        

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
               <div className ="ui container">
               <h1>List of Jobs</h1>
                   <div style={style}><Icon name="filter"></Icon>Filter:</div>
                   <div style={style}><Dropdown  placeholder='Choose Filter' options={this.state.filter} /></div>
                   <div style={style}><Icon name="calendar"></Icon>Sort by Date:</div>
                   <div style={style}><Dropdown placeholder='Newest First' options={this.state.sortBy}></Dropdown></div>
                   <br/>
                   {this.state.loadJobs.map(p =>
             
<div style={card} key={p.id}>
    <Card.Group>
<Card >
    <Card.Content extra>
    <Button style={countitem} icon labelPosition='left'>
      <Icon name='user' />
      0
    </Button>
    </Card.Content>
                  <Card.Content>
                    <Card.Header>{p.title}</Card.Header>
             
                    <Card.Meta> {p.location.city},{p.location.country}</Card.Meta>
                    <Card.Description>
                     {p.summary}
                    </Card.Description>
                  </Card.Content>
                  <br/>
                  <br/>
                  <Card.Content extra>
                
                    <div style={footerbutton}>
                       
                        <Button style={{marginRight:"15px"}}  basic color='red'>
                        Expired
                      </Button>

                      <Button style={siglebutton}  icon labelPosition='left'>
      <Icon name='close' />
      Close
    </Button>
    
    <Button style={siglebutton}icon labelPosition='left'>
      <Icon name='edit' />
      Edit
    </Button>
    
    <Button style={siglebutton} icon labelPosition='left'>
      <Icon name='copy' />
      Copy
    </Button>
                    </div>
                  </Card.Content>
                </Card>
                </Card.Group>
    </div>

                
                   )}
   

<Pagination style={{marginLeft:"40%"}}
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem={null}
    lastItem={null}
    siblingRange={}
    totalPages={10}
  />
               </div>
            </BodyWrapper>
        )
    }
}
