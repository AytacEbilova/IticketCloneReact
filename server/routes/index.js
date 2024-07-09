const eventRouter = require('./event.router');
const userRouter = require('./user.router'); 
const loginRouter = require('./login.router'); 
const seatRouter = require('./seat.router');
const hallRouter = require('./hall.router'); 
const couponRouter=require('./coupon.router');
const orderRouter=require('./order.router');
const ticketRouter=require('./ticket.router');
const adminRouter=require('./admin.router');
const router = {
  events: eventRouter,
  users: userRouter,
  login: loginRouter,
  seats: seatRouter,
  halls: hallRouter,
  coupons:couponRouter,
  orders:orderRouter,
  tickets:ticketRouter,
  admin:adminRouter
};


module.exports = router;
