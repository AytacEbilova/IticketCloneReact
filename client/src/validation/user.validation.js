import * as Yup from 'yup'

const userValidation=Yup.object().shape({
    firstName: Yup.string().min(2).max(30).required(),
    lastName: Yup.string().min(5).max(30).required(),
    mobile: Yup.number().required().integer().positive().typeError("That doesn't look like a phone number"),
    email: Yup.string().email('Invalid email').required('Required'),
    password:Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required') ,
    confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords must match') ,
})

export default userValidation