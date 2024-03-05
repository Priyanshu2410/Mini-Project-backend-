const mongoose = require('mongoose');

const VideoItemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        
        description: { type: String, required: true },
        youtubeLink: { type: String, required: true },
        courseID: { type: String, required: true },
        // coordinatorEmail: { type: String },
        // coordinatorDept: { type: String }  ,
        // coordinatorClg: { type: String }  
    },
    {
        collection: "videoitem",
    }
);

const VideoItem = mongoose.model('videoitem', VideoItemSchema);

module.exports = VideoItem;