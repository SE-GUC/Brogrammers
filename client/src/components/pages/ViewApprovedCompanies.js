import React, { Component } from 'react'
import { withStyles, List, Paper } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
import CompanyCard from '../cards/CompanyCard'
import InvestorCard from '../cards/InvestorCard'

const styles = {
  list: {
    width: 'auto',
    height: 'auto',
    maxWidth: 1000
  },
  sep: {
    marginLeft: '25%'
  },
  companiesBackground: {
    background: 'linear-gradient(to top, #000000, #DCDCDC)',
    borderStyle: 'solid',
    borderColor: 'black'
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
        <div
          className={classes.sep}
          style={{ paddingTop: '5%', paddingRight: '23%' }}
        >
          <GridList className={classes.list} style={styles.companiesBackground}>
            <h1 style={{ paddingLeft: '5%' }}> Approved Companies</h1>
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
