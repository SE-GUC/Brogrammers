import React, { Component } from "react"
import ReactDOM from "react-dom"

class ViewApprovedCompanies extends Component {
  constructor() {
    super()
    this.state = {
      companies: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/company/approved`)
      .then(response => response.json())
      .then(json => {
        this.setState({ isLoaded: true, companies: json.data })
      })
  }

  render() {
    var { isLoaded, companies } = this.state
    if (!isLoaded) return <div> Loading Page</div>
    else {
      return (
        <div>
          <h1>Approved Companies</h1>
          <li>
            {companies.map(function(companies, index) {
              return (
                <div>
                  <h2>Company name: {companies.nameInEnglish}</h2>
                  <h2>Location: {companies.governerateHQ}</h2>
                </div>
              )
            })}
          </li>
        </div>
      )
    }
  }
}
export default ViewApprovedCompanies
