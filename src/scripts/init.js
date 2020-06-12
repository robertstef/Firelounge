const ui = require('./userInfo');
const fb = require('./fbProjects');

/**
 * Construct a user object with the information for the
 * current user.
 * @type {{init: module.exports.init}}
 */
module.exports = {
    init_function: async function () {
        try {
            let user = await ui.user_info();
            user.fb_projs = await fb.fb_projlist();
            console.log("init_function:");
            console.log(user);
            return user;
        }
        catch (err) {
            return err;
        }
    }
};
