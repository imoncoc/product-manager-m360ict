import React, { useEffect, useState } from "react";
import { useGetProductsQuery } from "../../redux/api/api";

import { Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { SorterResult } from "antd/es/table/interface";
import type { GetProp, TableProps } from "antd";

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

type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const ProductTable = () => {
  const [limit, setLimit] = useState(10); // Items per page
  const [skip, setSkip] = useState(0); // Offset for items

  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetProductsQuery({
    limit,
    skip,
  });

  console.log({ limit, skip });

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: limit,
    },
  });

  useEffect(() => {
    if (data) {
      setTableParams((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          total: data.total, // Assuming your API returns the total number of items
        },
      }));
    }
  }, [data]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const newSkip = (pagination.current - 1) * pagination.pageSize;
    setSkip(newSkip);
    setLimit(pagination.pageSize);

    setTableParams((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleViewDetails = (record: DataType) => {
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          ...tableParams.pagination,
          showSizeChanger: true,
        }}
        onChange={handleTableChange}
        scroll={{ y: 500 }}
      />
    </div>
  );
};

export default ProductTable;
