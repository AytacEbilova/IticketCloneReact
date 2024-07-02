const UserValidations=require('../validations/user.validation')

const user_middleware=(req,res,next)=>{
    const {error}=UserValidations.validate(req.body);
    if(!error){
        next();
    }
    else{
        const{details}=error;
        res.send({
            isValidate:false,
            message:details[0].message
        })
    }
  }

module.exports=user_middleware