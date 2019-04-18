import React, { Component } from 'react'
import { withStyles, List, Paper } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import CompanyCard from '../cards/CompanyCard'

const styles = {
  list: {
    width: 'auto',
    height: 'auto',
    maxWidth: 900
  },
  sep: {
    marginLeft: 400
  }
}

class ViewApprovedCompanies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      approvedCompanies: []
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/company/approved`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ approvedCompanies: json.data })
      })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.holder}>
        <h1>Approved Companies</h1>
        <div className={classes.sep}>
          <GridList className={classes.list}>
            {this.state.approvedCompanies.map((item, i) => (
              <CompanyCard key={i} company={item} />
            ))}
          </GridList>
        </div>
      </div>
    )
  }
}
export default withStyles(styles)(ViewApprovedCompanies)
