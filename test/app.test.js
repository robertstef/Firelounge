const electron = require("electron");
const kill = require("tree-kill");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");
const { exec } = require("child_process");

const port = 9200; // Debugging port
const timeout = 35000; // Timeout in miliseconds
let page;
let pid;

/* Define tests to run */
const RUN_ALL = true;
const RUN_LOGIN = false;
const RUN_INITIALIZATION = true;
const RUN_CREATE_EXISTING_PROJ = false;
const RUN_DEPLOY = false;
const RUN_ADD_DATABASE = false;
const RUN_DATABASE_SETTINGS = true;
const RUN_LOGOUT = false;


jest.setTimeout(timeout);


/* delete user file path */
if(process.env.userfile_path != '') {
  exec("rm " + process.env.userfile_path, {shell: true}, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log("Deleted User File");
  });  
}

/* function that runs before each test suite */
beforeAll(async () => {
  const startTime = Date.now();
  let browser;

  //set env variable to hide webtools
  var env = process.env; 
  env.hide_webtools = true;

  // Start Electron with custom debugging port
  pid = spawn(electron, [".", `--remote-debugging-port=${port}`], {
    shell: true,
    env: env
  }).pid;

  // Wait for Puppeteer to connect
  while (!browser) {
    try {
      browser = await puppeteer.connect({
        browserURL: `http://localhost:${port}`,
        defaultViewport: { width: 1000, height: 600 }
      });
      [page] = await browser.pages();
    } catch (error) {
      if (Date.now() > startTime + timeout) {
        throw error;
      }
    }
  }
});

/* function that runs after each test suite */
afterAll(async () => {
  try {
    await page.close();
  } catch (error) {
    kill(pid);
  }
});

/* LOGIN TESTS */
if(RUN_LOGIN || RUN_ALL) {
  describe('Login Tests...', () => {
    const {test1, test2, test3} = require("./helpers/LoginTests.js");
    
    test('Able to Logout of Account', async () => {
      await test1(page);
    });
    
    test('Login Modal Display Correctly', async () => {
      await test2(page);
    });

    test('Click and Confirm Login ', async () => {
      await test3(page);
    });

  });
};

/* INITIALIZATION TESTS */
if(RUN_INITIALIZATION || RUN_ALL) {
  describe('Initialization Tests...', () => {
    const {test1} = require("./helpers/InitalizationTests.js");

    test('Correct Landing Page Title', async () => {
      await test1(page);
    });
  });
};

/* CREATE EXISTING PROJECT TESTS */
if(RUN_CREATE_EXISTING_PROJ || RUN_ALL) {
  describe('Create Existing Project...', () => {
    const {test1, test2, test3, test4} = require("./helpers/CreateExistingProject.js");

    test('Content of Create Existing Project', async () => {
      await test1(page);
    });

    test('Create Existing Project Execution', async () => {
      await test2(page);
    });

    test('Create Existing Project Navigate to Manage Page', async () => {
      await test3(page);
    });
    
    test('Create Existing Project Confirmation', async () => {
      await test4(page);
    });
  });
};

/* DEPLOY TESTS */
if(RUN_DEPLOY || RUN_ALL) {
  describe('Deploy Tests...', () => {
    const {test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11, test12, test13} = require("./helpers/DeployTests.js");

    test('Confirm Deploy Page Header', async () => {
      await test1(page);
    });

    test('Confirm All Button is Displayed', async () => {
      await test2(page);
    });

    if(process.env.project_features.includes('hosting')){
      test('Confirm Hosting Button is Displayed', async () => {
        await test3(page);
      });
    };

    if(process.env.project_features.includes('database')){
      test('Confirm Database Button is Displayed', async () => {
        await test4(page);
      });
    };

    if(process.env.project_features.includes('storage')){
      test('Confirm Storage is Displayed', async () => {
        await test5(page);
      });
    };

    if(process.env.project_features.includes('functions')){
      test('Confirm Functions Button is Displayed', async () => {
        await test6(page);
      });
    };

    if(process.env.project_features.includes('hosting')){
      test('Confirm Hosting Switch Functions Correctly', async () => {
        await test7(page);
      });
    };

    test('Confirm All Switch Functions Correctly', async () => {
      await test8(page);
    });

    test('Confirm All Switch Toggles Other Switches To True', async () => {
      await test9(page);
    });

    test('Confirm All Switch Disables Other Switches Correctly', async () => {
      await test10(page);
    });

    test('Confirm All Switch Toggles Other Switches To False', async () => {
      await test11(page);
    });

    test('Confirm Deploy Hosting Functions Correctly', async () => {
      await test12(page);
    });

    test('Confirm Deploy All Functions Correctly', async () => {
      await test13(page);
    });

  });
};

/* ADD DATABASE TESTS */
if(RUN_ADD_DATABASE || RUN_ALL) {
  describe('Add Database Tests...', () => {
    const {test1, test2, test3, test4} = require("./helpers/AddDatabaseTests.js");

    test('Confirms Navigation to Database Object Page ', async () => {
      await test1(page);
    });

    test('Open Add Database Modal', async () => {
      await test2(page);
    });

    test('Input Database Information in Stepper', async () => {
      await test3(page);
    });

    test('Confirm Database was added', async () => {
      await test4(page);
    });
    
  });
};

/* DATABASE SETTINGS TESTS */
if(RUN_DATABASE_SETTINGS || RUN_ALL) {
  describe('Database Settings...', () => {
    const {test1, test2, test3, test4, test5} = require("./helpers/DatabaseSettingsTests.js");

    test('Open Settings Modal', async () => {
      await test1(page);
    });
    
    test('Confirm Default Database Settings', async () => {
      await test2(page);
    });

    test('Confirm Database Object Params', async () => {
      await test3(page);
    });

    test('Update Database Settings', async () => {
      await test4(page);
    });

    test('Confirm Database Settings Being Updated Correctly ', async () => {
      await test5(page);
    });

  });
};

/* LOGOUT TESTS */
if(RUN_LOGOUT || RUN_ALL) {
  describe('Logout Tests...', () => {
    const {test1, test2} = require("./helpers/LogoutTests.js");

    test('Open Settings Modal', async () => {
      await test1(page);
      
    });

    test('Logout and Wait for Login Modal', async () => {
      await test2(page);
    });

  });
};