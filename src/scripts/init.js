/**
 * Construct a user object with the information for the
 * current user.
 * @type {{init: module.exports.init}}
 */
export async function init_function() {
    const ui = require('./userInfo');
    const fb = require('./fbProjects');
    try {
        let user = await ui.user_info();
        user.fb_projs = await fb.fb_projlist();
        return user;
    }
    catch (err) {
        return err;
    }
}
