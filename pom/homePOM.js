const { Builder, By, Key, until } = require('selenium-webdriver')


module.exports = {
    searchbox: By.id("woocommerce-product-search-field-0"),
    shopLink: By.linkText("Shop"),
    cartItems: By.css('a.cart-contents span.count'),
    searchFor: async function(driver, searchfortext){
        await driver.findElement(this.searchbox).clear();
        await driver.findElement(this.searchbox).sendKeys(searchfortext, Key.ENTER)
    },
    goToShop: async function(driver){
        await driver.findElement(this.shopLink).click();
    },
    getCartTotalText: async function(driver){
        return await driver.findElement(this.cartItems).getText(); //No assertion here 
    }
}