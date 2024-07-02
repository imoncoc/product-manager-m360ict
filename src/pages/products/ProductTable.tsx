import React from "react";
import { useGetProductsQuery } from "../../redux/api/api";

import { Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { StarFilled } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";

interface DataType {
  id: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  availabilityStatus: string;
  price: number;
  rating: number;
}

// const data: DataType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

// const handleViewDetails = (record: DataType) => {
//   // Implement your view details logic here
//   handleNavigate(record.id);
//   console.log("View details for:", record.id);
//   return <NavLink to={`product/${record.id}`}></NavLink>;
// };

const ProductTable = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleViewDetails = (record: DataType) => {
    // Navigate to the product details page
    navigate(`/product/${record.id}`);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Image",
      dataIndex: "thumbnail",
      width: 120,
      render: (text: string) => (
        <img
          src={text}
          alt="product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 220,
    },

    {
      title: "Category",
      dataIndex: "category",
      width: 120,
    },
    {
      title: "Availability Status",
      dataIndex: "availabilityStatus",
      width: 120,
      render: (status: string) => (
        <Tag color={status === "In Stock" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: 120,
      render: (rating: number) => (
        <span>
          <StarFilled style={{ color: "gold" }} /> {rating}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 120,
      render: (price: number) => <span>${price}</span>,
    },
    {
      title: "Action",
      align: "center",
      width: 120,
      render: (_, record) => (
        <Button type="primary" onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const dataSource = data?.products?.map((product: DataType) => ({
    ...product,
    key: product.id, // Assigning key to each row
  }));
  console.log("products", data);
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 500 }}
        key={data?.products?.id}
      />
    </div>
  );
};

export default ProductTable;
