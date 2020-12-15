const mongoose = require('mongoose')
const express = require('express')
const app = express()
require('dotenv').config();

app.use(express.urlencoded({extended: false}))
const BlogPost = require('./models/blog.js')

//connect to database
mongoose.connect(`mongodb://localhost/mongooseAssociation`)

const db = mongoose.connection;

db.once('open', () => {
    console.log(`connected to mongoDB${db.host}${db.port}`)
})

db.on('error', (err) => {
    console.log(`Error`), err
})

app.get("/", (req, res) => {
    res.send('hello from here!')
})

app.get('/blog', (req, res) => {
    //one way to create a post
    BlogPost.create({
        title: 'Mongoose for all Mongeese',
        body: 'This is a cool blog post.'
    });
    //another way to create a post
    const post1 = new BlogPost({
        title: 'SEI 1019',
        body: 'This is the 1019 cohort post.'
    })
    post1.save();
    console.log('posts created')
    res.send('post created')
})

app.get('/comment', (req, res) => {
    const post2 = new BlogPost({
        title: 'Cool post',
        body: 'Lets make a cool post'
    })
    //create a comments
    const myComment = {header: 'Cool', content: 'a cool post dude'}
    post2.comments.push(myComment)

    //save post to db
    post2.save();
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server on')
})