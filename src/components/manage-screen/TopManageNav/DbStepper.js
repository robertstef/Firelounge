import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import GetFilePath from './GetDbFilePathButton';
import DbNameInput from './DbNameInput';
import {UserDispatch, UserState} from '../../../context/userContext'
import InfoIcon from '@material-ui/icons/Info';
import Chip from '@material-ui/core/Chip';
import { Alert } from 'react-context-alerts';

const { shell } = window.require('electron')

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#EDF2F4'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    backgroundColor: '#8d99ae',
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#EDF2F4'
  },
  stepper: {
    backgroundColor: '#EDF2F4',
  },
  step: {
  },
  stepContent: {
  },
  stepLabel: {
  },
  icon: {
    color: '#EF233C',
    "&$activeIcon": {
      color: "#EF233C"
    },
    "&$completedIcon": {
      color: "#EF233C"
    },
  },
  activeIcon: {},
  completedIcon: {}
}));

/* Opens a browser window to get an AdminSDK key */
const openBrowser = () => {
        shell.openExternal('https://console.firebase.google.com/u/0/project/_/settings/serviceAccounts/adminSDK')
    }

/* Handles the step titles */
function getSteps() {
  return ['Generate Admin Key', 'Select the filepath to your Firebase Admin Key', 'Create Name for Database'];
}


function getStepContent(step, pathCallback, inputCallback, urlCallback) {
  const {user} = UserState();

  // chip label that states if there is an admin sdk key defined
  const key_chip = <Chip 
                variant="outlined" 
                icon={<InfoIcon/> }
                label='Key already defined for this project.' 
                style={{ marginTop: '10px'}}
                color='secondary'
              />

  switch (step) {
    case 0:
      return (
        <div>
          <p> If you don't already have a Firebase Admin Key on your local machine, 'Get Key' will open Firebase console where you can: </p>
          <p> a) Select your current project </p> 
          <p> b) Select 'Generate New Key' </p> 
          <p> c) Store key in safe location </p> 
          <div style={{display: 'block'}} >
            <Button variant="contained" style={{background: '#EF233C'}} onClick={openBrowser}> Get New Key </Button> 
            <div>{ (user.admin_obj === undefined || user.admin_obj === '' ) ?  null : key_chip } </div>
          </div>
        </div>
        )
    case 1:
      return (
          <div>
            <GetFilePath path={pathCallback} />
            { (user.admin_obj === undefined || user.admin_obj === '' ) ?  null : key_chip }
          </div>
        )
    case 2:
      return (
         <DbNameInput input={inputCallback} url={urlCallback} />
        )
    default:
      return 'Unknown step';
  }
}


export default function VerticalLinearStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const dispatch = UserDispatch();
  const {user} = UserState();
  const [alert, setAlert]  = React.useState({display: false, message: '', type: 'info'});  

  /* Handles the next button */
  const handleNext = (dispatch) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    //if last step - add database to the User file
    if(activeStep === 2) {
      let dbObj = {
        'path': dbPath,
        'dbName': dbName,
        'url': dbURL
      };

      try {
        dispatch({type:"addDb", args: dbObj});
        setAlert({display: true, message: 'Database successfully added to Firelounge', type: 'success'})
      } catch (error) {
        setAlert({display: true, message: 'There was an error adding the Database', type: 'error'})
      }
      
      
    }
  };

  /* Handles the back button */
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
   const pathInput = (event) => {
    setdbName(event);   
    }

  /* Callback used to retrieve the input from the textfield for the database url */
  const [dbURL, setdbURL] = React.useState('');
  const urlInput = (event) => {
   setdbURL(event);   
   }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
        {steps.map((label, index) => (
            <Step key={label}  >
              <StepLabel StepIconProps={{ classes:{ root: classes.icon, active: classes.activeIcon, completed: classes.completedIcon } }} > {label}</StepLabel>
              <StepContent className={classes.stepContent}>
                <div>{getStepContent(index, getSelectedPath, pathInput, urlInput)}</div>
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
                      disabled={ (activeStep === 1 && dbPath === '' && user.admin_obj === '' ) || ( activeStep === 2 && dbName === '' )  }
                      onClick={() => handleNext(dispatch)}
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
      <Alert type={alert.type} open={alert.display} message={alert.message} timeout={5000} onClose={()=>{ setAlert({display:false, message:'', type: 'info'})} }/>
    </div>
  );
}
