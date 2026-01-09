const express = require('express');
const mongoose = require('mongoose');


const menuItemSchema =new mongoose.Schema ({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true,
        default:"$2"
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]

    },
    num_sales:{
        type:Number,
        default:0
    }

})
const itemSchema = mongoose.model('itemSchema',menuItemSchema);

module.exports= itemSchema;

