const puppeteer = require("puppeteer");
const sessionFactory = require("./factories/sessionFactory")

jest.setTimeout(300000)

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

test("The header has the correct test", async () => {
    const html = await page.$eval(".Header__heading", e => e.innerHTML)
    expect(html).toEqual("Follow your passions. Achieve your dreams.")
})

test("clicking login triggers oauth flow", async () => {
    await page.click(".Header__sign-in-btn--google");
    const url = await page.url();
    expect(url).toMatch(/accounts\.google\.com/)
})

test.only("When signed in, shows ", async () => {
    const id = "5eb4859950a7b63b98256333";

    const {session, sig} = sessionFactory()

    await page.setCookie({name: "express:sess", value: session})
    await page.setCookie({name: "express:sess.sig", value: "uo8YWPSCzC3guU43IUIQVLQDXLo"});

    await page.goto("localhost:3000/logged")
    await page.waitFor("p")

    const message = await page.$eval("p.SideNav__full-name", e => e.innerHTML);
    

    expect(message).toEqual("Laith Harb")
    
})














/*

 const Buffer = require("safe-buffer").Buffer;
    const sessionObject = {
        passport : {
            user: id
        }
    }
    const sessionString = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString("base64");

    const Keygrip = require("keygrip");
    const keygrip = new Keygrip(["My mama called, see you on TV. Said, son, shit dont change, and I dream all, wont be nothing, now all they say is congrats, vacationed so hard forgot to work"])
    const sig = "uo8YWPSCzC3guU43IUIQVLQDXLo"

    */