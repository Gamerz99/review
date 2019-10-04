const express = require('express');
const router = express.Router();
const category = require('../models/category');
const joi = require('joi');
const verify = require('../verify');

const CategorySchema = joi.object().keys({
    description: joi.string(),
    name: joi.string().required(),
})


/* GET users listing. */
router.get('/', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await category.find({});
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
        const data = await category.findOne({ _id: req.params.id });
        if (!data) {
            res.status(404).json({ message: "Not Found" });
            return
        }

        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

//POST users
router.post('/', async (req, res, next) => {
    try {
        const result = joi.validate(req.body, CategorySchema);
        if (result.error) {
            res.status(404).json({ message: 'Data is not valid' });
            return
        }

        const cate = await new category(result.value)
        const out = await cate.save();
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
        const result = joi.validate(req.body, CategorySchema);
        if (result.error) {
            res.status(404).json({ message: 'Data is not valid' })
            return
        }

        const cate = await category.findOne({ _id: req.params.id });
        if (!cate) {
            res.status(404).json({ message: "Invalid User" })
            return
        }

        cate.name = result.value.name;
        cate.description = result.value.description;

        const update = await cate.save();
        if (!update) {
            res.status(404).json({ message: "Not Success" })
            return
        }

        const data = await category.findOne({ _id: req.params.id });
        if (!data) {
            res.status(404).json({ message: "Not Found" })
            return
        }

        res.status(200).json({ message: "success", data: data })

    } catch (error) {
        next(error);
    }
})

//DELETE channel
router.delete('/:id', verify.ensureToken, async (req, res, next) => {
    try {
        const del = await category.findByIdAndRemove({ _id: req.params.id });
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