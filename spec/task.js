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
