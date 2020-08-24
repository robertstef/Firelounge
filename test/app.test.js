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

describe("Initialization Tests", () => {

  /* Checks that the initial page contains the correct header */
  test("Content of Landing Page", async () => {
    
    await page.waitFor(20000);

    let text;
    await page.waitForSelector("#create-header");
    text = await page.$eval("#create-header", element => element.innerText);
    expect(text).toBe("Create a new FireLounge project");

  });    
  
  //add more test to make sure all of the elements are there
});

describe("Adding Existing Project", () => {
  /* Adds a existing project to firebase */
  test("Content of Create Existing Project", async () => {
    let text;
    
    //wait for dev server to start, init script to run
    await page.waitFor(20000);
    
    //navigate to add existing project page
    await page.waitForSelector("#create-existing-proj-icon");
    await page.click("#create-existing-proj-icon");
    
    //confirm what page were on
    await page.waitForSelector("#create-existing-proj-header" );
    text = await page.$eval("#create-existing-proj-header", element => element.innerText);
    expect(text).toBe("Already Have a Firebase Project?");
    
  });

  test("Create Existing Project Execution", async () => {
    // click to add project 
    await page.waitForSelector("#create-existing-proj-button");
    await page.$eval( "#create-existing-proj-button", form => form.click() );

    // click to add project 
    await page.waitForSelector("#create-existing-proj-alert");
    text = await page.$eval("#create-existing-proj-alert", element => element.innerText);
    expect(text).toBe("Project Successfully Imported to Firelounge");
  });

  test("Create Existing Project Navigate to Manage Page", async () => {
    // click to navigate to deploy page 
    await page.waitForSelector("#manage-proj-icon");
    await page.click("#manage-proj-icon");

    // confirm proj id matches recently added project
    await page.waitForSelector("#manage-deploy-proj-title");
    text = await page.$eval("#manage-deploy-proj-title", element => element.innerText);
    expect(text).toBe("bensnewproject");
  });

  // test("Create Existing Project Confirmation", async () => {

  // });

});

  
 