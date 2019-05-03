import React from "react";
import {
  MenuItem,
  TextField,
  Paper,
  FormControl,
  NativeSelect,
  FormHelperText,
  Grid
} from "@material-ui/core";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class CreateCompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companytypes: [],
      selected: null,
      error: null
    };
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleFetch = state => {
    if (state.companytypes.length === 0) {
      fetch(
        "http://serverbrogrammers.herokuapp.com/routes/api/admins/company/types",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.props.token
          }
        }
      )
        .then(response => {
          response.json().then(data => {
            this.setState({
              companytypes: Object.keys(data.data).map(
                key => [key, data.data[key]][1].legalCompanyForm
              )
            });
          });
        })
        .catch(error => console.log(error.message));
    }
  };
  handleSelection = state => {
    const styles = theme => ({
      container: {
        display: "flex",
        flexWrap: "noWrap"
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
      },
      dense: {
        marginTop: 16
      },
      menu: {},
      root: {
        display: "flex",
        flexWrap: "wrap"
      },
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2
      }
    });

    return (
      <Grid item xs={12}>
      <FormControl className={styles.formControl}  fullWidth>
        <NativeSelect
          className={styles.selectEmpty}
          value={this.state.selected}
          name="selected"
          onChange={this.handleChange("selected")}
         
        >
          <option value="" disabled>
            {sessionStorage.getItem("lang") === "en"
              ? "company type"
              : "نوع الشركة"}
          </option>
          {sessionStorage.setItem("companyType", this.state.selected)}
          {this.state.companytypes.map((option,i) => (
            <option key={i} value={option}>{option}</option>
          ))}
        </NativeSelect>
        <FormHelperText>
          {sessionStorage.getItem("lang") === "en"
            ? "company type"
            : "نوع الشركة"}
        </FormHelperText>
      </FormControl>
      </Grid>

    );
  };

  render() {
    return (
      <>
        {this.handleFetch(this.state)}
        {this.handleSelection(this.state)}
      </>
    );
  }
}

export default CreateCompany;
