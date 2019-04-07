import React, { Component } from "react";
import LinearDeterminate from "../layout/loading/LinearDeterminate"
import Snackbar from "../layout/snackbar/Snackbar"
import TitleBarGridList from "../layout/List/GridList";
import Paper from "../layout/paper/Paper";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";


class investorRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests: [],
            isLoading: false,
            error: null,
        };

        this.handleRequests = this.handleRequests.bind(this);
    }

    handleRequests() {
        console.log(this.props.token)
        this.setState({ isLoading: true })

        fetch('http://localhost:3000/api/investors/MyRequests/all', {
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
                error,
                isLoading: false
            }))
    }
    componentDidMount() {
        this.handleRequests()
    }
    render() {
        console.log(this.state.requests)
        const { requests } = this.state;

        if (this.state.isLoading) {
            return <LinearDeterminate />
        }
        if (this.state.error) {
            return <Snackbar variant='error' message="Something went wrong!" />
        }
        if (this.state.requests) {
            if (this.state.requests.length === 0) {

                return <Snackbar variant='warning' message="There are no requests" />
            }
        }

        return (
            <div>
                <Paper title={this.state.requests.investorName} elevation={1} />
                <Grid style={{ backgroundColor: '#3f3f3f' }}>
                    <TitleBarGridList data={this.state.requests} token={this.props.token} />
                </Grid>
            </div>
        );
    }
}

export default investorRequests;
