const express = require('express')
const router = express.Router()

const Datav_Component = require('../models/datav/Datav_Component')

router.get('/components',(req,res)=>{
    Datav_Component.find((err, result) => {
        res.json(result)
    })
})
    .post('/component',async (req,res)=>{
        console.log(req.body)
        const result = await Datav_Component.insertMany(req.body)
        res.send(result[0])
    })
    .put('/component',async (req,res)=>{
        const { _id, ...arr } = req.body
        const result = await Datav_Component.findByIdAndUpdate(_id, arr, { new: true })
        res.send(result)
    })
    .delete('/component', async (req, res) => {
        const { _id } = req.body
        const result = await Datav_Component.deleteOne({ _id })
        res.send(result)
    })

module.exports = router