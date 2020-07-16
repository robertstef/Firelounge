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
    root: {
        width: '99%',
        backgroundColor: 'transparent',
    },
    stepContent: {
        padding: '3%',
    },
    pgTitle: {
        paddingLeft: '2%',
        paddingTop: '2%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
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
    const [currentSteps, setCurrentSteps] = React.useState(["Select Project Features"]);

    /**
     * Check the fields of the corresponding steps to ensure that the user has provide valid input, and prevent
     * them from moving forward if valid input has not been provided.
     * @param: step: String - the step that the user is on, this will determine the attributes to which
     * the movement through the stepper is allowed.
     **/
    function btnDisabled(step) {
        // if we are on the first step and

        switch(step) {
            case "Select Project Features":
                if (project_name === "" || project_path === "" || project_id === "") {
                    return true;
                }
        }
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

    /**
     * Get the approapriate content for each step
     * @param: step: String -> the current step (e.g. "hosting")
     **/
    function getStepContent(step) {
        switch(step) {
            case 'hosting':
                return(
                    <div>
                        <div>
                            <Typography color="textSecondary" variant="body1">
                                What do you want to use as your public directory?
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <div>
                                {/* Will edit the public attribute within the "hosting"*/}
                                <TextField
                                    style={{width:'30%'}}
                                    id="outlined-size-small"
                                    size={'small'}
                                    placeholder="(public)"
                                    variant={"outlined"}
                                    color={'secondary'}
                                    onChange={(e) => {hosting_options.public_dir = e.target.value}}
                                />
                            </div>
                            <div style={{marginTop: '2%'}}/>
                        </div>
                        <div>
                            <Typography color="textSecondary" variant="body1">
                                Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <FormControl variant="outlined" style={{margin:5, minWidth:120}}>
                                <Select value={selectSinglePg} onChange={(e) => {setSinglePg(e.target.value); hosting_options.single_page_app = e.target.value}}>
                                    <MenuItem value={null}/>
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
                        <Typography color="textSecondary" variant="body1">
                            What file should be used for Database Rules?
                        </Typography>
                        <div style={{marginTop: '2%'}}/>
                        <div>
                            <TextField
                                style={{width:'50%'}}
                                id="outlined-size-small"
                                size={'small'}
                                placeholder="(database.rules.json)"
                                variant={"outlined"}
                                color={'secondary'}
                                onChange={(e) => {database_options.rules = e.target.value}}
                            />
                        </div>
                    </div>
                );
            case 'functions' :
                return(
                    <div>
                        <div>
                            <Typography color="textSecondary" variant="body1">
                                Do you want to setup ESlint? (y/N)
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <FormControl variant="outlined" style={{margin:5, minWidth:120}}>
                                <Select value={selectLint} onChange={(e) => {setLint(e.target.value); functions_options.lint = e.target.value}}>
                                    <MenuItem value={null}/>
                                    <MenuItem value={true}>Yes</MenuItem>
                                    <MenuItem value={false}>No</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{marginTop: '2%'}}/>
                        <div>
                            <Typography color="textSecondary" variant="body1">
                                Do you want to run 'npm install'? (y/N)
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <FormControl variant="outlined" style={{margin:5, minWidth:120}}>
                                <Select value={selectNpm} onChange={(e) => {setNpm(e.target.value); functions_options.npm = e.target.value}}>
                                    <MenuItem value={null}/>
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
            <Typography className={classes.pgTitle}>Create a new FireLounge project</Typography>
            <MobileStepper
                variant="progress"
                steps={currentSteps.length}
                position="static"
                activeStep={activeStep}
                className={classes.root}
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
                {activeStep === 0 ? (
                    <div className={classes.stepContent}>
                        <div>
                            <Typography>{'Enter Project Details: '}</Typography>
                        </div>
                        {/*
                        Here we will prompt the user to add the features that they desire
                        based on those features, we will add the necessary steps for project creation
                        */}
                        <div>
                            <TextField
                                style={{width:'80%'}}
                                id="outlined-size-small"
                                size={'small'}
                                placeholder="Enter your project name"
                                variant={"outlined"}
                                color={'secondary'}
                                onChange={(e) => {project_name = e.target.value; project_id = e.target.value.replace(/\s+/g, '-').toLowerCase() + "-" + id_hex();}}
                            />
                        </div>
                        <div style={{marginTop: '2%'}}/>
                        <GetPathButtonNewProject path={(path) => {project_path = path}}/>
                        <div style={{marginTop: '2%'}}/>
                        <div>
                            <Typography>{currentSteps[activeStep]}</Typography>
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={config.hosting}/>}
                                onClick={(event) => {event.stopPropagation(); handleConfig('hosting')}}
                                onFocus={(event) => event.stopPropagation()}
                                label="Hosting"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={config.database}/>}
                                onClick={(event) => {event.stopPropagation(); handleConfig('database')}}
                                onFocus={(event) => event.stopPropagation()}
                                label="Database"
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={<Checkbox checked={config.functions}/>}
                                onClick={(event) => {event.stopPropagation(); handleConfig('functions')}}
                                onFocus={(event) => event.stopPropagation()}
                                label="Functions"
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
