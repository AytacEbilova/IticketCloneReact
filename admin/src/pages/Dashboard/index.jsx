import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PieChartComponent from './PieChartComponent';
import EventSalesColumnChart from './EventSalesColumnChart';
import BasketChart from './BasketChart';

const Dashboard = () => {
  const [eventSalesData, setEventSalesData] = useState([]);
  const [couponUsageData, setCouponUsageData] = useState([]);
  const [eventSalesColumnData, setEventSalesColumnData] = useState([]);
  const [basketData, setBasketData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3000/orders'); 
      const data = response.data.data;

   
      const eventNames = {
        "668696af6785100ea445ca31": "QUALITY FEST",
        "6686982c6785100ea445cd5c": "RÖYA",
        "668699526785100ea445d221": "Ricky Martin",
        "66869bd86785100ea445f048": "Cat's house",
        "66869c6d6785100ea445f5a1": "Adamın adamı",
        "66869e4d6785100ea4460b42": "Letter from a stranger woman",
        "66869ef56785100ea44612f3": "Kikido Show",
        "6686a5236785100ea446429c": "Rio-musical for children",
        "6686a5de6785100ea446504a": "Три кота: С Новым годом",
        "6686a6746785100ea4465a53": "«МУЛЬТИ ЁЛКИ» Музыкальное интерактивное шоу для всей семьи!"
      };

    
      const eventDetails = {
        "668696af6785100ea445ca31": { name: "QUALITY FEST", totalSeats: 120, soldSeats: 40, basketCount: 30 },
        "6686982c6785100ea445cd5c": { name: "RÖYA", totalSeats: 168, soldSeats: 100, basketCount: 50 },
        "668699526785100ea445d221": { name: "Ricky Martin", totalSeats: 144, soldSeats: 80, basketCount: 60 },
        "66869bd86785100ea445f048": { name: "Cat's house", totalSeats: 100, soldSeats: 50, basketCount: 20 },
        "66869c6d6785100ea445f5a1": { name: "Adamın adamı", totalSeats: 100, soldSeats: 30, basketCount: 15 },
        "66869e4d6785100ea4460b42": { name: "Letter from a stranger woman", totalSeats: 100, soldSeats: 45, basketCount: 25 },
        "66869ef56785100ea44612f3": { name: "Kikido Show", totalSeats: 100, soldSeats: 25, basketCount: 10 },
        "6686a5236785100ea446429c": { name: "Rio-musical for children", totalSeats: 100, soldSeats: 60, basketCount: 30 },
        "6686a5de6785100ea446504a": { name: "Три кота: С Новым годом", totalSeats: 100, soldSeats: 50, basketCount: 25 },
        "6686a6746785100ea4465a53": { name: "«МУЛЬТИ ЁЛКИ» Музыкальное интерактивное шоу для всей семьи!", totalSeats: 100, soldSeats: 70, basketCount: 35 }
      };

     
      data.forEach(order => {
        order.tickets.flat().forEach(ticket => {
          const eventId = ticket.eventId[0];
          if (eventDetails[eventId]) {
            eventDetails[eventId].soldSeats += 1;
          }
        });
      });


      const couponUsageAggregated = data.reduce((acc, order) => {
        const coupon = order.appliedCoupon || 'No Coupon';
        if (!acc[coupon]) {
          acc[coupon] = { name: coupon, value: 0 };
        }
        acc[coupon].value += 1;
        return acc;
      }, {});

    
      const eventSalesColumnData = Object.values(eventDetails).map(event => ({
        name: event.name,
        soldPercentage: (event.soldSeats / event.totalSeats) * 100
      }));

 
      const eventSalesData = Object.keys(eventDetails).map(eventId => ({
        name: eventDetails[eventId].name,
        value: eventDetails[eventId].soldSeats
      }));

   
      const basketData = Object.keys(eventDetails).map(eventId => ({
        name: eventDetails[eventId].name,
        basketCount: eventDetails[eventId].basketCount
      }));

   
      setEventSalesData(eventSalesData);
      setCouponUsageData(Object.values(couponUsageAggregated));
      setEventSalesColumnData(eventSalesColumnData);
      setBasketData(basketData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <PieChartComponent title="Event Sales" data={eventSalesData} />
      <BasketChart data={basketData} />
      <PieChartComponent title="Coupon Usage" data={couponUsageData} />
      <EventSalesColumnChart data={eventSalesColumnData} />
    </div>
  );
};

export default Dashboard;
