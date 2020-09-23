const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

require('chromedriver');

// Get my function library from one folder up from this file, then down in to "libs" then the file
let myLib = require("../libs/MyFunctionLib.js")

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
    it("waits with a library", async function () {
        /*
            Start using function libraries for repetitive waits
        */

        // Test name: AddDeleteCap
        // Step # | name | target | value
        // 1 | open | /demo-site/ | 
        await driver.get("https://www.edgewordstraining.co.uk/demo-site/")

        //Check we are on the right page
        let pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "Edgewords Shop – e-commerce demo site for Training", "We are not on the demo shop page")

        // 2 | setWindowSize | 1207x1032 | 
        // await driver.manage().window().setRect(1207, 1032)
        // 3 | click | id=woocommerce-product-search-field-0 | 
        await driver.findElement(By.id("woocommerce-product-search-field-0")).click()
        // 4 | type | id=woocommerce-product-search-field-0 | cap
        await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("cap")
        // 5 | sendKeys | id=woocommerce-product-search-field-0 | ${KEY_ENTER}
        await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys(Key.ENTER)
        // 6 | click | name=add-to-cart | 
        await driver.findElement(By.name("add-to-cart")).click()
        // 7 | click | linkText=View cart | 
        await driver.findElement(By.linkText("View cart")).click()
        // 8 | click | linkText=× | 
        await driver.findElement(By.linkText("×")).click() //Becareful: that "×" is not an "x"
        // 9 | click | linkText=Return to shop | 

        //Waits using library
        let returnButton = await myLib.waitForElementVisible(driver, By.linkText("Return to shop"),5000)
        //await myLib.waitForElementVisible(driver, By.linkText("Return to shop"), 5000)
        returnButton.click();
        

        // 10 | click | linkText=Home | 
        await myLib.waitForElementVisible(driver, By.xpath("//h1[contains(.,'Shop')]"), 5000 )
        
        await driver.findElement(By.linkText("Home")).click()

        //And done!
        //Well nearly - lets finish with an assert to check the cart is empty
        let cartText = await driver.findElement(By.css('a.cart-contents span.count')).getText()
        assert.equal(cartText, "0 items", "Cart is not empty!")

    })

    //Second test
    it.skip("always fails if not skipped", async function () {
        this.retries(2);
        await driver.get('http://www.Google.com')
        assert.fail("This will fail")
    })

})

