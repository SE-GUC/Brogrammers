import React, { Component } from "react";
import { withStyles, List, Paper } from "@material-ui/core";
import InvestorCard from "../cards/InvestorCard";
import GridList from "@material-ui/core/GridList";

const styles = {
  list: {
    width: "auto",
    height: "auto",
    backgroundColor: "#eeeeee",
    maxWidth: "70.5%"
  },
  sep: {
    marginLeft: 400
  },
  header: {
    textAlign: "center",
    fontFamily: "Baufra",
    textDecoration: "underline"
  }
};

class ViewCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      investorCompanies: []
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/investors/View/ViewCompanies`, {
      method: "GET",
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
    const { classes } = this.props;
    return (
      <div className={classes.holder}>
        <h1 className={classes.header}>Your Companies</h1>
        <div className={classes.sep}>
          <GridList className={classes.list}>
            {this.state.investorCompanies.map((item, i) => (
              <InvestorCard key={i} company={item} />
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(ViewCompanies);
