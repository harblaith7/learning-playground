const Keygrip = require("keygrip");
const Buffer = require("safe-buffer").Buffer;
const keygrip = new Keygrip(["My mama called, see you on TV. Said, son, shit dont change, and I dream all, wont be nothing, now all they say is congrats, vacationed so hard forgot to work"])

module.exports = (user) => {
    
    const sessionObject = {
        passport : {
            user: user._id.toString()
        }
    }
    const session = Buffer.from(
        JSON.stringify(sessionObject)
    ).toString("base64");

    
    
    const sig = keygrip.sign("session=" + session)

    return {session, sig}
}


//"uo8YWPSCzC3guU43IUIQVLQDXLo"