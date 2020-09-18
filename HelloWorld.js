const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');
//require('iedriver');
var chrome = require('selenium-webdriver/chrome')
const chai = require('chai');
const assert = chai.assert;
const fs = require('fs')

//Open a web browser

async function test() {

    let driver = await new Builder().forBrowser('chrome').setChromeOptions(
        new chrome.Options()
            .headless()
            .windowSize({
                width: 1024,
                height: 768
            })
            
    ).build();
    // let driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({
        implicit: 5000
    })
    
    await driver.get("https://www.edgewordstraining.co.uk/demo-site/")
    //await driver.get("https://www.edgewordstraining.co.uk")


    //Have we gone to the correct web page?
    let pageTitle = await driver.getTitle();


    assert.equal(pageTitle, "Edgewords Shop – e-commerce demo site for Training", "We are not on the demo shop page")

    // 2 | setWindowSize | 1207x1032 | 
    //await driver.manage().window().setRect(1207, 1032)
    await driver.manage().window().maximize();
    // 3 | click | id=woocommerce-product-search-field-0 | 
    await driver.findElement(By.id("woocommerce-product-search-field-0")).click()
    // 4 | type | id=woocommerce-product-search-field-0 | cap
    await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("cap")

    let textWeTypedIn = await driver.findElement(By.id("woocommerce-product-search-field-0")).getAttribute('value')



    // 5 | sendKeys | id=woocommerce-product-search-field-0 | ${KEY_ENTER}
    await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys(Key.ENTER)
    // 6 | click | name=add-to-cart | 
    console.log("Waiting...")
    await driver.sleep(5000)

    let base64 = await driver.takeScreenshot();
    let buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync('fullscreenshot.png', buffer);
    
    base64 = await driver.findElement(By.name("add-to-cart")).takeScreenshot()
    buffer = Buffer.from(base64, 'base64');
    fs.writeFileSync('addcart.png', buffer);

    await driver.findElement(By.name("add-to-cart")).click()
    // 7 | click | linkText=View cart | 
    await driver.findElement(By.linkText("View cart")).click()
    // 8 | click | linkText=× | 
    await driver.findElement(By.linkText("×")).click()
    // 9 | click | linkText=Return to shop | 

    //await driver.sleep(10000);

    let returntoshopbutton = await driver.wait(until.elementLocated(By.linkText("Return to shop")), 10000, "Button not there")
    // let buttonVisible = await returntoshopbutton.isDisplayed();
    // assert.isFalse(buttonVisible, "Button should not have been visible");


    await returntoshopbutton.click()
    // 10 | click | linkText=Home | 
    await driver.findElement(By.linkText("Home")).click()

    await driver.close();
    await driver.quit();

}

test();


