// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Add/delete cap', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Add/delete cap', async function() {
    // Test name: Add/delete cap
    // Step # | name | target | value
    // 1 | open | /demo-site/ | 
    await driver.get("https://www.edgewordstraining.co.uk/demo-site/")
    // 2 | setWindowSize | 1022x887 | 
    await driver.manage().window().setRect(1022, 887)
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
    await driver.findElement(By.linkText("×")).click()
    // 9 | click | linkText=Return to shop | 
    await driver.findElement(By.linkText("Return to shop")).click()
  })
})
