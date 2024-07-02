import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/api";
import { Button, Image, Rate, Modal, Input, Select, Space, Form } from "antd";
import ProductDetailTabs from "./ProductDetailTabs";
import { useState } from "react";
import { TProductUpdate, TProducts } from "./Product.interface";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductDetailsQuery(id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  console.log("data: ", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const {
    thumbnail,
    title,
    description,
    price,
    category,
    discountPercentage,
    stock,
    brand,
    rating,
  }: TProducts = data;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const onGenderChange = (value: string) => {
  //   switch (value) {
  //     case "male":
  //       form.setFieldsValue({ note: "Hi, man!" });
  //       break;
  //     case "female":
  //       form.setFieldsValue({ note: "Hi, lady!" });
  //       break;
  //     case "other":
  //       form.setFieldsValue({ note: "Hi there!" });
  //       break;
  //     default:
  //   }
  // };

  const onFinish = (values: TProductUpdate) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: "Hello world!", gender: "male" });
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between  w-full">
        <div className="flex-1 text-center border">
          <Image src={thumbnail} style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="flex-1 text-start border border-red-400 p-5">
          <h2 className="text-3xl">{title}</h2>
          <p>${price}</p>
          <p>Category: {category}</p>
          <p>{description}</p>
          <p>
            <Rate allowHalf defaultValue={rating} />
          </p>
          {/* <Button>Update Product</Button> */}

          <div>
            <Button type="primary" onClick={showModal}>
              Open Modal
            </Button>
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                initialValues={{
                  title,
                  price,
                  discountPercentage,
                  stock,
                  brand,
                  description,
                }}
                style={{ maxWidth: 600 }}
              >
                <Form.Item
                  name="title"
                  label="Title"
                  rules={[{ required: true, message: "Please input title" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="brand"
                  label="Brand"
                  rules={[{ required: true, message: "Please input Brand" }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[
                    { required: true, message: "Please input new price" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="discountPercentage"
                  label="Discount Percentage"
                  rules={[
                    {
                      required: true,
                      message: "Please input new discountPercentage",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="stock"
                  label="Stock"
                  rules={[
                    {
                      required: true,
                      message: "Please input new stock",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Description"
                  rules={[
                    {
                      required: true,
                      message: "Please input new description",
                    },
                  ]}
                >
                  <TextArea />
                </Form.Item>
                <Form.Item
                  name="gender"
                  label="Gender"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.gender !== currentValues.gender
                  }
                >
                  {({ getFieldValue }) =>
                    getFieldValue("gender") === "other" ? (
                      <Form.Item
                        name="customizeGender"
                        label="Customize Gender"
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    ) : null
                  }
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                      Reset
                    </Button>
                    <Button type="link" htmlType="button" onClick={onFill}>
                      Fill form
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>

      <div>
        <ProductDetailTabs {...data} />
      </div>
    </>
  );
};

export default ProductDetails;
