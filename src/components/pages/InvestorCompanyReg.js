import React, { Component } from 'react';
import Navbar from '../layout/Navbar.js';
import Buttons from '../layout/Buttons/BlueButton.js';
import AlertDialogSlide from '../layout/Dialogs/SlideDialog';
import DatePickers from '../layout/DatePickers/Date';
import ListCheckers from '../layout/Checkers/ListCheckers'

class InvestorCompanyReg extends Component{
    render(){
        return(
            <React.Fragment>
                <Buttons/>
                <AlertDialogSlide/>
                <DatePickers/>
                <ListCheckers/>
            </React.Fragment>
        )
    }
}
export default InvestorCompanyReg;