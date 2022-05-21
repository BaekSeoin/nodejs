const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get("/", (req, res) => {
    res.send("Hello world!!");
});

router.post("/sign-in", (req, res, next) => {
    console.log("REST API Post Method - Member Login And JWT Sign");

    const email = req.body.email;
    const password = req.body.password;

    if (email === "test@test.com" && password === "test") {
        jwt.sign({
            email: email
        },
                process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({success:false, errormessage:'token sign fail'});
                } else {
                    res.json({success:true, accessToken:token});
                }
            }
        )
    } else {
        res.status(401).json({success:false, errormessage:'id and password are not identical'});
    }
})

module.exports = router;