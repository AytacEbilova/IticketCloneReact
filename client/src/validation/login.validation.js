import * as Yup from 'yup'


const loginValidation=Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Email is required'),
    password:Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Password is required')
})

export default loginValidation