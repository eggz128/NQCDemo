// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('DragAndDropTest', function() {
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
  it('DragAndDropTest', async function() {
    await driver.get("https://www.edgewordstraining.co.uk/training-site/")
    await driver.manage().window().setRect(1022, 745)
    await driver.findElement(By.css(".last span")).click()
    {
      const element = await driver.findElement(By.css(".ui-slider-handle"))
      await driver.actions({ bridge: true }).moveToElement(element).clickAndHold().perform()
    }
    {
      const element = await driver.findElement(By.id("slider"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.id("slider"))
      await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    }
    await driver.findElement(By.css(".ui-slider-handle")).click()
  })
})
