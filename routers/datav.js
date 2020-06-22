const express = require('express')
const router = express.Router()

const Datav_Component = require('../models/datav/datav_Component')
const Customs_Component = require('../models/datav/customs_Component')
const Datav_template = require('../models/datav/datav_template')

router.get('/components', (req, res) => {
    Datav_Component.find((err, result) => {
        res.json(result)
    })
})
    .post('/component', async (req, res) => {
        // console.log(req.body)
        const result = await Datav_Component.insertMany(req.body)
        res.send(result[0])
    })
    .put('/component', async (req, res) => {
        const { _id, ...arr } = req.body
        const result = await Datav_Component.findByIdAndUpdate(_id, arr, { new: true })
        res.send(result)
    })
    .delete('/component', async (req, res) => {
        const { _id } = req.body
        const result = await Datav_Component.deleteOne({ _id })
        res.send(result)
    })

    // 这里是datav大屏模板
    .post('/largeScreen', async (req, res) => {
        const result = await Datav_template.insertMany(req.body)
        res.send(result[0])
    })

    // 获取所有大屏信息
    .get('/largeScreen', async (req, res) => {
        const result = await Datav_template.find()
        res.send(result)
    })

    .get('/largeScreen/:id', async (req, res) => {
        let { id: _id } = req.params
        const result = await Datav_template.find({ _id })
        res.send(result[0])
    })


    // 获取自定义组件
    .get('/ownComponent/:parent_id',async (req,res)=>{
        // 根据大屏id
        let {parent_id} = req.params
        const result = await Customs_Component.find({parent_id})
        res.send(result)
    })

    // 保存自定义组件
    .post('/ownComponent', async (req, res) => {
        // 这里剔除原来的组件id
        let {_id,...obj} = req.body
        const result = await Customs_Component.insertMany(obj)
        res.send(result[0])
    })

    // 修改组件
    .put('/ownComponent',async (req,res)=>{
        const { _id, ...arr } = req.body
        const result = await Customs_Component.findByIdAndUpdate(_id, arr, { new: true })
        res.send(result)
    })

    .delete('/ownComponent', async (req, res) => {
        // 通过传入的id删除
        const result = await Customs_Component.deleteOne(req.body)
        res.send(result)
    })

module.exports = router