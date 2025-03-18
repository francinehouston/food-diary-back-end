const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
const axios = require('axios');


app.use(cors({origin:process.env.CLIENT_URL || "http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(logger('dev'));

const authRouter = require('./controllers/auth');
const testJwtRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const foodDiaryRouter = require("./controllers/foodDiary");
const foodItemsRouter = require("./controllers/foodItems");
const nutritionGoalsRouter = require("./controllers/nutritionGoals");
const remindersRouter = require("./controllers/reminders");
const weightTrackingRouter = require("./controllers/weightTracking");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});



// Routes go here
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);
app.use('/users', usersRouter);
app.use("/food-diary", foodDiaryRouter);
app.use("/food-items", foodItemsRouter);
app.use("/nutrition-goals", nutritionGoalsRouter);
app.use("/reminders", remindersRouter);
app.use("/weight-tracking", weightTrackingRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})