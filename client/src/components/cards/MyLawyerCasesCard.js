import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import LawyerApproveDisapprove from '../buttons/LawyerApproveDisapprove'
import MultiLine from '../layout/inputs/MultiLine'

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

class MyLawyerCasesCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: null
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    let value = e.target.value
    this.setState(
      {
        comment: value
      },

      () => console.log(value)
    )
  }

  render() {
    const { classes } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {sessionStorage.getItem('lang') === 'en'
              ? 'Status'
              : 'حالة الشركه '}
            : {this.props.status}
          </Typography>
          <Typography variant="h5" component="h2">
            {this.props.nameInEnglish}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {this.props.addressHQ}
          </Typography>
          <Typography component="p">
            <ul>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'رقم تعريف الشركه'
                  : 'Company ID'}
                : {this.props.compid}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'عنوان الشركه '
                  : 'Address HQ'}
                : {this.props.addressHQ}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'القانون المنظم'
                  : 'Regulation Law'}
                : {this.props.regulationLaw}{' '}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'شكل الشركه القانونى'
                  : 'Legal Company Form'}
                : {this.props.legalCompanyForm}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'اسم الشركه'
                  : 'Name In Arabic'}
                : {this.props.nameInArabic}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'المركز الرئيسى '
                  : 'Governerate HQ'}
                :{this.props.governerateHQ}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'المركز الرئيسى إلى المدينة '
                  : 'City HQ'}
                : {this.props.cityHQ}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'التليفون '
                  : 'Telephone'}
                : {this.props.telephoneHQ}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar' ? 'الفاكس ' : 'Fax'}:{' '}
                {this.props.faxHQ}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'عمله راس المال '
                  : 'Capital Currency'}
                : {this.props.capitalCurrency}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'راس المال '
                  : 'Capital'}
                : {this.props.capital}
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
                :{this.props.investorName}{' '}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar' ? 'الجنس ' : 'Sex'}:
                {this.props.investorSex}{' '}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'الجنسيه '
                  : 'Nationality'}
                : {this.props.investorNationality}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'نوع اثبات الشخصيه '
                  : 'Identification Type'}
                : {this.props.investorIdentificationType}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'رقم اثبات الشخصيه'
                  : 'Identification Number'}
                : {this.props.investorIdentificationNumber}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'تاريخ الميلد'
                  : 'Birth Date'}
                : {this.props.investorBD}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'عنوان الاقامه'
                  : 'Address'}
                : {this.props.investorAddress}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'التليفون '
                  : 'Telephone'}
                : {this.props.investorTelephone}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar' ? 'الفاكس' : 'Fax'}:{' '}
                {this.props.investorFax}
              </li>
              <li>
                {sessionStorage.getItem('lang') === 'ar'
                  ? 'البريد الالكترونى'
                  : 'Email'}
                :{this.props.investorEmail}
              </li>
            </ul>
            <br />
            <MultiLine callBack={this.onChange} />
          </Typography>
        </CardContent>
        <CardActions>
          <LawyerApproveDisapprove
            token={this.props.token}
            compid={this.props.compid}
            comment={this.state.comment}
          />
        </CardActions>
      </Card>
    )
  }
}

MyLawyerCasesCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyLawyerCasesCard)
