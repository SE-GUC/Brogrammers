import React, { Component } from "react";
import LinearDeterminate from "../layout/loading/CustomizedProgress"
import Snackbar from "../layout/snackbar/Snackbar"
import TitleBarGridList from "../layout/List/GridList";
import Paper from "../layout/paper/Paper";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";

const styles = {
    header: {
        position: "sticky",
        // eslint-disable-next-line no-dupe-keys
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: "0px",
      
        color: "white",
        top: "55px",
        zIndex: 13,
        backgroundColor: "#034066"
      }
    }
   
class investorRequests extends Component {
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
        if (this.state.requests) {
            return (<div>

                <Grid item xs={12} lg={12} style={styles.header}>
                    <h2>
                        {sessionStorage.getItem("lang") === "ar"
                            ? "طلباتي"
                            : "My Requests"}{" "}
                    </h2>
                </Grid>

                <TitleBarGridList data={this.state.requests} token={this.props.token} />

            </div>)
        }
        else {

            return <>

                <Grid item xs={12} lg={12} style={styles.header}>
                    <h2>
                        {sessionStorage.getItem("lang") === "ar"
                            ? "طلباتي"
                            : "My Requests"}{" "}
                    </h2>
                </Grid>
                <Snackbar variant='error' message={sessionStorage.getItem('lang') === 'en' ? 'You Dont have any requests' : 'يوجد خطء'} />
            </>
        }
    }
    handleReq2 = () => {
        if (this.state.requests) {
            if (this.state.requests.length === 0) {

                return (
                    <>

                        <Snackbar variant='warning' message={sessionStorage.getItem('lang') === 'en' ? 'There Are No Requests' : 'ليس هناك طلباط'} />
                    </>
                )
            }
        }
        else {
            return (
                <>

                    <Snackbar variant='error' message={sessionStorage.getItem('lang') === 'en' ? 'Something Went Wrong' : 'يوجد خطء'} />
                </>)
        }
    }
    handleRequests() {
        console.log(this.props.token)
        this.setState({ isLoading: true })
        sessionStorage.setItem("loading", true)
        fetch('https://serverbrogrammers.herokuapp.com/api/investors/MyRequests/all', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': this.props.token
            },
        }).then(response => {

            response.json().then(data => {
                this.setState({ requests: data.data, isLoading: false })
                sessionStorage.setItem("loading", false)


            })
        }).catch(error =>
            this.setState({
                error: { error }.message,
                isLoading: false
            }))
    }
    componentDidMount() {
        this.handleRequests()
    }
    render() {
        console.log(this.state.requests)


        if (this.state.isLoading) {

            return (
                <>
                    <Grid item xs={12} lg={12} style={styles.header}>
                        <h2>
                            {sessionStorage.getItem("lang") === "ar"
                                ? "طلباتي"
                                : "My Requests"}{" "}
                        </h2>
                    </Grid>
                    <LinearDeterminate style={{marginTop:5}} />

                </>
            )
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

export default investorRequests;
