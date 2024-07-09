import * as Yup from 'yup';

const eventSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  mainImg: Yup.string().required('Main Image URL is required'),
  secondImg: Yup.string().required('Second Image URL is required'),
  price: Yup.number().required('Price is required'),
  description: Yup.string().required('Description is required'),
  sellCount: Yup.number().required('Sell Count is required'),
  basketCount: Yup.number().required('Basket Count is required'),
  createdAt: Yup.date().required('Created At is required'),
  categoryName: Yup.string().required('Category Name is required'),
  hall: Yup.object().shape({
    location: Yup.string().required('Address is required'),
    contactPhone: Yup.string().required('Contact Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    rows: Yup.number().required('Rows are required'),
    cols: Yup.number().required('Cols are required'),
    seats: Yup.array().of(
      Yup.array().of(
        Yup.object().shape({
          row: Yup.number().required(),
          col: Yup.number().required(),
          type: Yup.string().required(),
          isReserved: Yup.boolean().required(),
        })
      )
    ).required('Seats are required')
  }).nullable(), // Allow null for location when hall is used
  language: Yup.string().required('Language is required'),
  hall: Yup.string().nullable(), // Allow hall to be null when location is used
  detailImg: Yup.string().required('Detail Image is required'),
});

export default eventSchema;

