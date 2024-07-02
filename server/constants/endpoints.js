
const endpoints={
    users:{
        getAll:"/users",
        getOne:"/users/:id",
        delete:"/users/:id",
        post:"/users",
        update:"/users/:id",
        verify:'/verify/:token',
        update:'/update-pass/:id/:token'
    },
    login:{
        getAll:"/login",
        post:"/login",
     
    },
    events:{
        getAll:"/events",
        getOne:"/events/:id",
        delete:"/events/:id",
        post:"/events",
        update:"/events/:id",
    },
    tickets:{
        getAll:"/tickets",
        getOne:"/tickets/:id",
        delete:"/tickets/:id",
        post:"/tickets",
        update:"/tickets/:id",
    }

}

module.exports=endpoints;

