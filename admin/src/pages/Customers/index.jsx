import React, { useState } from 'react'
import { Button, Space, Table, Tooltip } from "antd";
import { useParams } from "react-router-dom";

import Swal from "sweetalert2";
import { useDeleteUsersMutation, useGetUsersQuery } from '../../service/userApi';
const Customers = () => {
  const { id } = useParams();
  const { data: users, refetch } = useGetUsersQuery();
  console.log(users)
  const [deleteUser] = useDeleteUsersMutation(id);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };




  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),

    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName)
    },
    {
      title: "Phone Number",
      dataIndex: "mobile",
    },
    {
      title: "Email",
      dataIndex: "email",
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
                confirmButtonText: "Yes, delete it!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  await deleteUser(record._id);
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
            DELETE
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
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={users?.data}
        onChange={handleChange}
      />
    </div>
  )
}

export default Customers