const mongoose = require('mongoose')
const { Schema } = mongoose

// 新冠状病毒信息model
const ncovSchema = Schema({
    date: Date,    //发布日期
    newslist: [
        {
            news: [
                {
                    id: Number, // 新闻id
                    pubDate: Date,    // 发布时间
                    title: String,  // 标题
                    summary: String,    // 详情
                    infoSource: String,     // 新闻来源
                    sourceUrl: String,  // 新闻图片地址
                    provinceId: Number, // 省份
                    provinceName: String,   // 省份名称
                    createTime: Date, // 新闻发布日期
                    modifyTime: Date,  // 新闻修改日期
                    entryWay: Number,   // ?
                    adoptType: Number,  // ?
                    infoType: Number,   // ?
                    dataInfoState: Number,  //?
                    dataInfoOperator: String,   //?
                    dataInfoTime: Date  // ?
                }
            ],
            desc: {
                id: Number,  //id
                createTime: Date,   // 数据日期
                modifyTime: Date,   // 修改日期
                summary: String,    // 描述
                deleted: Boolean,   // 已删除
                countRemark: String,    // 数据标记？
                currentConfirmedCount: Number,    // 国内现有确证人数
                confirmedCount: Number, // 国内累计确证人数
                suspectedCount: Number, // 国内现存疑似人数
                curedCount: Number, // 国内累计治愈人数
                deadCount: Number,  // 国内累计死亡人数
                seriousCount: Number,   // 国内现存重症人数
                suspectedIncr: Number,  // 国内新增疑似人数
                currentConfirmedIncr: Number, // 相比昨日现存确证人数
                confirmedIncr: Number,  // 相比昨天累计确诊人数
                curedIncr: Number,  // 相比昨天新增治愈人数
                deadIncr: Number,   // 相比昨天新增死亡人数
                seriousIncr: Number,    // 相比昨天现存重症人数
                remark1: String,    // 相关信息1
                remark2: String,    // 相关信息2
                remark3: String,    // 相关信息3
                remark4: String,    // 相关信息4
                remark5: String,    // 相关信息5
                note1: String,  // 相关记录1
                note2: String,  // 相关记录2
                note3: String,  // 相关记录3
                generalRemark: String,  // 一般记录
                abroadRemark: String,   //国外记录
                foreignStatistics: {
                    currentConfirmedCount: Number,    //现存确诊人数
                    confirmedCount: Number,   // 累计确诊人数
                    suspectedCount: Number,   // 现存疑似人数
                    curedCount: Number,   // 累计治愈人数
                    deadCount: Number,    // 	累计死亡人数
                    suspectedIncr: Number,    // 新增疑似人数
                    currentConfirmedIncr: Number, // 相比昨天现存确诊人数
                    confirmedIncr: Number,    // 相比昨天累计确诊人数
                    curedIncr: Number,    // 相比昨天新增治愈人数
                    deadIncr: Number  // 相比昨天新增死亡人数
                },
                globalStatistics: {
                    currentConfirmedCount: Number,    // 现存确诊人数
                    confirmedCount: Number,   // 	累计确诊人数
                    curedCount: Number,   // 累计治愈人数
                    deadCount: Number,    //累计死亡人数
                    currentConfirmedIncr: Number, // 	相比昨天现存确诊人数
                    confirmedIncr: Number,    // 相比昨天累计确诊人数
                    curedIncr: Number,    // 	相比昨天新增治愈人数
                    deadIncr: Number  // 相比昨天新增死亡人数
                }
            }
        }
    ]
});

const Ncov = mongoose.model('nCoV-EMC_data', ncovSchema)

module.exports = Ncov