
/*
    param: options - json object {'hosting': true, 'storage': false, ...}
 */

function deploy(options) {

    if (options.all === true) {
        console.log("firebase deploy everything");
    } else {
        let options_arr = Object.keys(options)
            .filter(function(k){return options[k]})
            .map(String);

        console.log("firebase deploy --only " + options_arr.join(','))
    }
}

