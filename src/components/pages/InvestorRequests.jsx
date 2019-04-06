import React, { Component } from "react";
import axios from "axios";
import LinearDeterminate from "../layout/loading/LinearDeterminate"
import Snackbar from "../layout/snackbar/Snackbar"
import TitleBarGridList from "../layout/List/GridList";
class investorRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            requests: [
                { nameInEnglish: "Ahmed", status: "pending", nameInArabic: "مرجان احمد مرجان" },
                { nameInEnglish: "Salah Corp", status: "rejected", nameInArabic: "حمادة يلعب", regulationLaw: "ssss", nameIEnglish: "Salah Corp", tatus: "rejected", namInArabic: "حمادة يلعب", reguationLaw: "ssss", nmeInEnglish: "Salah Corp", ttus: "rejected", nameInrabic: "حمادة يلعب", reulationLaw: "ssss" },
                { nameInEnglish: "Ahmed", status: "pending", nameInArabic: "ابو فواز" },
                { nameInEnglish: "Ahmed", status: "pending", nameInArabic: "انبسشش" },
                { nameInEnglish: "m n", status: "rejected", nameInArabic: "انبسشش" },
                { nameInEnglish: "morsdvsdvsvsvan", status: "accepted", nameInArabic: "ايريريرينبسشش" }
            ],

            isLoading: false,
            error: null,
        };
    }
    // componentDidMount() {
    //     this.setState({ isLoading: true });

    //     axios
    //         .get("https://localhost:3000/api/investors/121/MyRequests")
    //         .then(result =>
    //             this.setState({
    //                 requests: result.data.hits,
    //                 isLoading: false
    //             })
    //         )
    //         .catch(error =>
    //             this.setState({
    //                 error,
    //                 isLoading: false
    //             }),
    //             console.log(this.state.error)
    //         );
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
