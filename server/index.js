require('dotenv').config();
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const {authentication} = require('./utils/jwt')
const passport = require('./utils/passport.config')
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const SubRoutes = require('./routes/subscription.routes')
const AdrressRoutes = require('./routes/userAddress.routes')
const FoodItemRoutes = require('./routes/foodItems.routes')
const MealTypeRoutes = require('./routes/mealType.routes')
const PhoneRoutes = require('./routes/phone.routes')
const app = express();
var morgan = require('morgan')
const port = 5001


app.use(morgan('dev'))
const corsOptions = {
    origin: [
      `${process.env.CLIENT_URL}`,
      `${process.env.REACT_APP_BACKEND_SERVER_URL}`,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRoutes);
app.use(authentication);

app.use('/api',userRoutes);
app.use('/sub',SubRoutes);
app.use('/adrress',AdrressRoutes)
app.use('/foodItem',FoodItemRoutes)
app.use('/mealType',MealTypeRoutes)
app.use('/phone', PhoneRoutes)


app.listen(port, () => {
    console.log("Server is Running on port " + port)
})