const puppeteer = require("puppeteer");

jest.setTimeout(30000)

let browser, page

beforeEach(async () => {
    browser = await puppeteer.launch({
        headless: false
    })
    page = await browser.newPage()
    await page.goto("localhost:3000")
})

afterEach(async () => {
    await browser.close()
})

test("Launched correctly", async () => {
    const html = await page.$eval(".Header__heading", e => e.innerHTML)
    expect(html).toEqual("Follow your passions. Achieve your dreams.")
})