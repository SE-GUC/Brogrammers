import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import CaseCard from '../cards/RequestsCards';


const styles = theme => ({
  root: {
  
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    
  },
  gridList: {
   maxWidth:300
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});



class TitlebarGridList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
    }
}
    render() { 
        return (
            <div className={styles.root}>
              <GridList cellHeight={200} className={styles.gridList}>
                <GridListTile key="Subheader" cols={2} style={{ height: '50px' }}>
               
                </GridListTile>
                {this.props.data.map((tile,i) => (
                  <GridListTile style={{maxWidth:350}}>
                   <CaseCard title={tile.nameInEnglish} key={i} id={tile._id} token= {this.props.token} subheader={tile.status} nameAr={tile.nameInArabic} data={tile} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          );
        }
}  

TitlebarGridList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);
