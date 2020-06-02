const express = require("express")
const router = express.Router();
const gravatar = require("gravatar")
const {check, validationResult} = require("express-validator")
const bcrypt = require("bcryptjs")

const User = require("../model/User");

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post("/", [
    check("name", "Name is required")
        .not()
        .isEmpty(),
    check("email", "Please include a valid email")
        .isEmail(),
    check("password", "Please enter a password with 6 or more characters")
        .isLength({min: 6})
    ], 
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.array()})
        }

        const {name, email, password} = req.body;

        try {

            // CHECK IF USER EXISTS
            let user = await User.findOne({email})
            if(user) {
                res.status(400).json({
                    errors: [
                       { msg: "User already exists"}
                    ]
                })
            }

            // GET USER GRAVATAR
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            })

            // Creates new instance of a user
            user = new User({
                name, 
                email,
                avatar,
                password
            })

            const salt = await bcrypt.genSalt(10)

            user.password = await bcrypt.hash(password, salt);

            await user.save()

        } catch(err) {
            console.error(err.message);
            res.status(500).send("sever error")
        }

    // See if user exists 

    // Get users gravatar 

    // Encrypt password 

    // Return jsonwebtoken
    res.send("User route")
})


module.exports = router