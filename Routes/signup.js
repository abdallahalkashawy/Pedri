const express = require('express');
const router = express.Router();
const selectcountry = require('./middleware/selectcountry');
//convert string to int we use "parseInt()"

// to equate two types we use "==="

/*
    router.put('/update/:id', (req, res) => {
        res.json({msg: `Update contact ${req.params.id}`}); `});
*/
router.post('/guest/signup', (req, res)=>{
    const country = selectcountry(req.body.country);
    res.send(country);
})
module.exports = router;
