
import React, { Component } from 'react'
// import SimpleCard from '../cards/SimpleCard3'
import ViewLawyersByAdminCard from '../cards/ViewLawyersByAdminCard'
import LinearDeterminate from "../layout/loading/CustomizedProgress"
class ViewLawyersByAdmin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lawyersOnSystem: [],
      isLoaded:false

    }
  }

  componentDidMount () {
    // insert the method by replacing the below one
    
      fetch('https://serverbrogrammers.herokuapp.com/api/lawyer/', {
        headers: new Headers({
          'x-access-token': this.props.token
        })
      })

        .then(res => res.json())
        .then(json => {
          this.setState({ isLoaded:true,
            lawyersOnSystem: json.data
          })
        })
    
  }

  render () {

if(!this.state.isLoaded){return <LinearDeterminate/>}
    const listItems = this.state.lawyersOnSystem.map((item, i) => (
      <div>
        <ViewLawyersByAdminCard key={i}
          token={this.props.token}
          id={item._id}
          firstName={item.firstName}
          middleName={item.middleName}
          lastName={item.lastName}
          email={item.email}
          salary={item.salary}
          mobileNumber={item.mobileNumber}
          birthDate={item.birthDate}
          yearsOfExperience={item.yearsOfExperience}

        />
        <br />
      </div>)
    )

    return (
      <div>

        {listItems}
        <br />

      </div>

    )
  }
}

export default ViewLawyersByAdmin
