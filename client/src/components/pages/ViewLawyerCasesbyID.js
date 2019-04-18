import React, { Component } from 'react'
import MyLawyerCasesCard from '../cards/MyLawyerCasesCard'


class ViewLawyerCasesbyID extends Component {
  constructor (props) {
    super(props)
    this.state =

        { // id : this.params.id,
          companies: [],
          isLoadied: false

        }
  }

  componentDidMount () {
    fetch(`http://localhost:3000/api/lawyer/getTasks`, {
      headers: new Headers({
        'x-access-token': this.props.token
      }) })
      .then(response => response.json())
      .then(json => {
        this.setState({ isLoadied: true,
          companies: json.data })
      })
  }
  
  sortById(e){
    var { isLoadied, companies } = this.state
    if (!isLoadied) { return <div> Loading ...</div> } else {
      let sortedCompanies=this.state.companies.sort((a,b)=>{
        return b._id-a._id;
      });
      this.state.companies=sortedCompanies;
      console.log(sortedCompanies);
    } 
  }




  render () {
    var { isLoadied, companies } = this.state
    if (!isLoadied) { return <div> Loading ...</div> } else {
      const listItems=
      this.state.companies.map((element, i) => (
        <div>
        <MyLawyerCasesCard key={i} title={'helo'} info={element.investorName} 
        status={element.status}
        compid={element._id}  
        nameInEnglish={element.nameInEnglish}
        token={this.props.token}
        addressHQ={element.addressHQ}
          Status={element.status}
          addressHQ={element.addressHQ}
          regulationLaw={element.regulationLaw}
          legalCompanyForm={element.legalCompanyForm}
          nameInArabic={element.nameInArabic}
          governerateHQ={element.governerateHQ}
          cityHQ={element.cityHQ}

          telephoneHQ={element.telephoneHQ}
          faxHQ={element.faxHQ}
          capitalCurrency={element.capitalCurrency}
          capital={element.capital}
          investorName={element.investorName}
          investorSex={element.investorSex}
          investorNationaty={element.investorNationaty}
          investorIdentificationType={element.investorIdentificationType}
          investorIdentificationNumber={element.investorIdentificationNumber}
          investorBD={element.investorBD}
          investorAddress={element.investorAddress}
          investorTelephone={element.investorTelephone}
          investorFax={element.investorFax}
          investorEmail={element.investorEmail}
        
        
        
        
        />
        <br></br>
        </div>
      ))

      return (

        <div>
                  <button type='button' onClick={this.sortById}>
                Sort By Id
                </button>
        
          
{listItems}
          
        </div>

      )
    }
  }
}
export default ViewLawyerCasesbyID
