const express = require("express");
const router = express.Router();

// Item Models
const Item = require("../../models/Items");

// @route  GET api/items
// @desc   Get All Items
// @access Public
// already starting at /items/api
router.get("/", (req, res) => {
    //?
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

// @route  POST api/items
// @desc   Post an Item
// @access Public
// already starting at /items/api
router.post("/", (req, res) => {
    //? only name is required based on how Schema was designed
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

// @route  DELETE api/items/:id
// @desc   Deleta an Item
// @access Public
// already starting at /items/api
router.delete("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
