import React, { Component } from 'react'
import { withStyles,Grid } from '@material-ui/core'
import CompanyCard from '../cards/CompanyCard'
import Button from '@material-ui/core/Button'

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
  },
  button: {
    marginBottom: 35
  },
  holder:{
    marginTop:55
  }
}

class searchCases extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cases: [],
      search: this.props.match.params.search,
      isLoadied: false,
      flag: false,
      index: 0
    }
  }

  componentDidMount() {
    fetch('https://serverbrogrammers.herokuapp.com/api/investors/searchCases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag: this.state.search, index: this.state.index })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoadied: true,
          flag: true,
          cases: json.Search,
          index: this.state.index
        })
        console.log(this.state.cases)
      })
  }

  handleNext = () => {
    fetch('https://serverbrogrammers.herokuapp.com/api/investors/searchCases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tag: this.state.search,
        index: this.state.index + 1
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoadied: true,
          flag: true,
          cases: json.Search,
          index: this.state.index + 1
        })
        console.log(this.state.cases)
      })
  }
  handleBack = () => {
    fetch('https://serverbrogrammers.herokuapp.com/api/investors/searchCases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tag: this.state.search,
        index: this.state.index > 0 ? this.state.index - 1 : this.state.index
      })
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoadied: true,
          flag: true,
          cases: json.Search,
          index: this.state.index > 0 ? this.state.index - 1 : this.state.index
        })
        console.log(this.state.cases)
      })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.holder}>
        <Grid
          container
          spacing={20}
          alignItems="center"
          justify="center"
          style={{ backgroundColor: '#034066cc' }}
        >
          <Grid
            item
            xs={12}
            lg={12}
            style={{
              position: 'sticky',
              textAlign: 'center',
              paddingTop: 10,
              paddingBottom: 10,
              marginTop: '0px',
              marginBottom: '100px',
              color: 'white',
              top: '55px',
              zIndex: 13,
              backgroundColor: '#034066'
            }}
          >
            <h2>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'نتائج البحث'
                : 'Search Results'}{' '}
            </h2>
          </Grid>
          {this.state.cases.map((item, i) => (
            <Grid item xs={12} md={4} sm={6} lg={4}>
              <CompanyCard key={i} company={item} />
            </Grid>
          ))}
        </Grid>
        <div align="center">
          <Button onClick={this.handleBack} className={classes.button}>
            {sessionStorage.getItem('lang') === 'ar' ? 'الماضى' : 'Back'}
          </Button>
          <Button onClick={this.handleNext} className={classes.button}>
            {sessionStorage.getItem('lang') === 'ar' ? 'التالى' : 'Next'}
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(searchCases)
