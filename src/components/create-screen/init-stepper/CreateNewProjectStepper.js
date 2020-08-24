import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GetPathButtonNewProject from "./GetPathButtonNewProject";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import {UserDispatch} from "../../../context/userContext";
import CircularIndeterminate from "../../main-screen/CircularProgress";
import StepperWave from "./StepperWave";
import StepperProjNameInput from "./StepperProjNameInput";
import GenericStepperInput from "./GenericStepperInput";
import GenericBooleanSelect from "./GenericBooleanSelect";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        borderRadius: 25,
        backgroundColor: '#EF233C'
    },  
    stepper: {
        backgroundColor: 'white',
        paddingBottom: '2%'
    },
    stepContent: {
        padding: '3%',
    },
    text: {
        color: '#fff',
        fontWeight:200,
    },
    pgTitle: {
        borderRadius: '25px 25px 0px 0px',
        paddingLeft: '3%',
        paddingTop: '3%',
        backgroundColor: 'white',
        fontWeight:200,
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

export default function CreateNewProjectStepper() {
    const classes = useStyles();
    const theme = useTheme();

    const dispatch = UserDispatch();

    const [project_name, setProjectName] = React.useState('');

    const [project_path, setProjectPath] = React.useState('');

    const [project_id, setProjID] = React.useState('');

    // current active step in the stepper
    const [activeStep, setActiveStep] = React.useState(0);

    // selection for EsLint on functions setup
    const [selectLint, setLint] = React.useState('');

    // selection for running 'npm install' on functions setup
    const [selectNpm, setNpm] = React.useState('');

    // single page app state value on hosting setup
    const [selectSinglePg, setSinglePg] = React.useState('');

    const [public_dir, setPublicDir] = React.useState('public');

    const [dbRules, setDbRules] = React.useState('database.rules.json');

    // the configuration of features the user wishes to add on the project
    const [config, setConfig] = React.useState({
        hosting: false,
        database: false,
        functions: false,
    });

    // the current steps throughout the project initialization process
    const [currentSteps, setCurrentSteps] = React.useState(["Select Project Features: "]);

    const [showProgress, setProgress] = React.useState(false);

    /**
     * Check the fields of the corresponding steps to ensure that the user has provide valid input, and prevent
     * them from moving forward if valid input has not been provided.
     * @param: step: String - the step that the user is on, this will determine the attributes to which
     * the movement through the stepper is allowed.
     **/
    function btnDisabled(step) {
        switch(step) {
            case "Select Project Features: ":
                if (project_name === "" || project_path === "" || project_id === "" || getFeatures().length === 0) {
                    return true;
                } else if (project_name.length < 4 || project_name.length > 20) {
                    return true;
                }
                break;
            case "hosting":
                if (selectSinglePg === '' || public_dir === '') {
                    return true;
                } else if (public_dir.length < 1 || public_dir.length > 15) {
                    return true;
                }
                break;
            case "database":
                if (dbRules === '' || dbRules.length < 5 || dbRules.length > 30 ) {
                    return true;
                } else if (dbRules.substring(dbRules.length - 5) !== ".json") {
                    return true;
                }
                break;
            case "functions": {
                if (selectNpm.npm === "" || setLint.lint === "") {
                    return true;
                }
                break;
            }
            default:
                return true;
        }
        return false;
    }

    /**
     * Get an array of the current features for a project
     * @return {string[]} an array taking the form of ["hosting", "database", ...] based on which values are true in config
     */
    function getFeatures() {
        return Object.keys(config)
            .filter(function(k){return config[k]})
            .map(String);
    }
    /**
     * function to check the input of field to determine whether or an error should be displayed on input
     * @param step - a string representing the step the user is currently on (e.g. "hosting" )
     * @return boolean - true if the input is invalid, false otherwise
     */
    function checkInput(step) {
        switch (step) {
            case "Select Project Features: ":
                if ((project_name.length < 4 || project_name.length > 20) && project_name.length !== 0) {
                    return true
                }
                break;
            case "hosting":
                if ((public_dir.length < 1 || public_dir.length > 15) && public_dir.length !== 0) {
                    return true;
                }
                break;
            case "database":
                if (((dbRules.length < 5 || dbRules.length > 30) && dbRules.length !== 0) || dbRules.substring(dbRules.length - 5) !== ".json") {
                    return true;
                }
                break;

            default:
                console.log('Unexpected Case');
        }

        return false;
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
        let featuresToBeAdded = getFeatures();

        setCurrentSteps((prevState => prevState.concat(featuresToBeAdded)))
    };

    const linearProgressProps = {
        color: 'primary', // i can set the color to either primary or secondary here
    };

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
                                <GenericStepperInput
                                    err={checkInput("hosting")}
                                    errMsg={"Public directory must be between 1-15 characters."}
                                    placeholder={"public"}
                                    getValue={(value) => {setPublicDir(value)}}
                                />
                            </div>
                            <div style={{marginTop: '2%'}}/>
                        </div>
                        <div>
                            <Typography color="textSecondary" variant="body1" className={classes.text}>
                                Configure as a single-page app (rewrite all urls to /index.html)? (y/N)
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <GenericBooleanSelect
                                getSelection={(value) => {setSinglePg(value)}}
                            />
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
                            <GenericStepperInput
                                err={checkInput("database")}
                                errMsg={"Database rules file must have a valid .json extension and be between 1-25 characters"}
                                placeholder={"database.rules.json"}
                                getValue={(value) => {setDbRules(value)}}
                            />
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
                            <GenericBooleanSelect
                                getSelection={(value) => {setLint(value)}}
                            />
                        </div>
                        <div style={{marginTop: '2%'}}/>
                        <div>
                            <Typography color="textSecondary" variant="body1" className={classes.text}>
                                Do you want to run 'npm install'? (y/N)
                            </Typography>
                            <div style={{marginTop: '2%'}}/>
                            <GenericBooleanSelect
                                getSelection={(value) => {setNpm(value)}}
                            />
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
        <div className={classes.root}>
            <Typography variant={'h6'} id='create-header' className={classes.pgTitle}>Create a new FireLounge project</Typography>
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
                        if ((activeStep === currentSteps.length - 1) && (activeStep !== 0)) {
                            setProgress(true);
                            const createCloudProj = require('../../../scripts/createProject/CreateCloudProject');
                            const cloudProjArg = [project_name, project_path, project_id];
                            createCloudProj.createCloudProject_function(cloudProjArg).then((value) => {
                                if (value === 'SUCCESS') {
                                    const fbJsonObj = {
                                        proj_name: project_name,
                                        proj_path: project_path,
                                        proj_id: project_id,
                                        hosting: {
                                            public_dir: public_dir,
                                            single_page_app: selectSinglePg,
                                        },
                                        database: {
                                            rules: dbRules,
                                        },
                                        functions: {
                                            npm: selectNpm,
                                            lint: selectLint,
                                        },
                                        config: {
                                            hosting: config.hosting,
                                            database: config.database,
                                            storage: config.storage,
                                            functions: config.functions,
                                        }
                                    };
                                    console.log(fbJsonObj);
                                    setProgress(false);
                                    const initFirebase = require('../../../scripts/createProject/initFirebasejson');
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
                <StepperWave/>
                {showProgress === true ? (<CircularIndeterminate/>) : null}
                {activeStep === 0 ? (
                    <div className={classes.stepContent}>
                        <div>
                            <Typography className={classes.text}>{'Enter Project Details: '}</Typography>
                        </div>
                        <div style={{width: '65%'}}>
                            <StepperProjNameInput
                                err={checkInput("Select Project Features: ")}
                                getProjectName={(proj_name) => {setProjectName(proj_name)}}
                                getProjectID={(proj_id) => {setProjID(proj_id)}}
                            />
                        </div>
                        <div style={{marginTop: '2%'}}/>
                        <GetPathButtonNewProject path={(path) => {setProjectPath(path)}}/>
                        <div style={{marginTop: '2%'}}/>
                        <Typography className={classes.text}>{currentSteps[activeStep]}</Typography>
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
                        <div style={{marginBottom: '2%'}}/>
                    </div>
                ) : (
                    <div>
                        {activeStep === currentSteps.length ? (
                            <div className={classes.stepContent}>
                                {/* Once the project has been created user will arrive at the submission confirmed screen*/}
                                <Typography variant={"h6"} className={classes.text}>Your Firelounge project has been created!</Typography>
                                <div style={{marginBottom: '2%'}}/>
                            </div>
                        ): (
                            <div className={classes.stepContent}>
                                {getStepContent(currentSteps[activeStep])}
                                <div style={{marginBottom: '2%'}}/>
                            </div>

                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
