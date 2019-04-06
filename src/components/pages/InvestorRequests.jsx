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
                { nameInEnglish: "Ahmed", status: "pending", nameInArabic:"انبسشش" },
                { nameInEnglish: "Ahmed", status: "pending", nameInArabic:"انبسشش" },
                { nameInEnglish: "Ahmed", status: "pending", nameInArabic:"انبسشش" },
                { nameInEnglish: "Ahmed", status: "pending", nameInArabic:"انبسشش" },
                { nameInEnglish: "m n", status: "rejected", nameInArabic:"انبسشش" },
            { nameInEnglish: "morsdvsdvsvsvan", status: "accepted", nameInArabic:"ايريريرينبسشش" }],
           
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
            return <Snackbar message={this.state.error.message} />
        }
        if (this.state.isLoading) {
            return <LinearDeterminate />
        }
        return (
            <div style={{display: 'flex',justifyContent: 'center'}}>
                <TitleBarGridList data={this.state.requests}/>
            </div>
        );
    }
}

export default investorRequests;
