import React, { Component } from 'react';
import AlertDialogSlide from '../layout/Dialogs/SlideDialog';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import { Avatar } from '@material-ui/core';
import AssignmemtIcon from '@material-ui/icons/Assignment';
import Grid from '@material-ui/core/Grid';
import Required from '../layout/inputs/Required';
import NotRequired from '../layout/inputs/NotRequired';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 7}px ${theme.spacing.unit * 4}px ${theme.spacing.unit * 4}px`,
    },
    greenAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: green[500],
    },
});

class InvestorCompanyReg extends React.Component {
    constructor(props) {
        super(props);
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
                managers: []
            },
        }
        //this.handleClick = this.handleClick.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleCreate(event) {
        event.preventDefault();

    }

    handleInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.value)
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper} elevation={16} >
                    <Grid container spacing={0} justify="space-evenly">
                        <Grid container direction="column" alignItems="center">
                            <Avatar className={classes.greenAvatar}>
                                <AssignmemtIcon />
                            </Avatar>
                        </Grid>
                        <Grid container direction="column" alignItems="center">
                            <Typography variant="h6" component="h3">
                                Fill in your Company Form!
                    </Typography>
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Legal Company Form'} type={'text'} value={this.state.legalCompanyForm} callBack={this.handleInput} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Name In Arabic'} type={'text'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <NotRequired field={'Name In English'} type={'text'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Governemt HQ'} type={'text'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'City HQ'} type={'text'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Address HQ'} type={'text'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Telephone HQ'} type={'text'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Fax HQ'} type={'text'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Capital Currency'} type={'text'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Capital'} type={'number'} />
                        </Grid>
                        <Grid container direction="column" alignItems="center" >
                            <Required field={'Manager'} type={'text'} />
                        </Grid>
                        <Grid>
                            <br />
                        </Grid>
                        <Grid container direction="column" alignItems="flex-end" >
                            <AlertDialogSlide />
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
}
export default withStyles(styles)(InvestorCompanyReg);