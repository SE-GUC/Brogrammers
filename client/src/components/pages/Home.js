import React, { Component } from "react";
import { Paper, withStyles, Grid, Button, Fade } from "@material-ui/core";
import ViewApprovedCompanies from "./ViewApprovedCompanies";
import Image from "../Images/3amood.jpg"; // Import using relative path
import Plx from "react-plx";
import StickyText from "./StickyText";
import { StickyContainer, Sticky } from "react-sticky";

const parallaxData1 = [
  {
    start: "self",
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
    end: 180,
    properties: [
      {
        startValue: 0,
        endValue: -300,
        property: "translateY"
      }
    ]
  },
  {
    start: "self",
    end: 150,
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: "opacity"
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
    padding: 0,
    marginTop: 50
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
  };
  render() {
    const { classes } = this.props;
    const { checked } = this.state;
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
                  Start your company now
                </h1>
              </Fade>
            </Grid>
            <Grid item xs={4}>
              <Fade
                timeout={{ enter: 1000 }}
                style={{ transitionDelay: "0.6s" }}
                in={true}
              >
                <Button variant="outlined" onClick={this.handleChange}>
                  <p style={{ color: "white" }}>get started here</p>
                </Button>
              </Fade>
            </Grid>
          </Grid>
        </Plx>

        <Plx className="MyAwesomeParallax" parallaxData={parallaxData2}>
          <ViewApprovedCompanies />
        </Plx>
       <Plx className ="MyAwesomeParallax" parallaxDara={parallaxData2}>
       </Plx>
      </>
    );
  }
}

export default withStyles(styles)(Home);
