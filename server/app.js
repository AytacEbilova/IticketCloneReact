const app=require('./config/main')
const bodyParser = require("body-parser");
const cors = require("cors");

const route=require('./routes/index')

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(route.events);
app.use(route.users);
app.use(route.login);



