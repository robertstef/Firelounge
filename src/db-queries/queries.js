const {exec} = require('child_process');

/**
 * Parses a given sql query and returns a JSON
 * object indicating the operators and their
 * values.
 *
 * @param query: String representing and SQL query
 *
 * @returns {Promise}: resolves with the stringified JSON object
 *                     indicating the SQL operators and their values
 *
 *                     rejects with an error message
 */
function parse_query(query) {
    return new Promise((resolve, reject) => {
        exec(`python parser.py "${query}"`, (error, stdout, stderr) => {
            if (error) {
                reject(error.message);
            } else if (stderr) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
}
