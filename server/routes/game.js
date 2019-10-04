const express = require('express');
const router = express.Router();
const games = require('../models/games');
const verify = require('../verify');
const joi = require('joi');

const GameSchema = joi.object().keys({
    title: joi.string().required(),
    description: joi.string().required(),
    price: joi.string().required(),
    company: joi.string().required(),
    category: joi.string().required(),
    image: joi.string().required(),
    rating: joi.number().required(),
    trending: joi.boolean().required(),
    top: joi.boolean().required(),
    suggestion: joi.boolean().required(),
    downloads: joi.number().required(),
    age: joi.number().required(),
    url: {
        android: joi.string(),
        apple: joi.string()
    },
    user: joi.string().required()
})

/* GET game listing. */
router.get('/', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await games.find({});
        if (!data) {
            res.status(500).json({ message: "Not Found" });
            return
        }
        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

/* GET game search. */
router.get('/search/:title', verify.ensureToken, async (req, res, next) => {
    try {
        const regx = new RegExp(req.params.title.toLowerCase(), "i")
        const data = await games.find({ title: regx });
        if (!data) {
            res.status(500).json({ message: "Not Found" });
            return
        }
        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

/* GET game trending. */
router.get('/trending', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await games.find({ trending: true });
        if (!data) {
            res.status(500).json({ message: "Not Found" });
            return
        }
        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

/* GET game top. */
router.get('/top', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await games.find({ top: true });
        if (!data) {
            res.status(500).json({ message: "Not Found" });
            return
        }
        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

/* GET game suggestion. */
router.get('/suggestion', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await games.find({ suggestion: true });
        if (!data) {
            res.status(500).json({ message: "Not Found" });
            return
        }
        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

//GET game by id
router.get('/:id', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await games.findOne({ _id: req.params.id });
        if (!data) {
            res.status(404).json({ message: "Not Found" });
            return
        }
        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

//GET game by title
router.get('/title/:title', verify.ensureToken, async (req, res, next) => {
    try {
        const data = await games.findOne({ title: req.params.title });
        if (!data) {
            res.status(404).json({ message: "Not Found" });
            return
        }
        res.status(200).json({ message: "success", data: data })
    } catch (error) {
        next(error)
    }
});

//POST game
router.post('/', verify.ensureToken, async (req, res, next) => {
    try {
        const result = joi.validate(req.body, GameSchema);
        if (result.error) {
            res.status(404).json({ message: 'Data is not valid' });
            return
        }

        const title = await games.findOne({ title: result.value.title });
        if (title) {
            res.status(404).json({ message: "Already exist" });
            return
        }

        result.value.status = 'new';

        const game = await new games(result.value)
        const out = await game.save();
        if (!out) {
            res.status(500).json({ message: "Not Success" })
        }

        res.status(200).send({ message: "success" })

    } catch (error) {
        next(error);
    }
});

//UPDATE game
router.put('/:id', verify.ensureToken, async (req, res, next) => {
    try {
        const result = joi.validate(req.body, GameSchema);
        // if (result.error) {
        //     res.status(404).json({ message: 'Data is not valid' })
        //     return
        // }

        const game = await games.findOne({ _id: req.params.id });
        if (!game) {
            res.status(404).json({ message: "Invalid Game" })
            return
        }

        const title = await games.findOne({ title: result.value.title });
        if (title) {
            res.status(404).json({ message: "Already exist" });
            return
        }

        game.title = await result.value.title;
        game.description = await result.value.description;
        game.category = await result.value.category;
        game.image = await result.value.image;
        game.price = await result.value.price;
        game.rating = await result.value.rating;
        game.downloads = await result.value.downloads;
        game.age = await result.value.age;
        game.company = await result.value.company;
        game.url.android = await result.value.url.android;
        game.url.apple = await result.value.url.apple;
        game.trending = await result.value.trending;
        game.top = await result.value.top;
        game.suggestion = await result.value.suggestion;

        const update = await game.save();

        if (!update) {
            res.status(404).json({ message: "Not Success" })
            return
        }

        const data = await games.findOne({ _id: req.params.id });
        if (!data) {
            res.status(404).json({ message: "Not Found" })
            return
        }

        res.status(200).json({ message: "success", data: data })

    } catch (error) {
        next(error);
    }
})

//DELETE game
router.delete('/:id', verify.ensureToken, async (req, res, next) => {
    try {
        const del = await games.findByIdAndRemove({ _id: req.params.id });

        if (!del) {
            res.status(404).json({ message: "Not Found" })
            return
        }

        res.status(200).json({ message: "success" })
    }
    catch (error) {
        next(error);
    }
})

//DELETE channel
router.delete('/:id', verify.ensureToken, async (req, res, next) => {
    try {
        const del = await games.findByIdAndRemove({ _id: req.params.id });
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