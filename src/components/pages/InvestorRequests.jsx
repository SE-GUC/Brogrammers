import React, { Component } from "react";
import axios from "axios";
import LinearDeterminate from "../layout/loading/LinearDeterminate"
import Snackbar from "../layout/snackbar/Snackbar"
import TitleBarGridList from "../layout/List/GridList";
class investorRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests: [] ,
            token:null,
            isLoading: false,
            error: null,
        };
    }
    // handleRegister(){
     
    //     this.setState({isLoading:true})
    // console.log("abc")
    //     fetch('http://localhost:3000/api/investor/:id/MyRequests',{
    //         method: "GET",
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'x-access-token':this.state.token
    //         },
    //       }).then(response => {
    //         response.json().then(data =>{
    //           this.setState({requests:data,isLoading: false})
    //         })
    //     }).catch(error =>
    //         this.setState({
    //             error,
    //             isLoading: false
    //         }))
    // }
    // componentDidMount() {
    //     this.handleRegister()
    // }
    render() {
        const { requests } = this.state;
        if (this.state.error) {
            return <Snackbar variant='error' message="Something went wrong!" />
        }
        if (this.state.requests.length === 0) {
            return <Snackbar variant='warning' message="There are no requests" />
        }
        if (this.state.isLoading) {
            return <LinearDeterminate />
        }
        return (
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around' }}>
                <TitleBarGridList data={this.state.requests} />
            </div>
        );
    }
}

export default investorRequests;
