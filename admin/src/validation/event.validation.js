import * as Yup from 'yup'

const eventSchema=Yup.object().shape({
    title:Yup.string().max(30).required(),
    mainImg: Yup.mixed().required('A file is required'),
    secondImg: Yup.mixed().required('A file is required'),
    price: Yup.number().required(),
    description:Yup.string().min(10).max(400).required(),
    sellCount:Yup.number().required(),
    remainCount:Yup.number().required(),
    basketCount:Yup.number().required(),
    createdAt:Yup.date().required() ,
    categoryName:Yup.string().min(2).max(10).required(),
    location:Yup.string().min(2).max(20).required(),
    language:Yup.string().max(20).required()
})

export default eventSchema