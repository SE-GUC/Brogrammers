import React, { Component } from 'react'
import MyLawyerCasesCard from '../cards/MyLawyerCasesCard'
import Button from '@material-ui/core/Button'

class ViewLawyerCasesbyID extends Component {
  constructor (props) {
    super(props)
    this.state =

        { // id : this.params.id,
          companies: [],
          isLoadied: false

        }
        this.sortById=this.sortById.bind(this);
        this.sortByCreationDate=this.sortByCreationDate.bind(this);
        this.sortByStatus=this.sortByStatus.bind(this);

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
    const myData=this.state.companies.sort(function(a, b){
      if(a._id < b._id) { return -1; }
      if(a._id > b._id) { return 1; }
      return 0;
  })
    this.setState(
      prevState=>{
        return{
          myData

          }
        },
        ()=>console.log(myData)
      
     )
  this.forceUpdate()
    
 
    
  }

  sortByCreationDate(e){
    const myData=this.state.companies.sort(function(a, b){
      if(a.creationDate < b.creationDate) { return -1; }
      if(a.creationDate > b.creationDate) { return 1; }
      return 0;
  })
    this.setState(
      prevState=>{
        return{
          myData

          }
        },
        ()=>console.log(myData)
      
     )
  this.forceUpdate()
    
  
  }


  sortByStatus(e){
    const myData=this.state.companies.sort(function(a, b){
      if(a.status < b.status) { return -1; }
      if(a.status > b.status) { return 1; }
      return 0;
  })
    this.setState(
      prevState=>{
        return{
          myData

          }
        },
        ()=>console.log(myData)
      
     )
  this.forceUpdate()
    
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
              <Button variant="outlined" color="dark" onClick={this.sortById}> Sort By Id</Button> >
               <Button variant="outlined" color="dark" onClick={this.sortByCreationDate}> Sort By creation Date</Button> >
               <Button variant="outlined" color="dark" onClick={this.sortByStatus}> Sort By Status</Button> >
          
          
{listItems}
          
        </div>

      )
    }
  }
}
export default ViewLawyerCasesbyID
