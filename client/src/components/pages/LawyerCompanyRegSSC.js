import React, { Component } from 'react'
import AlertDialogSlide from '../layout/Dialogs/SlideDialog'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import green from '@material-ui/core/colors/green'
import { Avatar } from '@material-ui/core'
import AssignmemtIcon from '@material-ui/icons/Assignment'
import Grid from '@material-ui/core/Grid'
import Required from '../layout/inputs/Required'
import NotRequired from '../layout/inputs/NotRequired'
import CssBaseline from '@material-ui/core/CssBaseline'
import Gender from '../layout/inputs/Gender'
import Manager from './Manager'
import Date from '../layout/inputs/Date'

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 7}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500]
    }
})

class LawyerCompanyReg extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: {
                legalCompanyForm: '',
                nameInArabic: '',
                nameInEnglish: '',
                governerateHQ: '',
                cityHQ: '',
                addressHQ: '',
                telephoneHQ: '',
                faxHQ: '',
                capitalCurrency: '',
                capital: '',
                investorName: '',
                investorSex: '',
                investorNationality: '',
                investorIdentificationType: '',
                investorIdentificationNumber: '',
                investorBD: '',
                investorAddress: '',
                investorTelephone: '',
                investorFax: '',
                investorEmail: '',
                managers: new Array()
            }
        }
        this.handleRegister = this.handleRegister.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleInput = this.handleInput.bind(this)
        this.handleDate = this.handleDate.bind(this)
    }

    handleRegister(event) {
        event.preventDefault()
        fetch('http://localhost:3000/api/lawyer/lawyerinvestor/createssccompany',
            {
                method: 'POST',
                body: JSON.stringify(this.state.company),
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': 'http://localhost:3000',
                    'x-access-token': sessionStorage.getItem("jwtToken")
                }
            }).then(response => {
                response.json().then(data => {
                    console.log('Successful' + data)
                })
            })
    }

    handleInput(event) {
        let value = event.target.value
        let name = event.target.name
        this.setState(prevState => {
            return {
                company: {
                    ...prevState.company, [name]: value
                }
            }
        }, () => console.log(this.state.company)
        )
    }

    handleOnClick(js) {
        this.state.company.managers.push(js)
        this.setState(prevState => {
            return {
                company: {
                    ...prevState.company, managers: this.state.company.managers
                }
            }
        }, () => console.log(this.state.company)
        )
    }

    handleDate(v) {
        this.setState(prevState => ({
            company:
            {
                ...prevState.company, investorBD: v
            }
        }))
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper} elevation={16} >
                    <Grid container spacing={0} justify='space-evenly'>
                        <Grid container direction='column' alignItems='center'>
                            <Avatar className={classes.greenAvatar}>
                                <AssignmemtIcon />
                            </Avatar>
                        </Grid>
                        <Grid container direction='column' alignItems='center'>
                            <Typography variant='h6' component='h3'>
                                <p>
                                    {sessionStorage.getItem('lang') === 'en' ? 'Fill in your Company Form!' : 'املئ بينات شركتك'}
                                </p>
                            </Typography>
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Law' : ' ‫القانون‬‫ المنظم'} type={'text'} callBack={this.handleInput} name={'regulationLaw'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Legal Company Form' : '‫شكل‬ ‫الشركة ‫القانوني‬ '} type={'text'} callBack={this.handleInput} name={'legalCompanyForm'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Name In Arabic' : ' ‫اسم‬‫ المنشأة‬'} type={'text'} callBack={this.handleInput} name={'nameInArabic'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <NotRequired field={sessionStorage.getItem('lang') === 'en' ? 'Name In English' : 'اسم‬ ‫المنشأه‬‫بالانجلیزیة‬ (في‬‬ ‫حالة‫ وجوده‬‫)'} type={'text'} callBack={this.handleInput} name={'nameInEnglish'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Government HQ' : '‫المركز ‫الرئیسي‬ ‫(المحافظة)‬‬'} type={'text'} callBack={this.handleInput} name={'governerateHQ'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'City HQ' : 'المركز ‫الرئیسي‬ ‫‫(المدینة)'} type={'text'} callBack={this.handleInput} name={'cityHQ'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Address HQ' : ' ‫المركز‬ ‫الرئیسي ‫(العنوان)'} type={'text'} callBack={this.handleInput} name={'addressHQ'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Telephone HQ' : '‫التلیفون‬'} type={'text'} callBack={this.handleInput} name={'telephoneHQ'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Fax HQ' : '‫الفاكس‬'} type={'text'} callBack={this.handleInput} name={'faxHQ'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Capital Currency' : '‫عملة‬ ‫رأس‬ ‫المال‬'} type={'text'} callBack={this.handleInput} name={'capitalCurrency'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Capital' : 'رأس‬ ‫المال'} type={'number'} callBack={this.handleInput} name={'capital'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Name' : '‫‫الاسم‬ المستثمر‬'} type={'text'} callBack={this.handleInput} name={'investorName'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Type' : '‫نوع‬ المستثمر‬'} type={'text'} callBack={this.handleInput} name={'investorType'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Gender field={sessionStorage.getItem('lang') === 'en' ? 'Investor Sex' : '‫‫جنس‬ المستثمر‬'} callBack={this.handleInput} name={'investorSex'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Nationality' : 'جنسیة‬ ‫المستثمر‬'} type={'text'} callBack={this.handleInput} name={'investorNationality'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Identification Type' : '‫‫نوع‬ ‫اثبات‬ شخصیة‬ المستثمر‬‫'} type={'text'} callBack={this.handleInput} name={'investorIdentificationType'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Identification Number' : '‫‫رقم‬ ‫اثبات‬ شخصیة‬ المستثمر‫‬'} type={'number'} callBack={this.handleInput} name={'investorIdentificationNumber'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Date callBack={this.handleDate} name={'investorBD'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Address' : '‫‫تلیفون‬ المستثمر‬'} type={'text'} callBack={this.handleInput} name={'investorAddress'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Telephone' : '‫‫فاكس‬ المستثمر‬'} type={'number'} callBack={this.handleInput} name={'investorTelephone'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Fax' : ' ‫برید الكترونى‬ ‬‫المستثمر‬'} type={'number'} callBack={this.handleInput} name={'investorFax'} />
                        </Grid>
                        <Grid container direction='column' alignItems='center' >
                            <Required field={sessionStorage.getItem('lang') === 'en' ? 'Investor Email' : '‫‫‫عنوان‬ الإقامة‬ المستثمر‬'} type={'text'} callBack={this.handleInput} name={'investorEmail'} />
                        </Grid>
                        <Grid>
                            <Manager callBack={this.handleOnClick} />
                        </Grid>
                        <Grid>
                            <br />
                        </Grid>
                        <Grid container direction='column' alignItems='flex-end' >
                            <AlertDialogSlide handleRegister={this.handleRegister} />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}
export default withStyles(styles)(LawyerCompanyReg)
