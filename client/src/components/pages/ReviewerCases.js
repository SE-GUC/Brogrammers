
import React, { Component } from 'react'
import SimpleCard from '../cards/SimpleCard2'
import LinearDeterminate from "../layout/loading/CustomizedProgress"
class ReviewerCases extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      reviewerCases: [],
      isLoaded:false

    }
  }

  componentDidMount () {
    {
      fetch('https://serverbrogrammers.herokuapp.com/api/reviewer/getAllTasks/view', {
        headers: new Headers({
          'x-access-token': this.props.token
        })
      })

        .then(res => res.json())
        .then(json => {
          if (json.data.length === 0) {
            alert('No Companies Available')
          } else {
            this.setState({ isLoaded:true,
              reviewerCases: json.data
            })
          }
        })
    }
  }

  render () {
    if(!this.state.isLoaded){return <LinearDeterminate/>}else{
    const listItems = this.state.reviewerCases.map((item, i) => (
      <div>
        <SimpleCard key={i} nameInEnglish={item.nameInEnglish} status={item.status}
          compid={item._id}
          token={this.props.token}
          addressHQ={item.addressHQ}
          Status={item.status}
          addressHQ={item.addressHQ}
          regulationLaw={item.regulationLaw}
          legalCompanyForm={item.legalCompanyForm}
          nameInArabic={item.nameInArabic}
          governerateHQ={item.governerateHQ}
          cityHQ={item.cityHQ}

          telephoneHQ={item.telephoneHQ}
          faxHQ={item.faxHQ}
          capitalCurrency={item.capitalCurrency}
          capital={item.capital}
          investorName={item.investorName}
          investorSex={item.investorSex}
          investorNationaty={item.investorNationaty}
          investorIdentificationType={item.investorIdentificationType}
          investorIdentificationNumber={item.investorIdentificationNumber}
          investorBD={item.investorBD}
          investorAddress={item.investorAddress}
          investorTelephone={item.investorTelephone}
          investorFax={item.investorFax}
          investorEmail={item.investorEmail}

        />
        <br />
      </div>
    ))

    return (
      <div>

        {listItems}

      </div>

    )
    }
  }
}

export default ReviewerCases
