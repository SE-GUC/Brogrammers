import React, { Component } from "react";
import LinearDeterminate from "../layout/loading/CustomizedProgress"
import Snackbar from "../layout/snackbar/Snackbar"
import TitleBarGridList from "../layout/List/GridListEditableLawyer";
import Paper from "../layout/paper/Paper";
import Grid from "@material-ui/core/Grid";




class ViewLawyerEditableCases extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests: [],
            isLoading: false,
            error: null,
        };

        this.handleRequests = this.handleRequests.bind(this);
        this.handleReq = this.handleReq.bind(this)
        this.handleReq2 = this.handleReq2.bind(this)
    }
    handleReq = () => {
        if(this.state.requests){
        return (<div>
            <Paper title={this.state.requests.investorName} elevation={1} />
            <Grid style={{ backgroundColor: '#3f3f3f' }}>
                <TitleBarGridList data={this.state.requests} token={this.props.token} />
            </Grid>
        </div>)}
        else{
            return <Snackbar variant='warning' message={sessionStorage.getItem('lang') === 'en' ? 'There are no requests' : 'لا يوجد شركات'} />
        }
    }
    handleReq2 = () => {
        if(this.state.requests){
        if (this.state.requests.length === 0) {
            return <Snackbar variant='warning' message={sessionStorage.getItem('lang') === 'en' ? 'There are no requests' : 'لا يوجد شركات'} />
        }}
        else{
            return <Snackbar variant='warning' message={sessionStorage.getItem('lang') === 'en' ? 'There are no requests' : 'لا يوجد شركات'} />
        }
    }
    handleRequests() {
        console.log(this.props.token)
        this.setState({ isLoading: true })

        fetch(`https://serverbrogrammers.herokuapp.com/api/lawyer/editForm/${sessionStorage.getItem("ssn")}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.token
            },
        }).then(response => {

            response.json().then(data => {
                this.setState({ requests: data.data, isLoading: false })

            })
        }).catch(error =>
            this.setState({
                error:{error}.message,
                isLoading: false
            }))
    }
    componentDidMount() {
        this.handleRequests()
    }
    render() {
        console.log(this.state.requests)
      

        if (this.state.isLoading) {
            return <LinearDeterminate />
        }
        if (this.state.error) {
            return <Snackbar variant='error' message={this.state.error} />
        } return (
            <div>
                {this.handleReq()}
           {this.handleReq2()}
            </div>
        );
    }
}

export default ViewLawyerEditableCases;
