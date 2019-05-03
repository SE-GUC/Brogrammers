import React, { Component } from "react";
import { withStyles, List, Paper, Grid, Grow } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import CompanyCard from "../cards/CompanyCard";
import InvestorCard from "../cards/InvestorCard";
import Plx from "react-plx/lib/Plx";
const parallaxData1 = [
  {
    start: 'self',
    startOffset:-200,
    duration: 300,
    
    properties: [
     
      {
        startValue: 0.5,
        endValue: 1,
        property: 'scale',
      },
    ],
  },

];

const styles = {
  list: {
    maxWidth: "100%",
    height: "auto"
  },
  sep: {
    marginLeft: "10%",
    marginRight: "10%",
    background: "red"
  },
  companiesBackground: {
    background: "linear-gradient(to top, #000000, #DCDCDC)",
    borderStyle: "solid",
    borderColor: "black"
  }
};

class ViewApprovedCompanies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvedCompanies: []
    };
  }

  componentDidMount() {
    fetch(`http://serverbrogrammers.herokuapp.com/api/company/approved`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ approvedCompanies: json.data });
      });
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={20} alignItems="center" justify='center' style={{backgroundColor:"#03406699"}}>
     
      <Grid
            item
            xs={12}
         
            >

          <div style={{backgroundColor:'#034066',color:'white'}}>
            <h1 style={{ paddingLeft: "5%" }}>
              {" "}
              {sessionStorage.getItem("lang") === "en"
                ? "Approved Companies"
                : "الشركات المقبوله"}
            </h1>
            </div>
          </Grid>
      
        {this.state.approvedCompanies.map((item, i) => (
          <Plx className="MyAwesomeParallax" parallaxData={parallaxData1} >
          <Grid
              item
              xs={12}
              md={12}
              sm={12}
            lg={12}
            
            >
              <CompanyCard
                className={classes.companiesBackground}
                key={i}
                company={item}
              />
            </Grid>
        </Plx>
        ))}
      </Grid>
    );
  }
}
export default withStyles(styles)(ViewApprovedCompanies);
