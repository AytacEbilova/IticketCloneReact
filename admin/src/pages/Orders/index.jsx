import React, { useState } from 'react'
import { Button, Space, Table, Tooltip } from "antd";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { useDeleteOrderMutation, useGetOrdersQuery } from '../../service/orderApi';
const Orders = () => {
  const { id } = useParams();
  const { data: orders, refetch } = useGetOrdersQuery();
  console.log(orders);
  const [deleteOrders] = useDeleteOrderMutation(id);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});


  const transformedOrders = orders?.data?.flatMap(order => 
    order.tickets.flat().map(ticket => ({
      ...order,
      seat: ticket.seat,
      price: ticket.price,
      key: ticket._id,
    }))
  );


  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",

    },
    {
      title: "Applied Coupon",
      dataIndex: "appliedCoupon",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
    },

    {
      title: "Seat",
      dataIndex: "seat",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            danger
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, cancel it!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await deleteOrders(record._id);
                  refetch();
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                  });
                }
              });
            }}
          >
            Cancel
          </Button>
        );
      },
    },
  ];
  return (
    <div>
       <Space
        style={{
          marginBottom: 16,
        }}
      >
       
      </Space>
      <Table
        columns={columns}
        dataSource={transformedOrders}
      />
    </div>
  )
}

export default Orders