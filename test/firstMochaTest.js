const {Builder, By, Key, until} = require('selenium-webdriver');
require('geckodriver');
require('chromedriver');
require('iedriver');

const chai = require('chai');
const assert = chai.assert;
const addContext = require('mochawesome/addContext')

let mylib = require('../MYFunctionLib.js')

let browser = process.env.BROWSER
if(!browser){
    console.log("WARNING: Browser env not set or empty. Setting to Chrome by default")
    browser = "chrome"
}else{
    browser = browser.trim() //remove whitespace if set in single command line
}






//Test suite
describe("My first test suite", function(){

    //this.timeout(0);
    let driver

    //Setup and teardown hooks
    before(async function(){
        driver = await new Builder().forBrowser(browser).build();
        await driver.get("https://www.edgewordstraining.co.uk/demo-site/")
        
        addContext(this, "Browser is " + browser)

    })

    after(async function(){
        await driver.quit();
        addContext(this, "browser gone")
        
    })


    //First test
    it("Our first test", async function(){

        addContext(this, "http://www.edgewordstraining.co.uk/training-site/images/site_logo.gif")
        addContext(this, "Checking we are on the right page")
        let pageTitle = await driver.getTitle();
        assert.equal(pageTitle, "Edgewords Shop – e-commerce demo site for Training", "We are not on the demo shop page")

        // 2 | setWindowSize | 1207x1032 | 
        //await driver.manage().window().setRect(1207, 1032)
        // 3 | click | id=woocommerce-product-search-field-0 | 
        await driver.findElement(By.id("woocommerce-product-search-field-0")).click()
        // 4 | type | id=woocommerce-product-search-field-0 | cap
        await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("cap", Key.ENTER)
        
        await driver.findElement(By.css("button[name='add-to-cart']")).click()

        await driver.findElement(By.css('div.woocommerce-message a[href*=cart]')).click()

        await driver.findElement(By.linkText("×")).click();

        //probably need a wait
        // let returnButton = await driver.wait(until.elementLocated(By.partialLinkText("Return to shop")),6000,"Didnt find button");
        // await returnButton.click();

        let returnButton = await mylib.waitForElementVisible(driver, By.partialLinkText("Return to shop"), 2000);
        returnButton.click()
        //await driver.findElement(By.partialLinkText("Return to shop")).click();

        //probably need a wait to ensure we are on the next page
        //await driver.wait(until.elementLocated(By.xpath("//h1[contains(.,'Shop')]")),7000,"Not on the right page?")
        await mylib.waitForElementVisible(driver, By.xpath("//h1[contains(.,'Shop')]"), 3000)

        await driver.findElement(By.xpath("(//a[contains(.,'Home')])[1]")).click()
        
    })

    //Second test
    it.skip("Our second test", async function(){
        this.retries(2);
        await driver.get('http://www.Google.com')

        assert.fail("This will fail")

    })

    //ES6 Mocha Snippets
    //Type fit for intellisense...




})

