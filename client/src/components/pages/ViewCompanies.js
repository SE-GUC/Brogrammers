import React, { Component } from 'react'
import { withStyles, List, Paper, Grid } from '@material-ui/core'
import InvestorCard from '../cards/InvestorCard'
import GridList from '@material-ui/core/GridList'
import Grow from '@material-ui/core/Grow'

const styles = {
  list: {
    width: 'auto',
    height: 'auto',
    backgroundColor: 'rgba(200,200,200,0.4)',
    maxWidth: '85%'
  },
 
  header: {
    position: "-webkit-sticky",
    // eslint-disable-next-line no-dupe-keys
    position: "sticky",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: "0px",
  
    color: "white",
    top: "55px",
    zIndex: 13,
    backgroundColor: "#034066"
  }
}

class ViewCompanies extends Component {
  constructor (props) {
    super(props)
    this.state = {
      investorCompanies: []
    }
  }

  componentDidMount () {
    fetch(`https://serverbrogrammers.herokuapp.com/api/investors/View/ViewCompanies`, {
      method: 'GET',
      headers: {
        'x-access-token': this.props.token
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ investorCompanies: json.data })
      })
  }

  render () {
    const { classes } = this.props
    if (!this.state.investorCompanies) {
      return (<h10>{sessionStorage.getItem('lang') === 'en' ? 'You have no companies' : 'لا يوجد لديك شركات'}</h10>)
    } else {
      return (
        <div >
 <Grid item xs={12} lg={12} style={styles.header}>
                    <h2>
                        {sessionStorage.getItem("lang") === "ar"
                            ? "شركاتي"
                            : "My Companies"}{" "}
                    </h2>
                </Grid>  
                <Grid container>
              {this.state.investorCompanies.map((item, i) => (
                <Grow in='true'>
                            <Grid item xs={12} md={4} sm={6} lg={4} style={{marginBottom:40,padding:20}} >

                  <InvestorCard key={i} company={item} />
                  </Grid>
                </Grow>
              ))}
              </Grid>
        </div>
      )
    }
  }
}
export default withStyles(styles)(ViewCompanies)
