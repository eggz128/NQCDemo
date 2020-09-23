const { Builder, By, Key, until } = require('selenium-webdriver')
let mylib = require('../libs/MyFunctionLib.js')

module.exports = {
    removeItemButton: By.linkText("×"),
    goToShopButton: By.linkText("Return to shop"),
    removeItem: async function(driver){
        await driver.findElement(this.removeItemButton).click();
    },
    goToShop: async function(driver){
        let element = await mylib.waitForElementVisible(driver, this.goToShopButton, 3000)
        await element.click();
    }
}