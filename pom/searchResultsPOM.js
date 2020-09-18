const { Builder, By, Key, until } = require('selenium-webdriver')
let mylib = require('../MYFunctionLib.js')

module.exports = {
    addToCartButton: By.name("add-to-cart"),
    viewCartLink: By.linkText("View cart"),
    addProductToCart: async function(driver){
        await driver.findElement(this.addToCartButton).click();
    },
    goToCart: async function(driver){
        let element = await mylib.waitForElementVisible(driver, this.viewCartLink, 3000)
        await element.click();
    }
}