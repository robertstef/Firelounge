const electron = require("electron");
const kill = require("tree-kill");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");


const port = 9200; // Debugging port
const timeout = 35000; // Timeout in miliseconds
let page;
let pid;

jest.setTimeout(timeout);

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

describe('Initialization Tests...', () => {
  const {test1} = require("./helpers/InitalizationTests.js");

  test('Correct Landing Page Title', async () => {
    await test1(page);
  });

});


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

describe('Deploy Tests...', () => {
  const {test1, test2, test3, test4, test5, test6, test7, test8, test9, test10, test11} = require("./helpers/DeployTests.js");

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
});