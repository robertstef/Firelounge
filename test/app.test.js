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


describe('Create Existing Project', () => {
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