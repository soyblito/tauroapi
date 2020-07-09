const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: String,
    createDate: { type: Date, default: Date.now },
    modDate: { type: Date, default: Date.now },
    state: Number, 
    description: String,
    description2: String,
    price: Number,
    sizex: Number,
    sizey: Number,
    sizez: Number,
    color: Number,
    size: Number,
    stock: Number,
    cat: {
        type: Schema.ObjectId,
        ref: 'Categories',
    },
    img1: String,
    imgURL1: String,
    img2: String,
    imgURL2: String,
    img3: String,
    imgURL3: String,
    filestl:String,
    imgURL4:String,
    filegcode:String,
    imgURL5:String,
    img_home: String,
    img_featured: String,
    link_mp: String,
    link_ig: String,
});

const model = mongoose.model('Products', mySchema);
module.exports = model;

