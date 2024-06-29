import React from 'react'
import { useGetEventsQuery, useGetOneEventQuery } from '../../services/redux/eventApi'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const Detail = () => {
    const {id}=useParams()
    const{data:event}=useGetOneEventQuery(id);
    console.log(event)
    const navigate=useNavigate();
  return (
    <div>
     {event && (
      <Card sx={{ maxWidth: 345  }}>
      <CardMedia
        sx={{ height: 240 }}
        image={event?.data.secondImg}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event?.data.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.data.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"  onClick={() => navigate(-1)}>Go Back</Button>
      </CardActions>
    </Card>
     )}
    </div>
  )
}

export default Detail