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

describe("New Jobs", () => {
  describe("when user is logged in as admin", () => {
    beforeEach(async () => {
      await loginAsAdmin();
      await navigate();
    });

    it("can create and remove job titles", async () => {
      // додати нову вакансію
      const testJobTitle = "Barber";
      const testJobDescription = "Cutting hair";
      const testNote = "Have good skills";

      await driver
        .findElement(By.css(".oxd-form input"))
        .sendKeys(testJobTitle);
      await driver
        .findElement(
          By.css(".oxd-form textarea[placeholder='Type description here']")
        )
        .sendKeys(testJobDescription);
      await driver
        .findElement(By.css(".oxd-form textarea[placeholder='Add note']"))
        .sendKeys(testNote);
      await driver
        .findElement(By.xpath("//button[normalize-space()='Save']"))
        .click();
      console.log("New Job was added.");

      await driver.wait(
        until.elementLocated(
          By.xpath("//div[contains(@class, 'oxd-table-header-cell')]")
        ),
        20 * 1000
      );

      // перевірити чи додалась вакансія
      const addedJobTitle = By.xpath(
        `//div[contains(text(), '${testJobTitle}')]`
      );
      const addedJobDescription = By.xpath(
        `//div[contains(text(), '${testJobDescription}')]`
      );
      const newTitle = await driver
        .findElement(addedJobTitle)
        .then((el) => el)
        .catch((e) => console.log("New job title is not found"));
      const newDescription = await driver
        .findElement(addedJobDescription)
        .then((el) => el)
        .catch((e) => console.log("New job description is not found"));
      expect(newTitle && newDescription).toBeDefined();

      // видалити новостворену вакансію
      const checkboxes = await driver.findElements(
        By.xpath(
          `//div[contains(normalize-space(), '${testJobTitle}')]/preceding::i`
        )
      );
      await checkboxes[checkboxes.length - 1].click();
      await driver
        .findElement(
          By.xpath("//button[contains(normalize-space(), 'Delete Selected')]")
        )
        .click();
      await driver
        .findElement(
          By.xpath("//button[contains(normalize-space(), 'Yes, Delete')]")
        )
        .click();
      console.log("New Job was deleted.");

      // перевірити чи видалилась вакансія
      const deletedTitle = await driver
        .findElement(addedJobTitle)
        .then((el) => el)
        .catch((e) => console.log("Deleted job title is not found"));
      const deletedDescription = await driver
        .findElement(addedJobDescription)
        .then((el) => el)
        .catch((e) => console.log("Deleted job description is not found"));
      expect(deletedTitle && deletedDescription).not.toBeDefined();
    });

    // закрити браузер після закінченння виконання тестів
    afterEach(() => driver.quit());
  });
});
