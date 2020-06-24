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
                    path: "/Users/robertstefanyshin/FL_testdir/bensnewproject"
                },
                benstestproject: {
                    name: "benstestproject",
                    features: ["hosting"],
                    path: "/Users/robertstefanyshin/FL_testdir/benstestproject"
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
                    database: [
                        { name: "Test Database", path: "/Users/benbaker/Documents/OpenchFirebase/src/cmpt350-project-ed891-firebase-adminsdk-q24yr-4db1b76965.json" },
                        { name: "Test Database2", path: "/Users/benbaker/Documents/OpenchFirebase/src/cmpt350-project-ed891-firebase-adminsdk-q24yr-4db1b76965.json" }
                    ]
                },
                benstestproject: {
                    name: "benstestproject",
                    features: ["hosting"],
                    path: "/Users/benbaker/FL_testdir/benstestproject"
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
                    path: "/Users/jacksonschuler/FL_testdir/bensnewproject"
                },
                benstestproject: {
                    name: "benstestproject",
                    features: ["hosting"],
                    path: "/Users/jacksonschuler/FL_testdir/benstestproject"
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
