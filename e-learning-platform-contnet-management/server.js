require('dotenv').config()
const express = require('express')
const connectToDB = require('./database/db')
const courseRoutes = require('./routes/course-routes')
const sectionRoutes = require('./routes/section-routes')
const videoRoutes = require('./routes/video-routes')
const examRoutes = require('./routes/exam-routes')
const moderatorRoutes = require('./routes/moderator-router')
const jwt = require('jsonwebtoken')
//const { rateLimit } = require('express-rate-limit');


const app = express()

const PORT = process.env.PORT

connectToDB()

app.use(express.json())

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: "Too many requests from this IP, please try again after 15 minutes."
// });
// app.use(limiter);


const user =
{
    id: "123",
    username: 'John',
    role: 'educator',
}
const accessToken = jwt.sign({

    userId: user.id,
    username: user.username,
    role: user.role

}, process.env.JWT_SECRET_KEY, {
    expiresIn: "1y"
})

app.get('/users', (req, res) => {
    res.json(accessToken);
});
console.log(accessToken);


app.use('/api/course', courseRoutes)
app.use('/api/exam', examRoutes)
app.use('/api/section', sectionRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/moderator', moderatorRoutes)

app.listen(PORT, () => console.log(`app listening on port: ${PORT}!`))