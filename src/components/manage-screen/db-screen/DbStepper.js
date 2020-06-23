import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import GetFilePath from './GetDbFilePathButton';
import DbNameInput from './DbNameInput';

const { shell } = window.require('electron')

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#EDF2F4'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#EDF2F4'
  },
  stepper: {
    backgroundColor: '#EDF2F4'
  },
  step: {
    backgroundColor: '#EDF2F4'
  },
  stepContent: {
    backgroundColor: '#EDF2F4'
  }
}));


const openBrowser = () => {
        shell.openExternal('https://console.firebase.google.com/u/0/project/_/settings/serviceAccounts/adminSDK')
    }

function getSteps() {
  return ['Generate New Key', 'Import Key', 'Create Name'];
}

function getStepContent(step, pathCallback, inputCallback) {
  switch (step) {
    case 0:
      return (
        <div>
          <Button onClick={openBrowser}> Get New Admin Key </Button> 
        </div>
        )
    case 1:
      return (
          <GetFilePath path={pathCallback}/>
        )
    case 2:
      return (
         <DbNameInput input={inputCallback} />
        )
    default:
      return 'Unknown step';
  }
}

export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    //if last step - call script to insert database name and path into user file
    if(activeStep === 2) {
      console.log('call script here..')
      console.log(dbPath)
      console.log(dbName)
    }


  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /* Callback to retrieve the selected path from GetPathButton */
  const [dbPath, setdbPath] = React.useState('');
  const getSelectedPath = (selectedPath) => {
    setdbPath(selectedPath);
  }

  /* Callback used to retrieve the input from the textfield for the database name */
   const [dbName, setdbName] = React.useState('');
   const handleInput = (event) => {
      setdbName(event);   
    }


  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
        {steps.map((label, index) => (
          <Step key={label} className={classes.step}>
            <StepLabel>{label}</StepLabel>
            <StepContent className={classes.stepContent}>
              <div>{getStepContent(index, getSelectedPath, handleInput)}</div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
