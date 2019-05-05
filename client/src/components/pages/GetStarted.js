import React, { Component } from "react";
import { Paper, withStyles, Grid, Button, Fade } from "@material-ui/core";
import ViewApprovedCompanies from "./ViewApprovedCompanies";
import Image from "../Images/egypt.jpg"; // Import using relative path
import Plx from "react-plx";
import StickyText from "./StickyText";
import { StickyContainer, Sticky } from "react-sticky";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    height: "120vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    margin: 0,
    paddingTop: 0,
  },  header: {
   
    position: "sticky",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: "0px",
  
    color: "white",
    top: "55px",
    zIndex: 13,
    backgroundColor: "#034066cc"
  }
};

class GetStarted extends Component {
  constructor(props) {
    super(props);
  }
  handleChange = () => {
    document.location.href = "/register";
  };
  handleChange2 = () => {
    document.location.href = "/signin";
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <Plx>
          <Grid
            container={12}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.paperContainer}
          >
         
            <Grid item xs={12} lg={12} className={classes.header}>
              <Fade timeout={{ enter: 1000 }} in={true}>
                <h1 style={{ color: "white", textAlign: "center" }}>
                  Why Egypt?
                </h1>
              </Fade>
            </Grid>

            <Grid item xs={11} lg={4}>
              <Fade
                timeout={{ enter: 1000 }}
                style={{ transitionDelay: "0.6s" }}
                in={true}
              >
                <p
                  style={{
                    color: "white",
                    textAlign: "center",
                    "font-size": "150%",
                    "font-weight": "bold",
                    backgroundColor:'#4488aa99'
                  }}
                >
                  Egypt’s fast-growing, young population of 90 million, diverse
                  and expanding economy and its strategic location linking the
                  Middle East, Europe, Africa and Asia all make it an ideal hub
                  for regional and global investment. As an added incentive, a
                  basket of beneficial trade agreements including GAFTA and
                  COMESA provide the country with favored access to regional
                  growth markets. As Egypt enters a period of political and
                  economic stability, and a reform-minded government carries out
                  an overhaul of the country’s subsidy system, now is the time
                  to invest in Egypt.
                </p>
              </Fade>
            </Grid>
            <Grid item xs={2}>
              <Fade
                timeout={{ enter: 1200 }}
                style={{ transitionDelay: "2.0s" }}
                in={true}
              >
                <Button
                  variant="contained"
                  style={{ fontSize: "20px" }}
                  color="secondary"
                  className={classes.button}
                  onClick={this.handleChange}
                >
                  Register
                </Button>
              </Fade>
              <Fade
                timeout={{ enter: 1200 }}
                style={{ transitionDelay: "2.0s" }}
                in={true}
              >
                <Button
                  variant="contained"
                  style={{ fontSize: "20px", margin: "20px" }}
                  className={classes.button}
                  onClick={this.handleChange2}
                >
                  LogIn
                </Button>
              </Fade>
            </Grid>
          </Grid>
        </Plx>

        {/* <Plx className="MyAwesomeParallax" parallaxData={parallaxData2}> */}
      </>
    );
  }
}

export default withStyles(styles)(GetStarted);