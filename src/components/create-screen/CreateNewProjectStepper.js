import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import GetPathButtonNewProject from "./GetPathButtonNewProject";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {UserDispatch} from "../../context/userContext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";


let RED = '#ef223c';

let project_name = "";

let project_path = "";

let project_id = '';

let hosting_options = {
    public_dir: '',
    single_page_app: null,
};

let database_options = {
    rules: '',
};

let functions_options = {
    lint: null,
    npm: null,
};


const useStyles = makeStyles((theme) => ({
    stepper: {
        width: '99%',
        // backgroundColor: RED,     //TODO swap in the primary color for theme here
        backgroundColor: 'white',
        paddingBottom: '2%'
    },
    select: {
        minWidth: 200,
        background: 'white',
        color: theme.primary,
        fontWeight:200,
        borderStyle:'none',
        borderWidth: 2,
        borderRadius: 12,
        paddingLeft: 24,
        paddingTop: 14,
        paddingBottom: 15,
        boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
        "&:focus":{
            borderRadius: 12,
            background: 'white',
            borderColor: theme.primary
        },
    },
    text: {
        color: '#fff',
        fontWeight:200,
    },
    paper: {
        borderRadius: 12,
        marginTop: 8,
    },
    list: {
        paddingTop:0,
        paddingBottom:0,
        background:'white',
        "& li":{
            fontWeight:200,
            paddingTop:12,
            paddingBottom:12,
        },
        "& li:hover":{
            color: 'white',
            background: 'primary'
        },
        "& li.Mui-selected":{
            color:'white',
            background: 'primary'
        },
        "& li.Mui-selected:hover":{
            color: 'white',
            background: 'primary'
        }
    },
    Menu_icon:{
        color: theme.primary,
        right: 12,
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none'
    },
    textfield: {
        height: 48,
        background: 'white',
        color: theme.primary,
        fontWeight:200,
        borderStyle:'none',
        borderRadius: 12,
        paddingLeft: 24,
        paddingTop: 14,
        paddingBottom: 13,
        boxShadow: '0 16px 40px -12.125px rgba(0,0,0,0.3)',
    },
    stepContent: {
        padding: '3%',
        backgroundColor: RED, //TODO swap in the primary color for theme here
    },
    pgTitle: {
        paddingLeft: '3%',
        paddingTop: '3%',
        backgroundColor: 'white',  //TODO swap in the primary color for theme here
        fontWeight:200,
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    wave: {
        position: 'relative',
        display: 'block',
        width: 'calc(100% + 1.3px)',
        height: '150px',
        marginBottom: '-12vh',
    }
}));


let id_hex = () => {
    var letters = '0123456789abcdef';
    var hex_val = '';
    for (var i = 0; i < 5; i++) {
        hex_val += letters[Math.floor(Math.random() * 16)];
    }
    return hex_val;
};


export default function HorizontalLabelPositionBelowStepper() {
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = UserDispatch();

    // current active step in the stepper
    const [activeStep, setActiveStep] = React.useState(0);

    // selection for EsLint on functions setup
    const [selectLint, setLint] = useState('');

    // selection for running 'npm install' on functions setup
    const [selectNpm, setNpm] = useState('');

    // single page app state value on hosting setup
    const [selectSinglePg, setSinglePg] = useState('');

    // the configuration of features the user wishes to add on the project
    const [config, setConfig] = React.useState({
        hosting: false,
        database: false,
        functions: false,
    });

    // the current steps throughout the project initialization process
    const [currentSteps, setCurrentSteps] = React.useState(["Select Project Features: "]);

    /**
     * Check the fields of the corresponding steps to ensure that the user has provide valid input, and prevent
     * them from moving forward if valid input has not been provided.
     * @param: step: String - the step that the user is on, this will determine the attributes to which
     * the movement through the stepper is allowed.
     **/
    function btnDisabled(step) {
        // if we are on the first step and

        // switch(step) {
        //     case "Select Project Features":
        //         if (project_name === "" || project_path === "" || project_id === "") {
        //             return true;
        //         }
        // }
        return false
    }

    /**
     * Handle forward movement through the stepper
     **/
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    /**
     * Handle backward movement through the stepper
     **/
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    /**
     * Handle object modifications to the config state variable
     * @param: feature: String -> the feature that the users wishes to add to the project
     **/
    const handleConfig = (feature) => {
        if (feature === 'hosting') {
            setConfig(prevState => ({
                ...prevState,
                hosting: !config.hosting}));
        }
        if (feature === 'database') {
            setConfig(prevState => ({
                ...prevState,
                database: !config.database}));
        }

        if (feature === 'functions') {
            setConfig(prevState => ({
                ...prevState,
                functions: !config.functions}));
        }
    };

    /**
     * Handle based on the features that the user selected, add those steps to the stepper for project setup
     **/
    const addFurtherSteps = () => {
        // start by getting all the features selected
        let featuresToBeAdded = Object.keys(config)
            .filter(function(k){return config[k]})
            .map(String);

        setCurrentSteps((prevState => prevState.concat(featuresToBeAdded)))
    };

    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        getContentAnchorEl: null
    };

    const linearProgressProps = {
        color: 'primary', // i can set the color to either primary or secondary here
    };


    const iconProps = () => {
        return (
            <ExpandMoreIcon className={classes.Menu_icon}/>
        )};

    /**
     * Get the appropriate content for each step
     * @param: step: String -> the current step (e.g. "hosting")
     **/
    function getStepContent(step) {
        switch(step) {
            case 'hosting':
                return(
                    <div>
                        <div>
                            <Typography color="textSecondary" variant="body1" className={classes.text}>
                                What do you want to use as your public directory?
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <div style={{width: '65%', maxWidth: 248}}>
                                {/* Will edit the public attribute within the "hosting"*/}
                                <Paper component={'form'} className={classes.paper} elevation={0}>
                                    <InputBase
                                        fullWidth
                                        className={classes.textfield}
                                        placeholder="(public)"
                                        color={'secondary'}
                                        onChange={(e) => {hosting_options.public_dir = e.target.value}}
                                    />
                                </Paper>
                            </div>
                            <div style={{marginTop: '2%'}}/>
                        </div>
                        <div>
                            <Typography color="textSecondary" variant="body1" className={classes.text}>
                                Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <FormControl>
                                <Select
                                    disableUnderline
                                    classes={{root: classes.select}}
                                    value={selectSinglePg}
                                    onChange={(e) => {setSinglePg(e.target.value); hosting_options.single_page_app = e.target.value}}
                                    MenuProps={menuProps}
                                    IconComponent={iconProps}
                                >
                                    <MenuItem value={''}/>
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                );
            case 'database':
                return(
                    <div>
                        <Typography color="textSecondary" variant="body1" className={classes.text}>
                            What file should be used for Database Rules?
                        </Typography>
                        <div style={{marginTop: '2%'}}/>
                        <div style={{width: '65%'}}>
                            <Paper component={'form'} className={classes.paper} elevation={0}>
                                <InputBase
                                    fullWidth
                                    className={classes.textfield}
                                    placeholder="(database.rules.json)"
                                    color={'secondary'}
                                    onChange={(e) => {database_options.rules = e.target.value}}
                                />
                            </Paper>
                        </div>
                    </div>
                );
            case 'functions' :
                return(
                    <div>
                        <div>
                            <Typography color="textSecondary" variant="body1" className={classes.text}>
                                Do you want to setup ESlint? (y/N)
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <FormControl>
                                <Select
                                    value={selectLint}
                                    onChange={(e) => {setLint(e.target.value); functions_options.lint = e.target.value}}
                                    disableUnderline
                                    MenuProps={menuProps}
                                    IconComponent={iconProps}
                                    classes={{root: classes.select}}
                                >
                                    <MenuItem value={""}/>
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{marginTop: '2%'}}/>
                        <div>
                            <Typography color="textSecondary" variant="body1" className={classes.text}>
                                Do you want to run 'npm install'? (y/N)
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <FormControl>
                                <Select
                                    value={selectNpm}
                                    disableUnderline
                                    MenuProps={menuProps}
                                    IconComponent={iconProps}
                                    classes={{root: classes.select}}
                                    onChange={(e) => {setNpm(e.target.value); functions_options.npm = e.target.value}}
                                >
                                    <MenuItem value={''}/>
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                );
            default:
                return(
                    <div>
                        Unexpected Case
                    </div>
                );
        }
    }

    return (
        <div>
            <Typography variant={'h6'} className={classes.pgTitle}>Create a new FireLounge project</Typography>
            <MobileStepper
                variant="progress"
                steps={currentSteps.length}
                LinearProgressProps={linearProgressProps}
                position="static"
                activeStep={activeStep}
                className={classes.stepper}
                nextButton={
                    <Button size="small" onClick={()=>{
                        // if we are submitting ....
                        {/*TODO add a circular progress after the submit button is clicked and the project is being created*/}
                        if ((activeStep === currentSteps.length - 1) && (activeStep !== 0)) {
                            const createCloudProj = require('../../scripts/createProject/CreateCloudProject');
                            const cloudProjArg = [project_name, project_path, project_id];
                            console.log(cloudProjArg);
                            createCloudProj.createCloudProject_function(cloudProjArg).then((value) => {
                                if (value === 'SUCCESS') {
                                    const fbJsonObj = {
                                        proj_name: project_name,
                                        proj_path: project_path,
                                        proj_id: project_id,
                                        hosting: {
                                            public_dir: hosting_options.public_dir,
                                            single_page_app: hosting_options.single_page_app,
                                        },
                                        database: {
                                            rules: database_options.rules,
                                        },
                                        functions: {
                                            npm: functions_options.npm,
                                            lint: functions_options.lint,
                                        },
                                        config: {
                                            hosting: config.hosting,
                                            database: config.database,
                                            storage: config.storage,
                                            functions: config.functions,
                                        }
                                    };

                                    const initFirebase = require('../../scripts/createProject/initFirebasejson');
                                    initFirebase.initFireBasejson_function(fbJsonObj);

                                    setTimeout(function(){dispatch({type: 'addProj',
                                        args:{name:project_name, path: project_path, id:project_id}}) }, 3000);

                                    handleNext();
                                }

                            }).catch((err) => {
                                console.log(err)
                            });
                        } else {
                            if (activeStep === 0) {
                                addFurtherSteps();
                            }
                            handleNext();
                        }
                    }} disabled={activeStep === currentSteps.length || btnDisabled(currentSteps[activeStep])}>
                        {((activeStep === currentSteps.length - 1) || (activeStep === currentSteps.length)) && (activeStep !== 0) ? 'Submit':'Next'}
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0 || activeStep === currentSteps.length}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
            <div>
                <div className={classes.wave}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                         preserveAspectRatio="none">
                        <path
                            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                            opacity=".25" fill={'#fff'}/>
                        <path
                            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                            opacity=".5" fill={'#fff'}/>
                        <path
                            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                            fill={'#fff'}/>
                    </svg>
                </div>
                {activeStep === 0 ? (
                    <div className={classes.stepContent}>
                        <div>
                            <Typography className={classes.text}>{'Enter Project Details: '}</Typography>
                        </div>
                        {/*
                        Here we will prompt the user to add the features that they desire
                        based on those features, we will add the necessary steps for project creation
                        */}
                        <div style={{width: '65%'}}>
                            <Paper component={'form'} className={classes.paper} elevation={0}>
                                <InputBase
                                    fullWidth
                                    className={classes.textfield}
                                    placeholder="Enter your project name"
                                    color={'secondary'}
                                    onChange={(e) => {project_name = e.target.value; project_id = e.target.value.replace(/\s+/g, '-').toLowerCase() + "-" + id_hex();}}
                                />
                            </Paper>
                        </div>
                        <div style={{marginTop: '2%'}}/>
                        <GetPathButtonNewProject path={(path) => {project_path = path}}/>
                        <div style={{marginTop: '2%'}}/>
                        <div>
                            <Typography className={classes.text}>{currentSteps[activeStep]}</Typography>
                        </div>
                        <div>
                            <FormControlLabel
                                className={classes.text}
                                control={<Checkbox style={{color: '#fff'}} checked={config.hosting}/>}
                                onClick={(event) => {event.stopPropagation(); handleConfig('hosting')}}
                                onFocus={(event) => event.stopPropagation()}
                                label={<Typography className={classes.text}>Hosting</Typography>}
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                className={classes.text}
                                control={<Checkbox style={{color: '#fff'}} checked={config.database}/>}
                                onClick={(event) => {event.stopPropagation(); handleConfig('database')}}
                                onFocus={(event) => event.stopPropagation()}
                                label={<Typography className={classes.text}>Database</Typography>}
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                className={classes.text}
                                control={<Checkbox style={{color: '#fff',}} checked={config.functions}/>}
                                onClick={(event) => {event.stopPropagation(); handleConfig('functions')}}
                                onFocus={(event) => event.stopPropagation()}
                                label={<Typography className={classes.text}>Functions</Typography>}
                            />
                        </div>
                    </div>
                ) : (
                    <div>
                        {activeStep === currentSteps.length ? (
                            <div className={classes.stepContent}>
                                {/* Once the project has been created user will arrive at the submission confirmed screen*/}
                                Submission confirm
                            </div>
                        ): (
                            <div className={classes.stepContent}>
                                {getStepContent(currentSteps[activeStep])}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
