import React from "react";
import TextField from "@material-ui/core/TextField";


export default function DbNameInput(props) {
        
    const [dbName, setdbName] = React.useState('');
    const handleInput = (event) => {
      console.log(event.target.value)
      setdbName(event.target.value); 
      props.input(event.target.value)
    }

    return(
        <div style={{marginTop:10}}>
            <TextField  
                        style={{width:'80%'}}
                        id="outlined-size-small"
                        size={'small'}
                        placeholder="Enter your database name (Optional)"
                        variant={"outlined"}
                        color={'secondary'}
                        value={dbName}
                        onChange={handleInput}
            />
        </div>
    )
}
