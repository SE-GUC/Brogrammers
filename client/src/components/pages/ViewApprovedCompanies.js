import React, { Component } from "react";
import { withStyles, List, Paper, Grid, Grow } from "@material-ui/core";
import GridList from "@material-ui/core/GridList";
import CompanyCard from "../cards/CompanyCard";
import InvestorCard from "../cards/InvestorCard";
import Plx from "react-plx/lib/Plx";
import StickyText from "./StickyText";
import { StickyContainer, Sticky } from 'react-sticky';



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
    fetch(`https://serverbrogrammers.herokuapp.com/api/company/approved`, {
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
      <>
    
     

      <Grid container spacing={20} alignItems="center" justify='center' style={{backgroundColor:"#034066"}}>
      <Grid item xs={12} lg={12} style={{position: 'sticky',textAlign:'center',paddingTop:10,paddingBottom:10, marginTop:'0px',marginBottom:'100px',color:'white',top: '350px',zIndex:9999999999,backgroundColor:'#034066'}}>
           <h2 >{sessionStorage.getItem("lang")==='ar'?'الشركات المقبولة':'Approved Companies'} </h2>
           </Grid>
 
     
        {this.state.approvedCompanies.map((item, i) => (
          // <Plx className="MyAwesomeParallax" parallaxData={parallaxData1} >
          <Grid
              item
              xs={12} md={4} sm={6}
            lg={4}
            
            >
              <CompanyCard
                className={classes.companiesBackground}
                key={i}
                company={item}
              />
            </Grid>
        // </Plx>
        ))}
      </Grid>
      </>
    );
  }
}
export default withStyles(styles)(ViewApprovedCompanies);
