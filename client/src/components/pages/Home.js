import React, { Component } from "react";
import { withStyles, Grid, Button, Fade } from "@material-ui/core";
import ViewApprovedCompanies from "./ViewApprovedCompanies";
import Image from "../Images/3amood.jpg"; // Import using relative path
import Plx from "react-plx";

const parallaxData1 = [
  {
    start: ".element",
    end: 200,
    properties: [
      {
        startValue: 0,
        endValue: 5,
        property: "blur"
      }
    ]
  }
];

const parallaxData2 = [
  {
    start: "self",
    duration: 300,
    properties: [
      {
        startValue: 0,
        endValue: -300,
        property: "translateY"
      }
    ]
  }
];
const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    height: "70vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    margin: 0,
    padding: 0
  }
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { hi: "hi", checked: false };
  }
  handleChange = () => {
    console.log(this.state.checked);
    this.setState(state => ({ checked: !state.checked }));
    document.location.href = "/getStarted";
  };
  render() {
    const { classes } = this.props;
    return (
      <>
        <Plx className="MyAwesomeParallax" parallaxData={parallaxData1}>
          <Grid
            container={12}
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.paperContainer}
          >
            <br />
            <br />
            <br />
            <Grid item xs={4}>
              {" "}
              <Fade timeout={{ enter: 1000 }} in={true}>
                <h1 style={{ color: "white", textAlign: "center" }}>
                  {" "}
                  {sessionStorage.getItem("lang") === "en"
                    ? "Start your company now"
                    : "ابدأ شركتك الأن"}
                </h1>
              </Fade>
            </Grid>
            <Grid item xs={4}>
              <Fade
                timeout={{ enter: 1000 }}
                style={{ transitionDelay: "0.6s" }}
                in={true}
              >
                <Button
                  variant="outlined"
                  onClick={this.handleChange}
                  text={
                    sessionStorage.getItem("lang") === "en"
                      ? "get started here"
                      : "ابدأ هنا"
                  }
                >
                  <b style={{ color: "white" }}>
                    {sessionStorage.getItem("lang") === "en"
                      ? "get started here"
                      : "ابدأ هنا"}
                  </b>
                </Button>
              </Fade>
            </Grid>
          </Grid>
        </Plx>

        {/* <Plx className="MyAwesomeParallax" parallaxData={parallaxData2}> */}
        {/* <Plx className="MyAwesomeParallax" parallaxData={parallaxData1}> */}

        {/* </Plx> */}
        <ViewApprovedCompanies />
        {/* </Plx> */}
      </>
    );
  }
}

export default withStyles(styles)(Home);
