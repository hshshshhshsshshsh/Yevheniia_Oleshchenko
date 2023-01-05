const { Builder, By, until } = require("selenium-webdriver");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 50 * 1000;

require("chromedriver");
const driver = new Builder().forBrowser("chrome").build();

const loginAsAdmin = async () => {
  await driver.get(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  const username = By.css(".orangehrm-login-form input[name='username']");
  const password = By.css(".orangehrm-login-form input[name='password']");
  const login = By.css(".orangehrm-login-form button[type='submit']");
  await driver.wait(until.elementLocated(login), 20 * 1000);

  await driver.findElement(username).sendKeys("Admin");
  await driver.findElement(password).sendKeys("admin123");
  await driver.findElement(login).click();

  const goToDashboard = By.xpath("//a/span[normalize-space()='Dashboard']");
  await driver.wait(until.elementLocated(goToDashboard), 20 * 1000);
};

const navigate = async () => {
  const adminLink = By.xpath("//a/span[normalize-space()='Admin']");
  await driver.findElement(adminLink).click();
  const adminPageTitle = By.xpath("//h6[normalize-space()='Admin']");
  await driver.wait(until.elementLocated(adminPageTitle), 20 * 1000);

  const jobSelectInput = By.xpath(
    "//li/span[contains(normalize-space(),'Job')]"
  );
  await driver.findElement(jobSelectInput).click();
  const jobTitlesLink = By.xpath("//ul/li/a[normalize-space()='Job Titles']");
  await driver.findElement(jobTitlesLink).click();
  const jobPageTitle = By.xpath("//h6[normalize-space()='Job Titles']");
  await driver.wait(until.elementLocated(jobPageTitle), 20 * 1000);

  const addButton = By.css(".orangehrm-header-container button");
  await driver.findElement(addButton).click();
  const addJobPageTitle = By.xpath("//h6[normalize-space()='Add Job Title']");
  await driver.wait(until.elementLocated(addJobPageTitle), 20 * 1000);
};
