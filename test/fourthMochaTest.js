const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

require('chromedriver');
//Lets add the ability to enhance our reports
const addContext = require('mochawesome/addContext')

// It's probably better to wait in the POM - the test doesn't care how things happen, just that they happen!
// but there's still some unPOMified code so it needs to stay for now.
let myLib = require("../libs/MyFunctionLib.js")

// Get the POM pages this test suite requires
let homePage = require('../pom/homePOM.js')
let searchPage = require('../pom/searchResultsPOM.js')
let cartPage = require('../pom/cartPOM.js')

//Test suite
describe("My first test suite but with waits from library", function () {

    //this.timeout(0); //Uncomment to disable timeouts, or add it to .mocharc conf file

    /** @type {WebDriver} */
    let driver

    //Setup and teardown hooks
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get("https://www.edgewordstraining.co.uk/demo-site/")


    })

    after(async function () {
        await driver.quit();
    })


    //First test
    it("uses the POM", async function () {
        /*
            Exported from SeleniumIDE tests have long term maintainability issues:
            mixing locators, user actions and assertions. This means AUT changes will require
            many of the same fixes to be applied across many tests and files. Using the POM
            separates concerns. The Test asks the POM page to perform actions and return results
            (if necessary), the test then asserts on those results. The test itself does not care
            about the details of /how/ an action is performed. Thats the job of the POM. 

            If the AUT changes, fix the POM (generally) not the test. POM pages can be shared
            across many tests.

            As a side benefit, the test itself becomes much more readable.
        */

        // Test name: AddDeleteCap
        // Step # | name | target | value
        // 1 | open | /demo-site/ | 
        await driver.get("https://www.edgewordstraining.co.uk/demo-site/")
        
        //Check we are on the right page
        let pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "Edgewords Shop – e-commerce demo site for Training", "We are not on the demo shop page")

        await homePage.searchFor(driver, "cap")
        await searchPage.addProductToCart(driver)
        await searchPage.goToCart(driver)

        await cartPage.removeItem(driver)
        await cartPage.goToShop(driver)

        //ToDo: Create a Shop POM page and convert these lines to use it
        // 10 | click | linkText=Home | 
        await myLib.waitForElementVisible(driver, By.xpath("//h1[contains(.,'Shop')]"), 5000 )
        await driver.findElement(By.linkText("Home")).click()

        //And done!
        //Well nearly - lets finish with an assert to check the cart is empty
        let cartText = await homePage.getCartTotalText(driver);
        addContext(this, "Final cart text=" + cartText)
        assert.equal(cartText, "0 items", "Cart is not empty!") //This is a test, so we assert here

    })

    //Second test
    it.skip("always fails if not skipped", async function () {
        this.retries(2);
        await driver.get('http://www.Google.com')
        assert.fail("This will fail")
    })

})

