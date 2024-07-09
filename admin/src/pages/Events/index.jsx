import React, { useState } from "react";
import { Button, Space, Table, Tooltip, Modal, Input, Form } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useDeleteEventsMutation,
  useGetEventsQuery,
  useUpdateEventMutation,
} from "../../service/eventApi";

const Events = () => {
  const { id } = useParams();
  const { data: events, refetch } = useGetEventsQuery();
  const [deleteEvent] = useDeleteEventsMutation(id);
  const [updateEvent] = useUpdateEventMutation();

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

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

  const transformedEvents = events?.data?.map(event => ({
    ...event,
    hallName: event.hall.name,
    hallType: event.hall.seats.flat().map(seat => seat.type).join(", "),
  }));

  const handleEdit = (record) => {
    setCurrentEvent(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
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
        await deleteEvent(id);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleModalOk = async () => {
    await updateEvent({ id: currentEvent._id, payload: currentEvent });
    setIsModalVisible(false);
    Swal.fire({
      title: "Updated!",
      text: "Event updated successfully!",
      icon: "success",
    });
    refetch();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormChange = (changedFields) => {
    setCurrentEvent({ ...currentEvent, ...changedFields });
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
      title: "Date",
      dataIndex: "createdAt",
    },
    {
      title: "Sell Count",
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
      render: (text, record) => record.hall?.location || text,
    },
    {
      title: "Hall Name",
      dataIndex: "hallName",
    },
    {
      title: "Language",
      dataIndex: "language",
    },
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
      title: "Edit",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => handleEdit(record)}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Delete",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#fff' }}>
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
        dataSource={transformedEvents}
        onChange={handleChange}
        style={{ width: '100%' }}
        pagination={{ pageSize: 10 }}
        scroll={{ x: '100%' }}
      />
      <Modal
        title="Edit Event"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        {currentEvent && (
          <Form
            layout="vertical"
            initialValues={currentEvent}
            onValuesChange={(changedValues) => handleFormChange(changedValues)}
          >
            <Form.Item label="Event Title" name="title">
              <Input />
            </Form.Item>
            <Form.Item label="Main Image URL" name="mainImg">
              <Input />
            </Form.Item>
            <Form.Item label="Second Image URL" name="secondImg">
              <Input />
            </Form.Item>
            <Form.Item label="Price" name="price">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Sell Count" name="sellCount">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Basket Count" name="basketCount">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Created At" name="createdAt">
              <Input />
            </Form.Item>
            <Form.Item label="Category Name" name="categoryName">
              <Input />
            </Form.Item>
            <Form.Item label="Language" name="language">
              <Input />
            </Form.Item>
            <Form.Item label="Detail Image URL" name="detailImg">
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Events;
