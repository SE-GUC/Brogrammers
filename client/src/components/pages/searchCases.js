import React, { Component } from 'react'
import { withStyles, List, Paper } from '@material-ui/core'
import GridList from '@material-ui/core/GridList'
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
  }
  
}

class searchCases extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cases: [],
      search:this.props.match.params.search,
      isLoadied:false,
      flag : false,
      index:0
    }
  }

  componentDidMount() {
   
    fetch("http://localhost:3000/api/investors/searchCases", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({tag :this.state.search ,
     index:this.state.index })
      
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ isLoadied: true,
            flag:true,
            cases: json.Search, 
            index:this.state.index}
           )
        console.log(this.state.cases)
        
      })

     
  }

  handleNext=()=>{
    
    fetch("http://localhost:3000/api/investors/searchCases", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({tag :this.state.search ,
     index:this.state.index+1 })
      
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ isLoadied: true,
            flag:true,
            cases: json.Search, 
            index:this.state.index+1}
           )
        console.log(this.state.cases)
        
      })
  }
  handleBack=()=>{

    fetch("http://localhost:3000/api/investors/searchCases", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({tag :this.state.search ,
     index:this.state.index>0?this.state.index-1:this.state.index })
      
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ isLoadied: true,
            flag:true,
            cases: json.Search, 
            index:this.state.index>0? this.state.index-1 : this.state.index}
           )
        console.log(this.state.cases)
        
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
            <h1 style={{ paddingLeft: '5%' }}> cases</h1>
            
            {this.state.cases.map((item, i) => (
              <CompanyCard key={i} company={item} />
            ))}
            
          </GridList>
          <div align="center">
          <Button onClick={this.handleBack} >{sessionStorage.getItem('lang')==='en'? 'Back': 'الماضى'}</Button>
          <Button onClick={this.handleNext} >{sessionStorage.getItem('lang')==='en'? 'Next': 'التالى'}</Button>
          </div>
        </div>
      </div>
    )
  }
 
}

export default withStyles(styles)(searchCases)
