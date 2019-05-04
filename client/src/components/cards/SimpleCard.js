import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import Typography from '@material-ui/core/Typography'
import Button2 from '../buttons/Button2'
const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

function SimpleCard(props) {
  const { classes } = props
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {sessionStorage.getItem('lang') === 'en' ? 'Learn More' : ' المزيد'}:{' '}
          {props.status}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.nameInEnglish}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.addressHQ}
        </Typography>
        <Typography component="p">
          <ul>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Company ID'
                : 'رقم حساب الشركه'}
              : {props.compid}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Address HQ'
                : 'عنوان الشركه '}
              : {props.addressHQ}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Regulation Law'
                : 'القانون المنظم'}
              : {props.regulationLaw}{' '}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Legal Company Form'
                : 'شكل الشركه القانونى'}
              : {props.legalCompanyForm}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Name In Arabic'
                : 'اسم الشركه'}
              : {props.nameInArabic}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Governerate HQ'
                : 'المركز الرئيسى '}
              :{props.governerateHQ}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'City HQ'
                : 'المركز الرئيسى (المدينه)ه '}
              : {props.cityHQ}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Telephone'
                : 'التليفون '}
              : {props.telephoneHQ}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en' ? 'Fax' : 'الفاكس '}:{' '}
              {props.faxHQ}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Capital Currency'
                : 'عمله راس المال '}
              : {props.capitalCurrency}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Capital'
                : 'راس المال '}
              : {props.capital}
            </li>
          </ul>
          <ul>
            {' '}
            <h3>Investor Info</h3>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Name'
                : 'اسم المستثمر'}
              :{props.investorName}{' '}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en' ? 'Sex' : 'الجنس '}:
              {props.investorSex}{' '}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Nationality'
                : 'الجنسيه '}
              : {props.investorNationality}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Identification Type'
                : 'نوع اثبات الشخصيه '}
              : {props.investorIdentificationType}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Identification Number'
                : 'رقم اثبات الشخصيه'}
              : {props.investorIdentificationNumber}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Birth Date'
                : 'تاريخ الميلد'}
              : {props.investorBD}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Address'
                : 'عنوان الاقامه'}
              : {props.investorAddress}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Telephone'
                : 'التليفون '}
              : {props.investorTelephone}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en' ? 'Fax' : 'الفاكس'}:{' '}
              {props.investorFax}
            </li>
            <li style={{ listStyleImage: `url()` }}>
              {sessionStorage.getItem('lang') === 'en'
                ? 'Email'
                : 'البريد الالكترونى'}
              :{props.investorEmail}
            </li>
          </ul>
        </Typography>
      </CardContent>
      <CardActions>
        <Button2
          token={props.token}
          compid={props.compid}
          variant="contained"
          size="medium"
          className={classes.button}
          color="primary"
        >
          Claim Task
        </Button2>
      </CardActions>
    </Card>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleCard)
