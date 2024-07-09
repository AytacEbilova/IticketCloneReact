const app=require('./config/main')
const bodyParser = require("body-parser");
const cors = require("cors");

const route=require('./routes/index')

const allowedOrigins = ['http://localhost:5173'];

app.use(cors(
  // origin: function (origin, callback) {
  //   if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      
  //     callback(null, true);
  //   } else {
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
  // credentials: true
));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(route.events);
app.use(route.users);
app.use(route.login);
app.use(route.halls);
app.use(route.coupons);
app.use(route.tickets);
app.use(route.orders);
app.use(route.admin);