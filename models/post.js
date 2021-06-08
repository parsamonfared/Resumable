/* Restaurant and Reservation Models */
// DO NOT CHANGE THIS FILE

const mongoose = require('mongoose');


const HighlightSchema = new mongoose.Schema({

    content: {
        text: String,
        image: String,
    },
    title: {
        text: String
    },
    highlight: 
        {
            key: String,
            x: Number,
            y: Number,
            h: Number,
            w: Number
        }
    
});

const HighlightCommentSchema = new mongoose.Schema({
    Username: String, 
    text: String,
    time: String,
    type: String,
    feedback:[HighlightSchema]
});

const CommentSchema = new mongoose.Schema({
    Username: String,
    text: String,
    time: String,
    type: String
 });
 

const postSchema = new mongoose.Schema({
    Username: String,
    title: String,
    subtitle: String,
    date: String,
    file: mongoose.Schema.Types.ObjectId,
    fileUrl: String,
    desc: String,
    likes: Number,
    comments: [CommentSchema | HighlightCommentSchema],
    highlights: [HighlightCommentSchema]
    
});


const Post = mongoose.model('Posts', postSchema);

module.exports = { Post };
