// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')
require('chromedriver')

let homePage = require('../pom/homePOM.js')
let searchPage = require('../pom/searchResultsPOM.js')
let mylib = require('../MYFunctionLib')


describe('Default Suite', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    await driver.manage().setTimeouts({
      implicit: 10000
    })
    await driver.manage().window().maximize();
    await driver.manage().window().setRect({x: 30, y: 30, width:1024, height:768})
    
  })
  afterEach(async function() {
    await driver.close();
    await driver.quit();
  })
  it('SearchAddDeleteCap', async function() {
    // Test name: SearchAddDeleteCap
    // Step # | name | target | value
    // 1 | open | /demo-site/ | 
    await driver.get("https://www.edgewordstraining.co.uk/demo-site/")
    // 2 | click | id=woocommerce-product-search-field-0 | 
    // await driver.findElement(By.id("woocommerce-product-search-field-0")).click()
    // // 3 | type | id=woocommerce-product-search-field-0 | cap
    // await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("cap")
    // // 4 | sendKeys | id=woocommerce-product-search-field-0 | ${KEY_ENTER}
    // await driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys(Key.ENTER)

    await homePage.searchFor(driver, "cap")
    await searchPage.addProductToCart(driver);
    await searchPage.goToCart(driver);
    // 5 | click | name=add-to-cart | 
    //await driver.findElement(By.name("add-to-cart")).click()
    // 6 | click | linkText=View cart | 
    //await driver.findElement(By.linkText("View cart")).click()
    // 7 | click | linkText=× | 
    await driver.findElement(By.linkText("×")).click()
    // 8 | click | linkText=Return to shop | 

    //mylib.waitForElementVisible(driver, By.partialLinkText("Return to shop"), 5000)

    await driver.findElement(By.partialLinkText("Return to shop")).click()
    // 9 | click | linkText=Home | 
    await driver.findElement(By.linkText("Home")).click()
  })
  it('NavigateAddDeleteCap', async function() {
    // Step # | name | target | value
    // 1 | open | /demo-site/ | 
    await driver.get("https://www.edgewordstraining.co.uk/demo-site/")
    // 2 | click | linkText=Shop | 
    // await driver.findElement(By.linkText("Shop")).click()
    await homePage.goToShop(driver);

    // 3 | click | css=.post-29 > .button | 
    await driver.findElement(By.css(".post-29 > .button")).click()
    // 4 | click | linkText=View cart | 
    //await driver.findElement(By.linkText("View cart")).click()
    await searchPage.goToCart(driver)
    // 5 | click | linkText=× | 
    await driver.findElement(By.linkText("×")).click()
    // 6 | click | linkText=Return to shop | 
    await driver.findElement(By.linkText("Return to shop")).click()
    // 7 | click | linkText=Home | 
    await driver.findElement(By.linkText("Home")).click()
  })
})


//added
