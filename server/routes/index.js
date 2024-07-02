const event_router=require('./event.router');
const user_router=require('./user.router');
const login_router=require('./login.router');

const router={
    users:user_router,
    events:event_router,
    login:login_router
}
module.exports=router;