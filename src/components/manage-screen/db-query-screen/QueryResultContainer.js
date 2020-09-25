import React, {useEffect, useState} from 'react';
import ReactJson from 'react-json-view';
import {UserState} from "../../../context/userContext";
import { Alert } from 'react-context-alerts';

export default function QueryResultContainer({query, setQuery}) {
    const {user} = UserState(); 
    const sql = require('../../../queries-Robert/execQuery'); 
    const [result, setResult] = useState({})    
    const [alert, setAlert]  = React.useState({display: false, message: '', type: 'error'});  

    

    useEffect(() => {
        async function runQuery() {
            console.log(query)        
            if(query.queryString !== undefined && !query.querySuccess){
                try {
                    let response = await sql.executeQuery(query.queryString, user.db_obj, query.shouldCommit)
                    console.log(response)
                    setResult(response)
                    setQuery(query => ({
                        ...query,
                        querySuccess: true,
                    }))
                } catch (error){
                    setAlert({display: true, message: error.message, type: 'error'})
                }
              } else {
                  setResult({})
              }
        }
      runQuery();
    }, [query.queryString, query.shouldCommit])

    return (
        <>
            { result === undefined || result === null || Object.keys(result).length === 0 ? 
            null
            :
            <ReactJson 
                name={false}
                enableClipboard={false}
                collapsed={2}
                src={result}
            />}
        <Alert type={alert.type} open={alert.display} message={<p id={'manage-query-db-alert'}> {alert.message} </p>} timeout={5000} onClose={()=>{ setAlert({display:false, message:'', type: 'error'})}} />
        </>
    );  
}
