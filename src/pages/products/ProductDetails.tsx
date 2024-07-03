import { useParams } from "react-router-dom";
import {
  useGetProductCategoriesQuery,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../redux/api/api";
import {
  Button,
  Image,
  Rate,
  Modal,
  Input,
  Select,
  Space,
  Form,
  message,
  Tag,
} from "antd";
import ProductDetailTabs from "./ProductDetailTabs";
import { useState } from "react";
import { TCategory, TProductUpdate, TProducts } from "./Product.interface";
import TextArea from "antd/es/input/TextArea";
import { calculateDiscountedPrice } from "./Product.utils";

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
  const { data: categoriesData } = useGetProductCategoriesQuery(null);
  const [updateProduct, { data: successData }] = useUpdateProductMutation();
  console.log("Final output: ", successData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

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
    images,
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

  const onFinish = (values: TProductUpdate) => {
    const options = {
      id,
      data: values,
    };

    updateProduct(options);
    message.success("Successfully Updated");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between p-10 w-full">
        <div className="flex-1">
          <div className=" text-center ">
            <Image src={thumbnail} style={{ width: "100%", height: "auto" }} />
          </div>
          <div className="grid grid-cols-6 gap-2 p-2">
            {images.map((img) => (
              <Image
                className="border"
                src={img}
                style={{ width: "100px", height: "120px" }}
              />
            ))}
          </div>
        </div>
        <div className="flex-1  space-y-3 text-start  p-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl  font-semibold">
            {title}
          </h2>
          <div className="flex gap-3 text-lg">
            <p className="text-slate-500 font-base">Price: </p>
            <p className="text-2xl text-[#1677ff]">
              ${calculateDiscountedPrice(price, discountPercentage)}
            </p>
            <p className="line-through  text-slate-400">${price}</p>
          </div>
          <p className="">
            <span className="text-slate-500 text-base mr-1">Category:</span>
            <Tag className="text-lg" bordered={false} color="processing">
              {category}
            </Tag>
          </p>
          <p>
            <span className="text-slate-500 text-base mr-2"> Description:</span>
            <span className="text-base ">{description}</span>
          </p>
          <p>
            <Rate allowHalf defaultValue={rating} />
          </p>
          {/* <Button>Update Product</Button> */}

          <div>
            <Button type="primary" onClick={showModal}>
              Update Product
            </Button>
            <Modal
              title="Update Product"
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
                  category,
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
                  rules={[{ required: false, message: "Please input Brand" }]}
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
                  <TextArea style={{ height: 100 }} />
                </Form.Item>
                <Form.Item
                  name="category"
                  label="Category"
                  rules={[{ required: true }]}
                >
                  <Select
                    placeholder="Select a option and change input text above"
                    // onChange={onGenderChange}
                    allowClear
                  >
                    {/* <Option value="male">male</Option>
                    <Option value="female">female</Option>
                    <Option value="other">other</Option> */}
                    {categoriesData?.map((item: TCategory) => (
                      <Option value={item.slug}>{item.name}</Option>
                    ))}
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
