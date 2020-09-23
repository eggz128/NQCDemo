const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver')

var driver = new Builder()
    .forBrowser('chrome')
    .build();


driver.get('https://www.edgewordstraining.co.uk/demo-site');

// Step # | name | target | value
// 1 | open | /demo-site/ | 
driver.get("https://www.edgewordstraining.co.uk/demo-site/")
// 2 | setWindowSize | 1022x887 | 
driver.manage().window().setRect(1022, 887)
// 3 | click | id=woocommerce-product-search-field-0 | 
driver.findElement(By.id("woocommerce-product-search-field-0")).click()
// 4 | type | id=woocommerce-product-search-field-0 | cap
driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys("cap")
// 5 | sendKeys | id=woocommerce-product-search-field-0 | ${KEY_ENTER}
driver.findElement(By.id("woocommerce-product-search-field-0")).sendKeys(Key.ENTER)
// 6 | click | name=add-to-cart | 
driver.findElement(By.name("add-to-cart")).click()
// 7 | click | linkText=View cart | 
driver.findElement(By.linkText("View cart")).click()
// 8 | click | linkText=× | 
driver.findElement(By.linkText("×")).click()
// 9 | click | linkText=Return to shop | 
driver.findElement(By.linkText("Return to shop")).click()



driver.findElement(By.linkText("×")).get