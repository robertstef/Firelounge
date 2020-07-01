/**
 * Used to setup test user info for the current session.
 */
let test_user = () => {

    const os = window.require('os');
    let cur_user = os.userInfo().username;

    let setup = {
        robertstefanyshin: {
            uname: "robertstefanyshin",
            act_proj: "benstestproject",
            projs: {
                bensnewproject: {
                    name: "bensnewproject",
                    features: ["hosting", "database"],
                    path: "/Users/robertstefanyshin/FL_testdir/bensnewproject",
                    database: {
                        active: "Test Database",
                        all: {
                            "Test Database": {
                                path: "/Users/robertstefanyshin/Documents/OpenchFirebase/src/cmpt350-project-ed891-firebase-adminsdk-q24yr-4db1b76965.json"           
                            },
                            "Test Database2": {
                                path: "/Users/robertstefanyshin/Documents/OpenchFirebase/src/cmpt350-project-ed891-firebase-adminsdk-q24yr-4db1b76965.json"  
                            } 
                        }
                    }
                },
                benstestproject: {
                    name: "benstestproject",
                    features: ["hosting"],
                    path: "/Users/robertstefanyshin/FL_testdir/benstestproject",
                    database: {
                        active: '',
                        all: {}
                    }
                }

            },
            fb_projs: [
                {name: "bensnewproject", id: "bensnewproject", num: "742369165416"},
                {name: "benstestproject", id: "benstestproject", num: "685095545446"},
                {name: "cmpt350-project", id: "cmpt350-project-ed891", num: "416129775733"},
                {name: "opench-app", id: "opench-app", num: "74547298413"}

            ]
        },
        benbaker: {
            uname: "benbaker",
            act_proj: "bensnewproject",
            projs: {
                bensnewproject: {
                    name: "bensnewproject",
                    features: ["hosting", "database"],
                    path: "/Users/benbaker/FL_testdir/bensnewproject",
                    admin: "/Users/benbaker/Documents/OpenchFirebase/src/Users/cmpt350-project-ed891-firebase-adminsdk-q24yr-26a62e5c53.json",
                    database: {
                        active: "Test Database",
                        all: {
                            "Test Database": {
                                url: ""
                            },           
                            "Test Database2": {
                                url: "cmpt350-project-ed891"  
                            } 
                        }
                    }
                },
                benstestproject: {
                    name: "benstestproject",
                    features: ["hosting", "database"],
                    admin: "/Users/benbaker/Documents/OpenchFirebase/src/Users/opench-app-firebase-adminsdk-hmem8-066d6d6ee3.json",
                    path: "/Users/benbaker/FL_testdir/benstestproject",
                    database: {
                        active: "Opench Database",
                        all: {
                            "Opench Database": {
                                url: ""
                            } 
                        }
                    }
                }
            },
            fb_projs: [
                {name: "bensnewproject", id: "bensnewproject", num: "742369165416"},
                {name: "benstestproject", id: "benstestproject", num: "685095545446"},
                {name: "cmpt350-project", id: "cmpt350-project-ed891", num: "416129775733"},
                {name: "opench-app", id: "opench-app", num: "74547298413"}

            ]
        },
        jacksonschuler: {
            uname: "jacksonschuler",
            act_proj: "benstestproject",
            projs: {
                bensnewproject: {
                    name: "bensnewproject",
                    features: ["hosting", "database"],
                    path: "/Users/jacksonschuler/FL_testdir/bensnewproject",
                    database: {
                        active: "Test Database",
                        all: {
                            "Test Database": {
                                path: "/Users/jacksonschuler/Documents/OpenchFirebase/src/cmpt350-project-ed891-firebase-adminsdk-q24yr-4db1b76965.json"           
                            },
                            "Test Database2": {
                                path: "/Users/jacksonschuler/Documents/OpenchFirebase/src/cmpt350-project-ed891-firebase-adminsdk-q24yr-4db1b76965.json"  
                            } 
                        }
                    }
                },
                benstestproject: {
                    name: "benstestproject",
                    features: ["hosting"],
                    path: "/Users/jacksonschuler/FL_testdir/benstestproject",
                    database: {
                        active: '',
                        all: {}
                    }
                }
            },
            fb_projs: [
                {name: "bensnewproject", id: "bensnewproject", num: "742369165416"},
                {name: "benstestproject", id: "benstestproject", num: "685095545446"},
                {name: "cmpt350-project", id: "cmpt350-project-ed891", num: "416129775733"},
                {name: "opench-app", id: "opench-app", num: "74547298413"}

            ]
        }
    };

    if (setup[cur_user] === undefined) {
        throw new Error("Robert made a spelling mistake - check you're username in the setup object of" +
            " testUserInfo.js");
    }
    return setup[cur_user];
};

exports.test_user = test_user;
