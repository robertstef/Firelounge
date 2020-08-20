const electron = require("electron");
const kill = require("tree-kill");
const puppeteer = require("puppeteer-core");
const { spawn } = require("child_process");
const { doesNotMatch } = require("assert");

const port = 9200; // Debugging port
const timeout = 20000; // Timeout in miliseconds
let page;
let pid;

/*Function to deplay code execution */ 
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

jest.setTimeout(timeout);

beforeAll(async () => {
  const startTime = Date.now();
  let browser;

  // Start Electron with custom debugging port
  pid = spawn(electron, [".", `--remote-debugging-port=${port}`], {
    shell: true
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

afterAll(async () => {
  try {
    await page.close();
    done();
  } catch (error) {
    kill(pid);
  }
});

describe("App", () => {
  test("Text matches", async () => {
    let text;
    await page.waitForSelector("#create-header");
    text = await page.$eval("#create-header", element => element.innerText);
    expect(text).toBe("Create a new FireLounge project");
  });
});
