const express = require('express');
const router = express.Router();
const users = require('../models/users');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const verify = require('../verify');

const UserSchema = joi.object().keys({
    email: joi.string().email().required(),
    name: joi.string().required(),
    password: joi.string()
})

const LoginSchema = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required()
})

/* GET users listing. */
router.get('/', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await users.find({});
        if (!data) {
            res.status(500).json({ message: "Not Found" });
            return
        }

        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }

});

//GET users by id
router.get('/:id', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await users.findOne({ _id: req.params.id });
        if (!data) {
            res.status(404).json({ message: "Not Found" });
            return
        }

        delete data.password;
        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

//Login users
router.post('/login', async (req, res, next) => {
    try {
        const result = joi.validate(req.body, LoginSchema);
        if (result.error) {
            res.status(404).json({ message: 'Data is not valid' })
            return
        }

        const login = await users.findOne({ email: result.value.email });
        if (!login) {
            res.status(404).json({ message: "Invalid User" })
            return
        }

        const valid = await users.comparePasswords(result.value.password, login.password);
        if (!valid) {
            res.status(404).json({ message: "Invalid Password" })
            return
        }

        res.status(200).send({ message: "success", userdata: login })

    } catch (error) {
        next(error);
    }

});


//POST users
router.post('/', async (req, res, next) => {
    try {
        const result = joi.validate(req.body, UserSchema);
        if (result.error) {
            res.status(404).json({ message: 'Data is not valid' });
            return
        }

        const email = await users.findOne({ email: result.value.email });
        if (email) {
            res.status(404).json({ message: "Already exist" });
            return
        }

        const hash = await users.hashPassword(result.value.password);

        result.value.password = hash;
        result.value.status = true;

        const user = await new users(result.value)
        const out = await user.save();
        if (!out) {
            res.status(500).json({ message: "Registration fail" })
            return
        }

        res.status(200).send({ message: "success" })

    } catch (error) {
        next(error);
    }

});

//UPDATE users
router.put('/:id', verify.ensureToken, async (req, res, next) => {
    try {
        const result = joi.validate(req.body, UserSchema);
        if (result.error) {
            res.status(404).json({ message: 'Data is not valid' })
            return
        }

        const user = await users.findOne({ _id: req.params.id });
        if (!user) {
            res.status(404).json({ message: "Invalid User" })
            return
        }

        if (user.email != result.value.email) {
            res.status(404).json({ message: "Email can't change" })
            return
        }

        if (result.value.password != 1111) {
            const hash = await users.hashPassword(result.value.password)
            user.password = hash;
        }
        user.name = result.value.name;
        user.email = result.value.email;


        const update = await user.save();
        if (!update) {
            res.status(404).json({ message: "Not Success" })
            return
        }

        const data = await users.findOne({ _id: req.params.id });
        if (!data) {
            res.status(404).json({ message: "Not Found" })
            return
        }

        delete data.password;
        res.status(200).json({ message: "success", data: data })

    } catch (error) {
        next(error);
    }
})

//DELETE channel
router.delete('/:id', verify.ensureToken, async (req, res, next) => {
    try {
        const del = await users.findByIdAndRemove({ _id: req.params.id });
        if (!del) {
            res.status(404).json({ message: "Not Success" })
            return
        }

        res.status(200).json({ message: "success" })
    } catch (error) {
        next(error);
    }
})


module.exports = router;