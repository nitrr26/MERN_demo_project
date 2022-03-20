const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const cookies = require('cookie-parser')

router.use(cookies())
const Authenticate = require('../middlewares/Authenticate')


// const cors = require('cors');
// router.use(
//     cors({
//         origin: "http://localhost:5000"
//     })
// )



require('../db/connection')
const User = require('../models/userschema');
// const { application } = require('express');

// router.get('/', (req, res) =>{
//     res.send("hello from router root page")
// });


////promises

// router.post('/register', (req, res) => { 
//     // console.log(name);
//     // console.log(email);
//     // // console.log(req.body)
//     // res.send("testing registration")

//     const { name, email, phone, work, password, cpassword } = req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error: "error"})
//     }
//     User.findOne({email: email}).then((userExist) => {
//         if(userExist){
//             return res.status(422).json({error: "email already exist"});
//         }

//         const user = new User({name, email, phone, work, password, cpassword})

//         user.save().then(() => {
//             res.status(201).json({message: "Registered successfully"});
//         }).catch((err) => res.status(500).json({error: "registration failed.."}));

//     }).catch(err => {console.log(err);})

// });




//async await

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    // console.log(req.body);

    // console.log(name)
    // console.log(email)
    // console.log(work)

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(423).json({ error: "error" })
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "email already exist" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Password missmatch" });
        }
        else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: "Registered successfully" });
        }

        // const userRegister = await user.save();

        // if(userRegister){
        //     res.status(201).json({message: "Registered successfully"});
        // }
        // else{
        //     res.status(500).json({error: "registration failed.."})
        // }


    } catch (err) {
        console.log(err);
    }


});



//login route
router.post('/login', async (req, res) => {
    // console.log(req.body);
    // res.json({message: "done"});

    try {
        let token;

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "All field require.." });
        }

        const userLogin = await User.findOne({ email: email });

        // console.log(userLogin);

        if (userLogin) {
            const isSame = await bcrypt.compare(password, userLogin.password);


            //token
            token = await userLogin.generateAuthToken();
            // console.log(token)

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });


            if (!isSame) {
                res.status(400).json({ message: "invalid credintial" })
            }
            else {
                res.json({ message: "Login successsful" });
            }

        }
        else {
            console.log("email not found");
            res.status(400).json({ message: "go to registration page" });
        }

    } catch (err) {
        console.log(err);
    }

});



//about us

router.get('/about', Authenticate, (req, res) => {
    // console.log("about");
    // console.log(req.rootUser);
    res.send(req.rootUser);

});



// get data
router.get('/getdata', Authenticate, (req, res) => {
    console.log("contact test");
    // console.log(req.rootUser);
    res.send(req.rootUser);

});


//contact data
router.post('/contact', Authenticate, async (req, res) => {
    try {

        const { name, email, message } = req.body;
        console.log(req.body);

        if (!name || !email || !message) {
            console.log(`please fill the complete form `);
            alert('please fill the complete form')
            return res.json({ error: "please fill the complete form " })
        }

        const userContact = await User.findOne({_id:req.userID})

        console.log(userContact);

        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, message);

            await userContact.save();
            res.status(201).json({ message: "contacted.." })
        }


    } catch (err) {
        console.log(err);
    }

});





router.get('/logout', Authenticate, (req, res) => {
    console.log("logout");
    // console.log(req.rootUser);
    res.clearCookie('jwtoken', {path:'/'});
    res.status(200).send("user logout");

});


module.exports = router;