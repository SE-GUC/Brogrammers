import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import InvestorCard from "../cards/InvestorCard";

class ViewCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investorCompanies: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/investors/View/ViewCompanies`, {
      method: 'GET',
      headers: {
        "x-access-token": this.props.token
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ investorCompanies: json.data });
      });
  }

  render() {
    return (
        <ul>
            {
                this.state.investorCompanies.map((item, i) => (
                    <InvestorCard key= {i} company={item}/>
                ))
            }
        </ul>
    )
  }
}
export default (ViewCompanies)
