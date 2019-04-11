import React from 'react'
import Stepper from '../steppers/stepper'
import BlueButton from '../buttons/Button'
class  ChooseCompanyType extends React.Component  {
    constructor(props)
    {
        super(props)
        this.state = {
            link: null,
            regulationLaws:null,
            companyType:null,
           
            activate:null
        }

    }
    handleType(e)
    {
        this.setState(...this.state,
                this.companyType = e.target.companyType
                )
    }
    handleLaw(e)
    {
        this.setState(...this.state,
                this.regulationLaws = e.target.regulationLaws,
             )
    }
    handleActivation(activation)
    {
        this.setState(...this.state,
                this.activation =activation
               )
    }
    render(){
  return (
    <>
    <Stepper    handleType = {this.handleType} handleActivation= {this.handleActivation} />
   <div style = {{display:this.state.activate===1? "":"none"}} >
    <BlueButton onClick={this.handleLaw.bind(this)}
                  companyType={"Law 68"}
                  move = {true}>
                  law 68

    </BlueButton>
    <BlueButton onClick={this.handleLaw.bind(this)}
                  companyType={"Law 128"}
                  move = {true}>
                  law 128

    </BlueButton>
    </div>
    <div style = {{display:this.state.activate===2? "":"none"}} >
    <BlueButton onClick={this.handleType.bind(this)}
                  companyType={"SSC"}
                  move = {true}>
                  SSC

    </BlueButton>
    <BlueButton onClick={this.handleType.bind(this)}
                  companyType={"SPC"}
                  move = {true}>
                  SPC

    </BlueButton>
    </div>
              
              
    
    </>
  )
  }
}


export default ChooseCompanyType