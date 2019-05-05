import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MoreIcon from '@material-ui/icons/MoreVert'
import Tab from '@material-ui/core/Tab'
import SvgIcon from '@material-ui/core/SvgIcon'

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  )
}

const styles = theme => ({
  appBar: {
    height: theme.spacing.unit * 8,
    '-moz-transition': 'height .4s linear',
    '-webkit-transition': 'height .4s linear',
    transition: 'height .4s linear',
    '&:hover': {
      height: theme.spacing.unit * 16
    }
  },
  root: {
    width: '100%',
    top: 0,
    position: 'fixed',
    zIndex: 12
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    // pointerEvents: "none",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
})

class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      auth: false,
      searchText: '',
      mob: false
    }
  }
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
    //   this.props.callBack(null, false,"", null)
    this.setState({ mobileMoreAnchorEl: null, auth: this.props.auth })
  }
  hadnleOpenDrawer = () => {
    this.setState({ mob: !this.state.mob })
    localStorage.setItem('openDrawer', this.state.mob)
    console.log(localStorage.getItem('openDrawer'))
  }
  handleSignOut = () => {
    sessionStorage.setItem('auth', false)
    sessionStorage.setItem('jwtToken', null)
    sessionStorage.setItem('type', null)
    console.log(sessionStorage.getItem('jwtToken') + '  heeere')
    this.state.auth = false
    this.forceUpdate()
    this.handleMenuClose()
    document.location.href = '/'
  }

  handleProfile = () => {
    document.location.href = '/profile'
  }

  handleSignUp = () => {
    document.location.href = '/register'
  }

  handleSignIn = () => {
    document.location.href = '/signin'
  }

  handleHome = () => {
    document.location.href = '/'
  }
  handleInput = e => {
    this.setState({ searchText: e.target.value })
  }
  handleSearch = () => {
    if (Boolean(this.state.searchText)) {
      document.location.href = `/searchCases/${this.state.searchText}`
    }
  }

  enterPressed(event) {
    var code = event.keyCode || event.which
    if (code === 13) {
      //the value of enterkey is 13
      this.handleSearch()
    }
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state
    const { classes } = this.props
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    var renderMenu = ''
    var renderMobileMenu = ''
    if (sessionStorage.getItem('jwtToken') != null) {
      renderMenu = (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
          <MenuItem onClick={this.handleSignOut}>Sign out </MenuItem>
        </Menu>
      )

      renderMobileMenu = (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={isMobileMenuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.handleProfileMenuOpen}>
            <IconButton color="inherit">
              <AccountCircle />
            </IconButton>
            <p>Profile</p>
          </MenuItem>
        </Menu>
      )
    } else {
      renderMenu = ''
      renderMobileMenu = ''
    }
    console.log(sessionStorage.getItem('type') + 'you see')
    const hidei =
      sessionStorage.getItem('type') === 'i' ||
      sessionStorage.getItem('type') === 'r' ||
      sessionStorage.getItem('type') === 'a' ||
      sessionStorage.getItem('type') === 'l'
        ? {}
        : { display: 'none' }

    const hiden =
      sessionStorage.getItem('type') === 'i' ||
      sessionStorage.getItem('type') === 'r' ||
      sessionStorage.getItem('type') === 'a' ||
      sessionStorage.getItem('type') === 'l'
        ? { display: 'none' }
        : {}
    return (
      <div className={classes.root}>
        <AppBar style={{ backgroundColor: '#034066' }} className={classes.root}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >
              GAFI
            </Typography>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <IconButton color="inherit" onClick={this.handleSearch}>
                  <SearchIcon />
                </IconButton>
              </div>
              <InputBase
                placeholder={sessionStorage.getItem('lang') === 'en' ?"Search…":"...ابحث"}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onChange={this.handleInput}
                onKeyPress={this.enterPressed.bind(this)}
              />
            </div>

            <Tab label={sessionStorage.getItem('lang') === 'en' ?"Sign in":"تسجيل الدخول"} onClick={this.handleSignIn} style={hiden} />
            <Tab label={sessionStorage.getItem('lang') === 'en' ?"Sign up":"تسجيل"} onClick={this.handleSignUp} style={hiden} />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop} style={hidei}>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>

            <HomeIcon
              onClick={this.handleHome}
              className={classes.icon}
              color="primary"
              fontSize="large"
              component={svgProps => (
                <svg {...svgProps}>
                  <defs>
                    <linearGradient id="gradient1">
                      <stop offset="30%" stopColor={'#ffffff'} />
                      <stop offset="70%" stopColor={'#ffffff'} />
                    </linearGradient>
                  </defs>
                  {React.cloneElement(svgProps.children[0], {
                    fill: 'url(#gradient1)'
                  })}
                </svg>
              )}
            />
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    )
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PrimarySearchAppBar)
