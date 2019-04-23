import React from "react";
import { MenuItem, TextField, Paper } from "@material-ui/core";

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
      fetch("http://localhost:3000/routes/api/admins/company/types", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.props.token
        }
      })
        .then(response => {
          response.json().then(data => {
      
            this.setState({ companytypes:  Object.keys(data.data).map(key => [key, data.data[key]][1].legalCompanyForm)});
          });
        })
        .catch(error => console.log(error.message));
    }
  };
  handleSelection = state => {
    const styles = theme => ({
      container: {
        display: "flex",
        flexWrap: "wrap"
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
      },
      dense: {
        marginTop: 16
      },
      menu: {
        width: 200
      }
    });

    return (
      <TextField
        id="outlined-select-currency"
        select
        label={sessionStorage.getItem('lang') === 'en' ? "company type" : "نوع الشركة"}
        className={styles.textField}
        value={this.state.selected}
        onChange={this.handleChange("selected")}
        SelectProps={{
          MenuProps: {
            className: styles.menu
          }
        }}
        helperText={sessionStorage.getItem('lang') === 'en' ? "Please select your Company Type" : "اختار نوع الشركة"}
        margin="normal"
        variant="outlined"
      >
      { sessionStorage.setItem("type", this.state.selected)}
        {this.state.companytypes.map(option => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
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
