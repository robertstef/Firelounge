import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import GetPathButtonNewProject from "./GetPathButtonNewProject";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";


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
        width: '100%',
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

    // current active step in the stepper
    const [activeStep, setActiveStep] = React.useState(0);

    // the configuration of features the user wishes to add on the project
    const [config, setConfig] = React.useState({
        hosting: false,
        database: false,
        functions: false,
    });

    // the current steps throughout the project initialization process
    const [currentSteps, setCurrentSteps] = React.useState(["Select Project Features"]);

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
                        Here is the hosting shit
                    </div>
                );
            case 'database':
                return(
                    <div>
                        Here is the database shit
                    </div>
                );
            case 'functions' :
                return(
                    <div>
                        Here is the functions shit
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
            <div style={{marginTop: 10}}/>
            <GetPathButtonNewProject path={(path) => {project_path = path}}/>
            <div style={{marginTop: 10}}/>
            <MobileStepper
                variant="progress"
                steps={currentSteps.length}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={()=>{
                        if (activeStep === 0) {
                            addFurtherSteps();
                        }
                        handleNext();
                    }} disabled={activeStep === currentSteps.length}>
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
            <div>
                {activeStep === 0 ? (
                    <div>
                        <div>
                            {currentSteps[activeStep]}
                        </div>
                        {/*
                        Here we will prompt the user to add the features that they desire
                        based on those features, we will add the necessary steps for project creation
                        */}
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
                            <div>
                                I am at the end
                            </div>
                        ): (
                            <div>
                                {getStepContent(currentSteps[activeStep])}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Button
                onClick={()=> {console.log(config, currentSteps)}}
            >
                TESTING BUTTON
            </Button>
        </div>
    );
}
