import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
router.get('/allPosts', async (req, res) => {

    let response = {
        message: "",
        data: []  
    }

    await Post.find()
    .then(function(Posts) {
        if (Posts.length !== 0) {
            response.message = "success"
            response.data = Posts.sort((a, b) => (a.timestamp > b.timestamp) ? -1 : 1)
        } else {
            response.message = "error"
            response.data = null
        }
    }).catch(err => res.status(403).json( //.send()
        {
            message: "error",
            data: null  
        }
    )) 
    res.json(response)   
})

// TODO 3-(1): create the 2nd API (/api/postDetail)
router.get('/postDetail', async (req, res) => {
    const filter = {
        "postId": req.query.postId
    }

    let response = {
        message: "",
        data: []  
    }

    await Post.find(filter)
    .then(function(Posts) {
        if (Posts.length !== 0) {
            response.message = "success"
            response.data = Posts
        } else {
            response.message = "error"
            response.data = null
        }
    }).catch(err => res.status(403).json( //.send()
        {
            message: "error",
            data: null  
        }
    )) 

    res.json(response)
})

// TODO 4-(1): create the 3rd API (/api/newPost)
router.post('/newPost', async (req, res) => {
    const newPost = new Post(req.body)

    let response = {
        message: ""
    }

    await newPost.save()
    .then(response.message = "success")
    .catch(err => res.status(400).send({
        message: "error",
        post: null
    }))

    res.json(response)

})

// TODO 5-(1): create the 4th API (/api/post)
router.delete('/post', async(req, res) => {
    await Post.deleteMany({
        postId: req.params.postId
    })
    .then(res.json({ message: "success" }))
    .catch(err => res.status(400).json({
        "message": "error",
        "post": null
    }))
})

export default router