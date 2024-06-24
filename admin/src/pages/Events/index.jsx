import React, { useState } from "react";
import { Button, Space, Table, Tooltip } from "antd";
import { useParams } from "react-router-dom";
import {
  useDeleteEventsMutation,
  useGetEventsQuery,
} from "../../service/eventApi";
import Swal from "sweetalert2";

const Events = () => {
  const { id } = useParams();
  const { data: events, refetch } = useGetEventsQuery();
  const [deleteEvent] = useDeleteEventsMutation(id);

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
      title: "Image",
      dataIndex: "mainImg",
      render: (text, record) => {
        return (
          <img src={record.mainImg} alt={text} width={100} height={100} />
        );
      },
    },
    {
      title: "Image",
      dataIndex: "secondImg",
      render: (text, record) => {
        return (
          <img src={record.secondImg} alt={text} width={100} height={100} />
        );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.title.toLocaleCompare(b.title),
      sortOrder: sortedInfo.columnKey === "title" ? sortedInfo.order : null,
      ellipsis: true,
      render: (element) => (
        <Tooltip title={element}>
          <span>{element.slice(0, 50)}...</span>
        </Tooltip>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category name",
      dataIndex: "categoryName",
    },
    {
      title: "sellCount",
      dataIndex: "sellCount",
    },
    {
      title: "Remain Count",
      dataIndex: "remainCount",
    },
    {
      title: "Basket Count",
      dataIndex: "basketCount",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    // {
    //   title: 'Language',
    //   dataIndex: 'language',
    // },
    {
      title: "Description",
      dataIndex: "description",
      render: (element) => (
        <Tooltip title={element}>
          <span>{element.slice(0, 50)}...</span>
        </Tooltip>
      ),
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
                  await deleteEvent(record._id);
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
        dataSource={events?.data}
        onChange={handleChange}
      />
    </div>
  );
};

export default Events;
