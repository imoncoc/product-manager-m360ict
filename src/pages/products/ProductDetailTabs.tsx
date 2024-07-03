import { useState } from "react";
import {
  Button,
  Popconfirm,
  Tabs,
  message,
  Modal,
  Form,
  Input,
  Avatar,
  Rate,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import TabPane from "antd/es/tabs/TabPane";
import type { ConfigProviderProps, PopconfirmProps, FormProps } from "antd";
import { FieldType, TProducts, TReviews } from "./Product.interface";
import { formatDate } from "./Product.utils";

type SizeType = ConfigProviderProps["componentSize"];

const ProductDetailTabs = (data: TProducts) => {
  const {
    dimensions,
    shippingInformation,
    returnPolicy,
    warrantyInformation,
    reviews,
    rating,
  } = data;
  const [reviewArray, setReviewArray] = useState<TReviews[]>(reviews);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, _setSize] = useState<SizeType>("middle");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  const items = [
    { label: "Specification", key: "1" },
    { label: "Reviews", key: "2" },
  ];

  const createHandleConfirm = (reviewDate: string, reviewerEmail: string) => {
    return () => {
      message.success("Deleted review successfully!");
      setReviewArray((prev) =>
        prev.filter(
          (review) =>
            review.date !== reviewDate || review.reviewerEmail !== reviewerEmail
        )
      );
    };
  };

  const cancel: PopconfirmProps["onCancel"] = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const reviewData: TReviews = {
      reviewerName: values.reviewerName,
      reviewerEmail: values.reviewerEmail,
      rating: values.rating,
      comment: values.comment,
      date: new Date().toISOString(),
    };

    setReviewArray((prev) => [...prev, reviewData]);
    message.success("Review added successfully!");
    setIsModalOpen(false);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="my-5 flex justify-center">
      <Tabs className="" defaultActiveKey="1" type="card" size={size}>
        {items.map((item) => (
          <TabPane tab={item.label} key={item.key}>
            {item.key === "1" && (
              <div className="p-3 w-[350px] md:w-[600px] space-y-3 text-base font-medium text-gray-500">
                <div className="flex justify-between pb-2 border-b-2 border-blue-200">
                  <p>Depth</p>
                  <p>{dimensions.depth}</p>
                </div>
                <div className="flex justify-between pb-2 border-b-2 border-blue-200">
                  <p>Height</p>
                  <p>{dimensions.height}</p>
                </div>
                <div className="flex justify-between pb-2 border-b-2 border-blue-200">
                  <p>Width</p>
                  <p>{dimensions.width}</p>
                </div>
                <div className="flex justify-between pb-2 border-b-2 border-blue-200">
                  <p>Shipping Info:</p>
                  <p>{shippingInformation}</p>
                </div>
                <div className="flex justify-between pb-2 border-b-2 border-blue-200">
                  <p>Return Policy:</p>
                  <p>{returnPolicy}</p>
                </div>
                <div className="flex justify-between pb-2 border-b-2 border-blue-200">
                  <p>Warranty Info:</p>
                  <p>{warrantyInformation}</p>
                </div>
              </div>
            )}
            {item.key === "2" && (
              <div className="w-[350px] md:w-[600px]">
                {reviewArray.map((item, ind: number) => (
                  <div key={ind} className="border p-5 mb-5 rounded-md">
                    <div className="flex gap-5">
                      <Avatar size={64} icon={<UserOutlined />} />
                      <div>
                        <p className="text-base font-medium">
                          {item.reviewerName}
                        </p>
                        <p className="text-gray-500">{item.reviewerEmail}</p>
                        <p>
                          <Rate allowHalf disabled defaultValue={rating} />
                        </p>
                      </div>
                    </div>
                    <p className="py-2 text-base text-gray-500">
                      {item.comment}
                    </p>
                    <p className="text-end text-xs text-blue-400">
                      {formatDate(item.date as string)}
                    </p>
                    <Popconfirm
                      title="Delete the task"
                      description="Are you sure to delete this task?"
                      onConfirm={createHandleConfirm(
                        item.date as string,
                        item.reviewerEmail
                      )}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <div className="flex justify-end my-2">
                        <Button type="primary" shape="round" danger>
                          Delete
                        </Button>
                      </div>
                    </Popconfirm>
                  </div>
                ))}
                <div>
                  <div className="flex justify-end">
                    <Button type="primary" onClick={showModal} size="large">
                      Add a new Review
                    </Button>
                  </div>
                  <Modal
                    title="Add a new review"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Confirm"
                    cancelText="Cancel"
                  >
                    <Form
                      form={form}
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      style={{ maxWidth: 600 }}
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                    >
                      <Form.Item<FieldType>
                        label="Name"
                        name="reviewerName"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Name!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Email"
                        name="reviewerEmail"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Email!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item<FieldType>
                        label="Comment"
                        name="comment"
                        rules={[
                          {
                            required: true,
                            message: "Please input your Comment!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Rating"
                        name="rating"
                        rules={[
                          {
                            required: true,
                            message: "Please select your rating!",
                          },
                        ]}
                      >
                        <Rate allowHalf />
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              </div>
            )}
            {item.key === "3" && <div>Item 3</div>}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductDetailTabs;
