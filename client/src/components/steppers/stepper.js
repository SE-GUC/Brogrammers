import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ChooseType from "../pages/ChooseType";
import { Paper, Grid } from "@material-ui/core";
import PostForm from "../pages/postForm";

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    marginLeft: theme.spacing.unit * 1,
    marginRight: theme.spacing.unit * 1,
   
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 7}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`
  },
  backButton: {
    marginRight: theme.spacing.unit
  },
  instructions: {}
});

class HorizontalLabelPositionBelowStepper extends React.Component {
  getSteps = () => {
    return ["Select a company type", "Fill The Required Fields"];
  };
  getStepContent = stepIndex => {
    switch (stepIndex) {
      case 0:
        return <ChooseType />;
      case 1:
        return (
          <PostForm
            token={this.props.token}
            type={sessionStorage.getItem("companyType")}
          />
        );
      default:
        return "Unknown stepIndex";
    }  
  };
  state = {
    activeStep: 0
  };

  handleNext = () => {
    console.log(sessionStorage.getItem("companyType"));
    if (sessionStorage.getItem("companyType")) {
      this.setState(state => ({
        activeStep: state.activeStep + 1
      }));
    } else {
      console.log("must not be null");
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };
handleButtons=()=>{
  
}
  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
      <Grid item xs={12} lg={6}>
             <Paper className={classes.paper} elevation={16}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <>
                <div>{this.getStepContent(activeStep)}</div>
                <div >
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  {activeStep!==steps.length-1? <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                  >Next
                  </Button>:""}
                 
                
                </div>
              </>
            )}
          </div>
        </Paper>
      </Grid>
      </div>
      
    );
  }
}

HorizontalLabelPositionBelowStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(HorizontalLabelPositionBelowStepper);
