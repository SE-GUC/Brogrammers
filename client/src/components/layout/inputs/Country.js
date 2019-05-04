import React from 'react'
import PropTypes from 'prop-types'
import deburr from 'lodash/deburr'
import Downshift from 'downshift'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import Chip from '@material-ui/core/Chip'

const suggestions =
[
  { label: 'Afghanistan', 'code': 'AF' },
  { label: 'Albania', 'code': 'AL' },
  { label: 'Algeria', 'code': 'DZ' },
  { label: 'American Samoa', 'code': 'AS' },
  { label: 'Andorra', 'code': 'AD' },
  { label: 'Angola', 'code': 'AO' },
  { label: 'Anguilla', 'code': 'AI' },
  { label: 'Antarctica', 'code': 'AQ' },
  { label: 'Antigua and Barbuda', 'code': 'AG' },
  { label: 'Argentina', 'code': 'AR' },
  { label: 'Armenia', 'code': 'AM' },
  { label: 'Aruba', 'code': 'AW' },
  { label: 'Australia', 'code': 'AU' },
  { label: 'Austria', 'code': 'AT' },
  { label: 'Azerbaijan', 'code': 'AZ' },
  { label: 'Bahamas', 'code': 'BS' },
  { label: 'Bahrain', 'code': 'BH' },
  { label: 'Bangladesh', 'code': 'BD' },
  { label: 'Barbados', 'code': 'BB' },
  { label: 'Belarus', 'code': 'BY' },
  { label: 'Belgium', 'code': 'BE' },
  { label: 'Belize', 'code': 'BZ' },
  { label: 'Benin', 'code': 'BJ' },
  { label: 'Bermuda', 'code': 'BM' },
  { label: 'Bhutan', 'code': 'BT' },
  { label: 'Bolivia', 'code': 'BO' },
  { label: 'Bosnia and Herzegovina', 'code': 'BA' },
  { label: 'Botswana', 'code': 'BW' },
  { label: 'Bouvet Island', 'code': 'BV' },
  { label: 'Brazil', 'code': 'BR' },
  { label: 'British Indian Ocean Territory', 'code': 'IO' },
  { label: 'Brunei Darussalam', 'code': 'BN' },
  { label: 'Bulgaria', 'code': 'BG' },
  { label: 'Burkina Faso', 'code': 'BF' },
  { label: 'Burundi', 'code': 'BI' },
  { label: 'Cambodia', 'code': 'KH' },
  { label: 'Cameroon', 'code': 'CM' },
  { label: 'Canada', 'code': 'CA' },
  { label: 'Cape Verde', 'code': 'CV' },
  { label: 'Cayman Islands', 'code': 'KY' },
  { label: 'Central African Republic', 'code': 'CF' },
  { label: 'Chad', 'code': 'TD' },
  { label: 'Chile', 'code': 'CL' },
  { label: 'China', 'code': 'CN' },
  { label: 'Christmas Island', 'code': 'CX' },
  { label: 'Cocos (Keeling) Islands', 'code': 'CC' },
  { label: 'Colombia', 'code': 'CO' },
  { label: 'Comoros', 'code': 'KM' },
  { label: 'Congo', 'code': 'CG' },
  { label: 'Congo, The Democratic Republic of the', 'code': 'CD' },
  { label: 'Cook Islands', 'code': 'CK' },
  { label: 'Costa Rica', 'code': 'CR' },
  { label: 'Cote D"Ivoire', 'code': 'CI' },
  { label: 'Croatia', 'code': 'HR' },
  { label: 'Cuba', 'code': 'CU' },
  { label: 'Cyprus', 'code': 'CY' },
  { label: 'Czech Republic', 'code': 'CZ' },
  { label: 'Denmark', 'code': 'DK' },
  { label: 'Djibouti', 'code': 'DJ' },
  { label: 'Dominica', 'code': 'DM' },
  { label: 'Dominican Republic', 'code': 'DO' },
  { label: 'Ecuador', 'code': 'EC' },
  { label: 'Egypt', 'code': 'EG' },
  { label: 'El Salvador', 'code': 'SV' },
  { label: 'Equatorial Guinea', 'code': 'GQ' },
  { label: 'Eritrea', 'code': 'ER' },
  { label: 'Estonia', 'code': 'EE' },
  { label: 'Ethiopia', 'code': 'ET' },
  { label: 'Falkland Islands (Malvinas)', 'code': 'FK' },
  { label: 'Faroe Islands', 'code': 'FO' },
  { label: 'Fiji', 'code': 'FJ' },
  { label: 'Finland', 'code': 'FI' },
  { label: 'France', 'code': 'FR' },
  { label: 'French Guiana', 'code': 'GF' },
  { label: 'French Polynesia', 'code': 'PF' },
  { label: 'French Southern Territories', 'code': 'TF' },
  { label: 'Gabon', 'code': 'GA' },
  { label: 'Gambia', 'code': 'GM' },
  { label: 'Georgia', 'code': 'GE' },
  { label: 'Germany', 'code': 'DE' },
  { label: 'Ghana', 'code': 'GH' },
  { label: 'Gibraltar', 'code': 'GI' },
  { label: 'Greece', 'code': 'GR' },
  { label: 'Greenland', 'code': 'GL' },
  { label: 'Grenada', 'code': 'GD' },
  { label: 'Guadeloupe', 'code': 'GP' },
  { label: 'Guam', 'code': 'GU' },
  { label: 'Guatemala', 'code': 'GT' },
  { label: 'Guernsey', 'code': 'GG' },
  { label: 'Guinea', 'code': 'GN' },
  { label: 'Guinea-Bissau', 'code': 'GW' },
  { label: 'Guyana', 'code': 'GY' },
  { label: 'Haiti', 'code': 'HT' },
  { label: 'Heard Island and Mcdonald Islands', 'code': 'HM' },
  { label: 'Holy See (Vatican City State)', 'code': 'VA' },
  { label: 'Honduras', 'code': 'HN' },
  { label: 'Hong Kong', 'code': 'HK' },
  { label: 'Hungary', 'code': 'HU' },
  { label: 'Iceland', 'code': 'IS' },
  { label: 'India', 'code': 'IN' },
  { label: 'Indonesia', 'code': 'ID' },
  { label: 'Iran, Islamic Republic Of', 'code': 'IR' },
  { label: 'Iraq', 'code': 'IQ' },
  { label: 'Ireland', 'code': 'IE' },
  { label: 'Isle of Man', 'code': 'IM' },
  { label: 'Israel', 'code': 'IL' },
  { label: 'Italy', 'code': 'IT' },
  { label: 'Jamaica', 'code': 'JM' },
  { label: 'Japan', 'code': 'JP' },
  { label: 'Jersey', 'code': 'JE' },
  { label: 'Jordan', 'code': 'JO' },
  { label: 'Kazakhstan', 'code': 'KZ' },
  { label: 'Kenya', 'code': 'KE' },
  { label: 'Kiribati', 'code': 'KI' },
  { label: 'Korea, Democratic People"S Republic of', 'code': 'KP' },
  { label: 'Korea, Republic of', 'code': 'KR' },
  { label: 'Kuwait', 'code': 'KW' },
  { label: 'Kyrgyzstan', 'code': 'KG' },
  { label: 'Lao People"S Democratic Republic', 'code': 'LA' },
  { label: 'Latvia', 'code': 'LV' },
  { label: 'Lebanon', 'code': 'LB' },
  { label: 'Lesotho', 'code': 'LS' },
  { label: 'Liberia', 'code': 'LR' },
  { label: 'Libyan Arab Jamahiriya', 'code': 'LY' },
  { label: 'Liechtenstein', 'code': 'LI' },
  { label: 'Lithuania', 'code': 'LT' },
  { label: 'Luxembourg', 'code': 'LU' },
  { label: 'Macao', 'code': 'MO' },
  { label: 'Macedonia, The Former Yugoslav Republic of', 'code': 'MK' },
  { label: 'Madagascar', 'code': 'MG' },
  { label: 'Malawi', 'code': 'MW' },
  { label: 'Malaysia', 'code': 'MY' },
  { label: 'Maldives', 'code': 'MV' },
  { label: 'Mali', 'code': 'ML' },
  { label: 'Malta', 'code': 'MT' },
  { label: 'Marshall Islands', 'code': 'MH' },
  { label: 'Martinique', 'code': 'MQ' },
  { label: 'Mauritania', 'code': 'MR' },
  { label: 'Mauritius', 'code': 'MU' },
  { label: 'Mayotte', 'code': 'YT' },
  { label: 'Mexico', 'code': 'MX' },
  { label: 'Micronesia, Federated States of', 'code': 'FM' },
  { label: 'Moldova, Republic of', 'code': 'MD' },
  { label: 'Monaco', 'code': 'MC' },
  { label: 'Mongolia', 'code': 'MN' },
  { label: 'Montenegro', 'code': 'ME' },
  { label: 'Montserrat', 'code': 'MS' },
  { label: 'Morocco', 'code': 'MA' },
  { label: 'Mozambique', 'code': 'MZ' },
  { label: 'Myanmar', 'code': 'MM' },
  { label: 'Namibia', 'code': 'NA' },
  { label: 'Nauru', 'code': 'NR' },
  { label: 'Nepal', 'code': 'NP' },
  { label: 'Netherlands', 'code': 'NL' },
  { label: 'Netherlands Antilles', 'code': 'AN' },
  { label: 'New Caledonia', 'code': 'NC' },
  { label: 'New Zealand', 'code': 'NZ' },
  { label: 'Nicaragua', 'code': 'NI' },
  { label: 'Niger', 'code': 'NE' },
  { label: 'Nigeria', 'code': 'NG' },
  { label: 'Niue', 'code': 'NU' },
  { label: 'Norfolk Island', 'code': 'NF' },
  { label: 'Northern Mariana Islands', 'code': 'MP' },
  { label: 'Norway', 'code': 'NO' },
  { label: 'Oman', 'code': 'OM' },
  { label: 'Pakistan', 'code': 'PK' },
  { label: 'Palau', 'code': 'PW' },
  { label: 'Palestinian Territory', 'code': 'PS' },
  { label: 'Panama', 'code': 'PA' },
  { label: 'Papua New Guinea', 'code': 'PG' },
  { label: 'Paraguay', 'code': 'PY' },
  { label: 'Peru', 'code': 'PE' },
  { label: 'Philippines', 'code': 'PH' },
  { label: 'Pitcairn', 'code': 'PN' },
  { label: 'Poland', 'code': 'PL' },
  { label: 'Portugal', 'code': 'PT' },
  { label: 'Puerto Rico', 'code': 'PR' },
  { label: 'Qatar', 'code': 'QA' },
  { label: 'Reunion', 'code': 'RE' },
  { label: 'Romania', 'code': 'RO' },
  { label: 'Russian Federation', 'code': 'RU' },
  { label: 'RWANDA', 'code': 'RW' },
  { label: 'Saint Helena', 'code': 'SH' },
  { label: 'Saint Kitts and Nevis', 'code': 'KN' },
  { label: 'Saint Lucia', 'code': 'LC' },
  { label: 'Saint Pierre and Miquelon', 'code': 'PM' },
  { label: 'Saint Vincent and the Grenadines', 'code': 'VC' },
  { label: 'Samoa', 'code': 'WS' },
  { label: 'San Marino', 'code': 'SM' },
  { label: 'Sao Tome and Principe', 'code': 'ST' },
  { label: 'Saudi Arabia', 'code': 'SA' },
  { label: 'Senegal', 'code': 'SN' },
  { label: 'Serbia', 'code': 'RS' },
  { label: 'Seychelles', 'code': 'SC' },
  { label: 'Sierra Leone', 'code': 'SL' },
  { label: 'Singapore', 'code': 'SG' },
  { label: 'Slovakia', 'code': 'SK' },
  { label: 'Slovenia', 'code': 'SI' },
  { label: 'Solomon Islands', 'code': 'SB' },
  { label: 'Somalia', 'code': 'SO' },
  { label: 'South Africa', 'code': 'ZA' },
  { label: 'South Georgia and the South Sandwich Islands', 'code': 'GS' },
  { label: 'Spain', 'code': 'ES' },
  { label: 'Sri Lanka', 'code': 'LK' },
  { label: 'Sudan', 'code': 'SD' },
  { label: 'Suriname', 'code': 'SR' },
  { label: 'Svalbard and Jan Mayen', 'code': 'SJ' },
  { label: 'Swaziland', 'code': 'SZ' },
  { label: 'Sweden', 'code': 'SE' },
  { label: 'Switzerland', 'code': 'CH' },
  { label: 'Syrian Arab Republic', 'code': 'SY' },
  { label: 'Taiwan, Province of China', 'code': 'TW' },
  { label: 'Tajikistan', 'code': 'TJ' },
  { label: 'Tanzania, United Republic of', 'code': 'TZ' },
  { label: 'Thailand', 'code': 'TH' },
  { label: 'Timor-Leste', 'code': 'TL' },
  { label: 'Togo', 'code': 'TG' },
  { label: 'Tokelau', 'code': 'TK' },
  { label: 'Tonga', 'code': 'TO' },
  { label: 'Trinidad and Tobago', 'code': 'TT' },
  { label: 'Tunisia', 'code': 'TN' },
  { label: 'Turkey', 'code': 'TR' },
  { label: 'Turkmenistan', 'code': 'TM' },
  { label: 'Turks and Caicos Islands', 'code': 'TC' },
  { label: 'Tuvalu', 'code': 'TV' },
  { label: 'Uganda', 'code': 'UG' },
  { label: 'Ukraine', 'code': 'UA' },
  { label: 'United Arab Emirates', 'code': 'AE' },
  { label: 'United Kingdom', 'code': 'GB' },
  { label: 'United States', 'code': 'US' },
  { label: 'United States Minor Outlying Islands', 'code': 'UM' },
  { label: 'Uruguay', 'code': 'UY' },
  { label: 'Uzbekistan', 'code': 'UZ' },
  { label: 'Vanuatu', 'code': 'VU' },
  { label: 'Venezuela', 'code': 'VE' },
  { label: 'Viet Nam', 'code': 'VN' },
  { label: 'Virgin Islands, British', 'code': 'VG' },
  { label: 'Virgin Islands, U.S.', 'code': 'VI' },
  { label: 'Wallis and Futuna', 'code': 'WF' },
  { label: 'Western Sahara', 'code': 'EH' },
  { label: 'Yemen', 'code': 'YE' },
  { label: 'Zambia', 'code': 'ZM' },
  { label: 'Zimbabwe', 'code': 'ZW' }
]

function renderInput ({ ref, props, classes, InputProps, placeholder }) {
  return (
    <TextField
      variant='outlined'
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      id='outlined-required'
      margin='normal'
      width='400'
      required
      name='country'
      onChange={() => props.callBack}
      value='a'
    />
  )
}

function renderSuggestion ({ suggestion, index, itemProps, highlightedIndex, selectedItem, props }) {
  const isHighlighted = highlightedIndex === index
  const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1
  props.callBack(selectedItem)
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400,
        width: 400
      }}
    >
      {suggestion.label}
    </MenuItem>
  )
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
  width: 400
}

function getSuggestions (value) {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue

      if (keep) {
        count += 1
      }

      return keep
    })
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250
  },
  container: {
    flexGrow: 1,
    position: 'relative',
    flexWrap: 'wrap'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  inputRoot: {
    flexWrap: 'wrap'
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1
  },
  divider: {
    height: theme.spacing.unit * 2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400
  }
})

let popperNode

function Country (props) {
  const { classes } = props

  return (
    <div className={classes.root}>
      <Downshift id='downshift-simple'>
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem
        }) => (
          <div className={classes.container}>
            {renderInput({
              props,
              classes,
              InputProps: getInputProps({
                placeholder: sessionStorage.getItem('lang') === 'en' ? 'country of origin*' : 'بلد المنشأ'
              })
            })}
            <div {...getMenuProps()}>
              {isOpen ? (

                <Paper className={classes.paper} square>
                  {
                    getSuggestions(inputValue).map((suggestion, index) =>
                      renderSuggestion({
                        suggestion,
                        index,
                        itemProps: getItemProps({ item: suggestion.label }),
                        highlightedIndex,
                        selectedItem,
                        props
                      })
                    )}
                </Paper>
              ) : null}
            </div>
          </div>
        )}
      </Downshift>

    </div>
  )
}

Country.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Country)
