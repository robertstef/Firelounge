import React, {useEffect, useState} from 'react';
import { makeStyles, Typography } from '@material-ui/core'
import ReactJson from 'react-json-view';
import {UserState} from "../../../context/userContext";
import { Alert } from 'react-context-alerts';

export default function QueryResultContainer({queryString, setSuccessfulQuery}) {
    const {user} = UserState(); 
    const sql = require('../../../queries-Robert/execQuery'); 
    const [result, setResult] = useState({})    
    const [alert, setAlert]  = React.useState({display: false, message: '', type: 'error'});  

    useEffect(() => {
        async function runQuery() {
            if(queryString !== ''){
                try {
                    let response = await sql.executeQuery(queryString, user.db_obj, false)
                    setResult(response)
                    setSuccessfulQuery(true)
                } catch (error){
                    setAlert({display: true, message: error.message, type: 'error'})
                }
              }
        }
      runQuery();
    }, [queryString])

    
    
    return (
        <>
            { Object.keys(result).length === 0 ? 
            null
            :
            <ReactJson 
                name={false}
                collapsed={2}
                src={result}
            />}
        <Alert type={alert.type} open={alert.display} message={<p id={'manage-query-db-alert'}> {alert.message} </p>} timeout={5000} onClose={()=>{ setAlert({display:false, message:'', type: 'error'})}} />
        </>
    );  
}
