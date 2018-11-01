const puppeteer = require('puppeteer');
const userData = require('./user-data');

const url = "http://ourgoalplan.com";
const nameFieldSelector = "#txtName";
const passwordFieldSelector = "#txtPassword";
const loginButtonSelector = "#btnLogin";
const rememberCheckboxSelector = "#chkRemember";
const addGoalTextareaSelector = "#ucAddGoal_txtAddGoal";
const addGoalButtonSelector = "#ucAddGoal_btnAddGoal";
const updateGoalButtonSelector = "#btnUpdate";

const TYPING_DELAY = 10;
const CLICKING_DELAY = 250;

const loginAndDoAction = async (action) => {

  const browser = await puppeteer.launch({
      headless: true
  });
  const page = await browser.newPage();

  await login(page);
  await page.waitForNavigation({
    timeout: 60000
  });  

  if(action === "add"){
    await addGoals(page,userData);
  }
  else if(action === "update"){
    await updateGoals(page);
  }
  await closeBrowser(browser);
};

const login = async (page) => {
  await page.goto(url);
  await page.type(nameFieldSelector, userData.username, {delay: TYPING_DELAY});
  await page.type(passwordFieldSelector, userData.password, {delay: TYPING_DELAY});
  await page.click(rememberCheckboxSelector, {delay: CLICKING_DELAY});
  await page.click(loginButtonSelector, {delay: CLICKING_DELAY});
};
const addGoals = async (page,userData) => {
  await page.type(addGoalTextareaSelector,userData.goalsToAdd,{delay:TYPING_DELAY});
  await page.click(addGoalButtonSelector,{delay:CLICKING_DELAY});
};

const updateGoals = async (page) => {
  await page.evaluate(() => {
    const q = document.querySelectorAll("#dgGoals>tbody>tr");
    q.forEach((w,key) => {
      if(key>0 && key<6){
        w.children[0].children[1].checked = true;
      }
    });
  });
  await page.click(updateGoalButtonSelector,{delay:CLICKING_DELAY});
};

const closeBrowser = async (browser) => {
  await browser.close();
};

loginAndDoAction("add");