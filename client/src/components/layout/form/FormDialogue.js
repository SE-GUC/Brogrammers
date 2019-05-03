import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import NotRequired from "../inputs/NotRequired";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "../snackbar/Snackbar";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class FormDialogue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      width: "100%",
      success: false,
      company: {
        regulationLaw: "",
        legalCompanyForm: "",
        nameInArabic: "",
        nameInEnglish: "",
        governerateHQ: "",
        cityHQ: "",
        addressHQ: "",
        telephoneHQ: "",
        faxHQ: "",
        capitalCurrency: "",
        capital: "",
        lawyer: "",
        lawyerComment: "",
        reviewer: "",
        reviewerComment: "",
        managers: [
          {
            name: "",
            type: "",
            sex: "",
            nationality: "",
            identificationType: "",
            identificationNumber: "",
            birthDate: "",
            address: "",
            managerialPosition: ""
          }
        ]
      }
    };
    this.handleInputs = this.handleInputs.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  clean = obj => {
    for (var propName in obj) {
      if (
        obj[propName] === "" ||
        obj[propName] === undefined ||
        obj[propName] === []
      ) {
        delete obj[propName];
      }
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    let userData = this.state.company;

    this.clean(userData);
    console.log(userData);
    console.log(this.props.id);
    fetch("http://serverbrogrammers.herokuapp.com/api/investors/MyRequests/" + this.props.id, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": sessionStorage.getItem("jwtToken")
      }
    }).then(response => {
      response.json().then(data => {
        console.log("Successfuly updated" + data);
        this.setState({ success: true });
        window.location.reload();
      });
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleInput = props => {
    return Object.keys(props.data).map(key => [key, props.data[key]][0]);
  };
  handleInputval = props => {
    return Object.keys(props.data).map(key => [key, props.data[key]][1]);
  };
  handleInputs = e => {
    let value = e.target.value;
    let name = e.target.name;
    // console.log(this.state.investor)
    this.setState(
      prevState => {
        return {
          company: {
            ...prevState.company,
            [name]: value
          }
        };
      },
      () => console.log(this.state.company)
    );
  };
  render() {
    return (
      <div>
        <MenuItem onClick={this.handleClickOpen}>Edit</MenuItem>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {" "}
          <Grid container direction="column" alignItems="center">
            <DialogTitle id="form-dialog-title">Form Resubmission</DialogTitle>
          </Grid>
          <DialogContent>
            <DialogContentText>
              {sessionStorage.getItem("lang") === "en"
                ? "This form has been commented on and rejected by the lawyer, please edit the required fields to proceed."
                : "هذا النص تم التعليق عليه و رفض من المراجع من فضلك عدل الحقول المطلوبه"}
            </DialogContentText>

            {this.handleInput(this.props).map((input, i) =>
              input !== "status" &&
              input !== "_id" &&
              input !== "__v" &&
              input !== "lawyer" &&
              input !== "lawyerComment" &&
              input !== "reviewer" &&
              input !== "reviewerComment" ? (
                <Grid container direction="column" alignItems="center">
                  <NotRequired
                    name={input}
                    field={input}
                    type="text"
                    callBack={this.handleInputs}
                  />
                </Grid>
              ) : (
                console.log()
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {sessionStorage.getItem("lang") === "en" ? "Cancel" : "الغاء"}
            </Button>
            <Button
              onClick={event => {
                this.handleSubmit(event);
                this.handleClose();
              }}
              color="primary"
            >
              {sessionStorage.getItem("lang") === "en"
                ? "Save Changes"
                : "حفظ التغيرات"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(FormDialogue);
