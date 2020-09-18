const { Builder, By, Key, until } = require('selenium-webdriver')


module.exports = {
    searchbox: By.id("woocommerce-product-search-field-0"),
    shopLink: By.linkText("Shop"),
    searchFor: async function(driver, searchfortext){
        await driver.findElement(this.searchbox).clear();
        await driver.findElement(this.searchbox).sendKeys(searchfortext, Key.ENTER)
    },
    goToShop: async function(driver){
        await driver.findElement(this.shopLink).click();
    }
}