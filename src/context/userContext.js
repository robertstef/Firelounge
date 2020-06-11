import React from 'react';
import User from './userObject';

/* Create a state context and a dispatch context */
const userStateContext = React.createContext();
const userDispatchContext = React.createContext();

/* Test user data */
let projects = {123:{name:"proj1", path:"./Users/proj1", features:["H"]},
                321:{name:"test_proj", path:"~/src/files", features:["H"]},
                456:{name:"new_proj", path:"/users/robertstefanyshin/", features:["H"]}};

let fb_projects = [{name: "test_proj", id: "test_proj_id", num: "1234"},
                   {name: "new_proj", id: "new_proj_id", num: "5678"},
                   {name: "last_proj", id: "list_proj_id", num: "23048"}];

let test_user = new User("Robert", projects, fb_projects, "123");

/**
 * A reducer function for use by UserProvider to carry out
 * the desired action on the userDispatchContext.
 *
 * @param state: the current context state
 * @param action: object specifying the operation to be carried out
 *                on the current User context. Must be of the form:
 *                {type: String, args: {}}
 *
 *                type must be set to on of:
 *                createUser, setActive, addProj, removeProj
 *
 *                args format:
 *                createUser: {uname: String,
 *                             projs: {id:{name:"", path:"", features:["", ...]}, ...},
 *                             fb_projs: [{name: "", number:"", id:""}, ...],
 *                             act_proj: String}
 *                all other cases: String
 *
 * @returns {user: (*|User|number|string)}: updated User state
 */
function UserReducer(state, action) {
    switch(action.type) {
        case 'createUser':
            let params = action.args;
            let new_user = new User(params.uname, params.projs, params.fb_projs, params.act_proj);
            return {user: new_user};
        case 'setActive':
            state.user.setActive(action.args);
            return {user: state.user};
        case 'addProj':
            state.user.addProj(action.args);
            return {user: state.user};
        case 'removeProj':
            state.user.removeProj(action.args);
            return {user: state.user};
        default:
            throw new Error("Unspecified action");
    }
}

/**
 * A component to provide the user context to the application.
 * All components nested within UserProvider will be able to
 * access the UserState and UserDispatch.
 */
function UserProvider({children}) {

    const [state, dispatch] = React.useReducer(UserReducer, {user: {}});
    return (
        <userStateContext.Provider value={state}>
            <userDispatchContext.Provider value={dispatch}>
                {children}
            </userDispatchContext.Provider>
        </userStateContext.Provider>
    );
}

/**
 * A function used to give the calling component access to the
 * current users state information.
 */
function UserState() {
    const context = React.useContext(userStateContext);
    if (context === undefined) {
        throw new Error("userState must be used within a userProvider");
    }
    return context;
}

/**
 * A function used to give the calling component access to the
 * dispatch state to update the current users state information.
 */
function UserDispatch() {
    const context = React.useContext(userDispatchContext);
    if (context === undefined) {
        throw new Error("userDispatch must be used within a userProvider");
    }
    return context;
}

export {UserProvider, UserState, UserDispatch}