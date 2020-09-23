const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver');
const chai = require('chai');
const assert = chai.assert;

//If the suite/tests were exported from SelIDE you will need to add the line below
require('chromedriver');

//Test suite
describe("My first test suite but with wait fixes", function () {

    //this.timeout(0); //Uncomment to disable timeouts, or add it to .mocharc conf file

    //Lets tell VS Code that driver is always of WebDriver type to fix intellisense across scopes
    /** @type {WebDriver} */
    let driver

    //Setup and teardown hooks
    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();

        //Implicit waits are the simplest sync problem fix, but not the best in the long run.
        // driver.manage().setTimeouts({
        //     // pageLoad: 60000, //How long is a page allowed to load for in ms
        //     // script: 20000, //How long is in browser JS allowed to execute for
        //     //implicit: 10000 //If WebDriver can't find an element when asked, how long can it retry for
        // })

        await driver.get("https://www.edgewordstraining.co.uk/demo-site/")


    })

    after(async function () {
        await driver.quit();
    })


    //First test
    it("is an exported SelIDE test", async function () {
        /*
            Fix the sync issues and add some asserts (to actually test!)
        */

        // Test name: AddDeleteCap
        // Step # | name | target | value
        // 1 | open | /demo-site/ | 
        await driver.get("https://www.edgewordstraining.co.uk/demo-site/")

        //Check we are on the right page
        let pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "Edgewords Shop – e-commerce demo site for Training", "We are not on the demo shop page")

        // 2 | setWindowSize | 1207x1032 | 
        //await driver.manage().window().setRect( //Lets not resize
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
        //Wait for the button

        //Explicit unconditional (bad)
        //await driver.sleep(5000) //Always wait full 5 seconds.

        //Explicit conditional wait (better! but we should probably move this in to a generic function in a function library)
        //we are likely to need a lot of waits going forward...
        let returnButton = await driver.wait(until.elementLocated(By.linkText("Return to shop"), 5000, "Error msg: Button not found"))
        returnButton.click();
        //await driver.findElement(By.linkText("Return to shop")).click() //Old line. No need to re-find - if wait works we have the button

        // 10 | click | linkText=Home | 
        // With previous fix next line throws commented error
        //await driver.findElement(By.linkText("Home")).click() //stale element reference: element is not attached to the page document

        /*
            WebDriver clicks the Return to Shop button on line 73. Then WebDriver
            is finding the Home link on the *same page* as Return to Shop button. But by the time
            it tries to click that a new page is loaded, which also has a Home link - but it is a /different/
            home link from the one on the previous page, so it cant use it.
            The previously found WebElement link has gone "stale"

            To fix, after clicking "Return to Shop" we must wait for something on the "new" page that is not on the "old"
        */

        //The new page has a H1 with the text "Shop" in it. Lets wait for that.
        //But this wait is mostly the same as the previous one... it would be better to refactor waits in to a library...
        await driver.wait(until.elementLocated(By.xpath("//h1[contains(.,'Shop')]"), 5000, "Error msg: Didn't make it to Shop page?"))
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

