import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
          {sessionStorage.getItem('lang') === 'en' ? 'status ' : 'الحاله'}:{' '}
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
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'رقم تعريف الشركه'
                : 'Company ID'}
              : {props.compid}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'عنوان الشركه '
                : 'Address HQ'}
              : {props.addressHQ}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'القانون المنظم'
                : 'Regulation Law'}
              : {props.regulationLaw}{' '}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'شكل الشركه القانونى'
                : 'Legal Company Form'}
              : {props.legalCompanyForm}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'اسم الشركه'
                : 'Name In Arabic'}
              : {props.nameInArabic}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'المركز الرئيسى '
                : 'Governerate HQ'}
              :{props.governerateHQ}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'المركز الرئيسى إلى المدينة '
                : 'City HQ'}
              : {props.cityHQ}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'التليفون '
                : 'Telephone'}
              : {props.telephoneHQ}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar' ? 'الفاكس ' : 'Fax'}:{' '}
              {props.faxHQ}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'عمله راس المال '
                : 'Capital Currency'}
              : {props.capitalCurrency}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'راس المال '
                : 'Capital'}
              : {props.capital}
            </li>
          </ul>
          <ul>
            {' '}
            <h3>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'بيانات المستثمر'
                : 'Investor Information'}
            </h3>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'اسم المستثمر'
                : 'Name'}
              :{props.investorName}{' '}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar' ? 'الجنس ' : 'Sex'}:
              {props.investorSex}{' '}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'الجنسيه '
                : 'Nationality'}
              : {props.investorNationality}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'نوع اثبات الشخصيه '
                : 'Identification Type'}
              : {props.investorIdentificationType}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'رقم اثبات الشخصيه'
                : 'Identification Number'}
              : {props.investorIdentificationNumber}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'تاريخ الميلد'
                : 'Birth Date'}
              : {props.investorBD}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'عنوان الاقامه'
                : 'Address'}
              : {props.investorAddress}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'التليفون '
                : 'Telephone'}
              : {props.investorTelephone}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar' ? 'الفاكس' : 'Fax'}:{' '}
              {props.investorFax}
            </li>
            <li>
              {sessionStorage.getItem('lang') === 'ar'
                ? 'البريد الالكترونى'
                : 'Email'}
              :{props.investorEmail}
            </li>
          </ul>
          <br />
        </Typography>
      </CardContent>
      <CardActions />
    </Card>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleCard)
