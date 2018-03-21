const express = require('express');
const app = express();

const port = 8000;
const bp = require('body-parser');
app.use(bp.json());
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/anonymous')
mongoose.Promise = global.Promise;
app.use(express.static(__dirname + '/anonymous-app/dist'));

var NoteSchema = new mongoose.Schema({
    text: {type: String, required: true, minlength: 3},
}, {timestamps: true});

mongoose.model('Note', NoteSchema);
var Note = mongoose.model('Note')

app.get('/notes', (req,res)=>{
    console.log("getting all data from Notes DB")
    Note.find({}, null, {sort: {createdAt: -1}}, (err, postNotes)=>{
        if(err){
            console.log(err);
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "Sucess", data: postNotes})
        }
    })
})

app.post('/notes', (req,res)=>{
    console.log("got to post")
    var newNote = new Note({text: req.body.text})
    newNote.save((err)=>{
        if(err){
            console.log(newNote.errors)
            res.json({message: "Error", error: err})
        }
        else{
            res.json({message: "data posted successfully to DB"})
        }
    })
})
app.listen(port, ()=>{
    console.log(`We are on port ${port}`);
})