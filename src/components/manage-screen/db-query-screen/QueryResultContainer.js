import React from 'react';
import { makeStyles, Typography } from '@material-ui/core'
import ReactJson from 'react-json-view';

var sampleJson = {
    "glossary": {
        "title": "example glossary",
		"GlossDiv": {
            "title": "S",
			"GlossList": {
                "GlossEntry": {
                    "ID": "SGML",
					"SortAs": "SGML",
					"GlossTerm": "Standard Generalized Markup Language",
					"Acronym": "SGML",
					"Abbrev": "ISO 8879:1986",
					"GlossDef": {
                        "para": "A meta-markup language, used to create markup languages such as DocBook.",
						"GlossSeeAlso": ["GML", "XML"]
                    },
					"GlossSee": "markup"
                }
            }
        }
    }
}



function QueryResultContainer(props) {

    return (
        <>
			<Typography>{props.queryString}</Typography> 
            <ReactJson 
                name={false}
                collapsed={true}
                src={sampleJson}
            />
        </>
    );
}

export default QueryResultContainer;