const { Builder, By, Key, until } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

//If the suite/tests were exported from SelIDE you will need to add the line below
require('chromedriver');

//Test suite
describe("My first test suite", function () {

    //this.timeout(0); //Uncomment to disable timeouts
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
    it("is an exported SelIDE test", async function () {
        /*
        Exported from SeleniumIDE, we are likely to run in to synchronisation problems
        particularly if there are any AJAX events (html dynamically inserted in to the page)
        and often just navigating between pages
        */

        // Test name: AddDeleteCap
        // Step # | name | target | value
        // 1 | open | /demo-site/ | 
        await driver.get("https://www.edgewordstraining.co.uk/demo-site/")
        // 2 | setWindowSize | 1207x1032 | 
        await driver.manage().window().setRect(1207, 1032)
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
        await driver.findElement(By.linkText("Return to shop")).click() //Fails around here when timeouts disabled. Sync problem.
        // 10 | click | linkText=Home | 
        await driver.findElement(By.linkText("Home")).click()
    })

    //Second test
    it.skip("always fails if not skipped", async function () {
        this.retries(2);
        await driver.get('http://www.Google.com')
        assert.fail("This will fail")
    })

})

