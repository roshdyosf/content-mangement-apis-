require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const courseRoutes = require("./routes/course-routes");
const sectionRoutes = require("./routes/section-routes");
const videoRoutes = require("./routes/video-routes");
const examRoutes = require("./routes/exam-routes");
const moderatorRoutes = require("./routes/moderator-router");
const {errorHandler} = require("./middleware/errorHandler");
//const { rateLimit } = require('express-rate-limit');

const app = express();

const PORT = process.env.PORT;

connectToDB();

app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
app.use("/api/v1/cms/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Uncomment the following lines to enable rate limiting

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: "Too many requests from this IP, please try again after 15 minutes."
// });
// app.use(limiter);

// const user =
// {
//     id: "123",
//     username: 'John',
//     role: 'educator',
// }
// const accessToken = jwt.sign({

//     userId: user.id,
//     username: user.username,
//     role: user.role

// }, process.env.JWT_SECRET_KEY, {
//     expiresIn: "1y"
// })

// app.get('/users', (req, res) => {
//     res.json(accessToken);
// });
// console.log(accessToken);

//cms
app.use("/api/v1/cms/course", courseRoutes);
app.use("/api/v1/cms/exam", examRoutes);
app.use("/api/v1/cms/section", sectionRoutes);
app.use("/api/v1/cms/video", videoRoutes);
app.use("/api/v1/cms/moderator", moderatorRoutes);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`app listening on port: ${PORT}!`)
);
