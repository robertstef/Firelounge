import React from 'react';

const userStateContext = React.createContext();
const userDispatchContext = React.createContext();

// use dispatch to modify the state
// use state to pass around info and

function UserReducer(state, action) {
    return {default: state.default += 1}
}

/**
 * A component to provide the user context to the application.
 */
function UserProvider({children}) {
    const [state, dispatch] = React.useReducer(UserReducer, {default: 0});
    return (
        <userStateContext.Provider value={state}>
            <userDispatchContext.Provider value={dispatch}>
                {children}
            </userDispatchContext.Provider>
        </userStateContext.Provider>
    );
}

function UserState() {
    const context = React.useContext(userStateContext);
    if (context === undefined) {
        throw new Error("userState must be used within a userProvider");
    }
    return context;
}

function UserDispatch() {
    const context = React.useContext(userDispatchContext);
    if (context === undefined) {
        throw new Error("userDispatch must be used within a userProvider");
    }
    return context;
}

export {UserProvider, UserState, UserDispatch}