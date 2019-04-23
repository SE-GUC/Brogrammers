import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import CaseCard from '../cards/RequestsCards'
import Zoom from '@material-ui/core/Zoom'
import Grow from '@material-ui/core/Grow'
const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: 'rgba(200,200,200,0.4)'
  },
  gridList: {
    width: '80%',
    height: 'auto',
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit
  }
})

class TitlebarGridList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <GridList cellHeight={250} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }} />
          {this.props.data.map((tile, i) => (
            <Grow in="true">
              <GridListTile style={{ width: 300 }}>
                <CaseCard
                  title={tile.nameInEnglish}
                  comment={tile.lawyerComment}
                  lawyer={tile.lawyer}
                  key={i}
                  id={tile._id}
                  token={sessionStorage.getItem("jwtToken")}
                  subheader={tile.status}
                  nameAr={tile.nameInArabic}
                  data={tile}
                />
              </GridListTile>
            </Grow>
          ))}
        </GridList>
      </div>
    )
  }
}

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TitlebarGridList)
