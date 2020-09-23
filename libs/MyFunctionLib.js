const {By, Key, until} = require('selenium-webdriver');

async function waitForElementVisible(passeddriver, locator, timeout ){
    try {
        let element = await passeddriver.wait(until.elementLocated(locator),timeout)
        await passeddriver.wait(until.elementIsVisible(element),timeout)
        return element

    } catch (error) {
        throw new Error(`Expected ${locator.toString()} to be visible with timout= ${timeout}`)
    } 
}

module.exports.waitForElementVisible = waitForElementVisible;

