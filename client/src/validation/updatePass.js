import * as Yup from 'yup'

const updatePass=Yup.object().shape({
    password:Yup.string()
    .min(4, 'Too Short!')
    .max(10, 'Too Long!')
    .required(' Password is Required') ,
    confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords must match') ,
})

export default updatePass;