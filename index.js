const puppeteer = require('puppeteer');
const userData = require('./user-data');

const url = "http://ourgoalplan.com";
const nameFieldSelector = "#txtName";
const passwordFieldSelector = "#txtPassword";
const loginButtonSelector = "#btnLogin";
const rememberCheckboxSelector = "#chkRemember";
const addGoalTextareaSelector = "#ucAddGoal_txtAddGoal";
const addGoalButtonSelector = "#ucAddGoal_btnAddGoal";
const goalCheckboxSelector = "#dgGoals>tbody>tr:nth-child(2)>td:nth-child(1)>input:last-child";
const goalUpdateButtonSelector = "#btnUpdate";

let goalIds = ["dgGoals_ctl02_chkStatus", "dgGoals_ctl03_chkStatus", "dgGoals_ctl04_chkStatus", "dgGoals_ctl05_chkStatus", "dgGoals_ctl06_chkStatus"];

const loginAndDoAction = async () => {

  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();

  await login(page);
  await page.waitForNavigation({
    timeout: 60000
  });  
  await addGoals(page,userData);
  await closeBrowser(browser);
};

const login = async (page) => {
  await page.goto(url);
  await page.type(nameFieldSelector, userData.username, {delay: 30});
  await page.type(passwordFieldSelector, userData.password, {delay: 30});
  await page.click(rememberCheckboxSelector, {delay: 250});
  await page.click(loginButtonSelector, {delay: 150});
};
const addGoals = async (page,userData) => {
  await page.type(addGoalTextareaSelector,userData.goalsToAdd,{delay:30});
};

const closeBrowser = async (browser) => {
  await browser.close();
};

//Entry point for the program
loginAndDoAction();