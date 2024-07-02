import type { ConfigProviderProps } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useState } from "react";
import { FieldType, TProducts, TReviews } from "./Product.interface";
import type { PopconfirmProps } from "antd";
import type { FormProps } from "antd";
import { Rate } from "antd";

import { Button, Popconfirm, Tabs, message, Modal, Form, Input } from "antd";
import { formatDate } from "./Product.utils";

type SizeType = ConfigProviderProps["componentSize"];

const ProductDetailTabs = (data: TProducts) => {
  console.log("data tabs", data);
  const {
    dimensions,
    shippingInformation,
    returnPolicy,
    warrantyInformation,
    reviews,
  } = data;
  const [reviewArray, setReviewArray] = useState<TReviews[]>(reviews);
  const [size, setSize] = useState<SizeType>("middle");

  // const onChange = (e: RadioChangeEvent) => {
  //   setSize(e.target.value);
  // };

  //   const items = new Array(3).fill(null).map((_, i) => {
  //     const id = String(i + 1);
  //     return {
  //       label: `Card Tab ${id}`,
  //       key: id,
  //       content: `Content of card tab ${id}`,
  //     };
  //   });

  const items = [
    { label: "Specification", key: "1" },
    { label: "Reviews", key: "2" },
  ];

  const createHandleConfirm = (reviewDate: string, reviewerEmail: string) => {
    return (e) => {
      console.log("confirm works for review reviewDate:", reviewDate);
      console.log("confirm works for review reviewerEmail:", reviewerEmail);
      console.log(e);
      message.success("Deleted review successfully!");
      // Implement the logic to remove the review from the state here
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    const reviewData: TReviews = {
      reviewerName: values.reviewerEmail,
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
      <Tabs defaultActiveKey="1" type="card" size={size}>
        {items.map((item) => (
          <TabPane tab={item.label} key={item.key}>
            {item.key === "1" && (
              <div className="border w-[350px] md:w-[600px]">
                <div className="flex justify-between">
                  <p>Depth</p>
                  <p>{dimensions.depth}</p>
                </div>
                <div className="flex justify-between">
                  <p>Height</p>
                  <p>{dimensions.height}</p>
                </div>
                <div className="flex justify-between">
                  <p>Width</p>
                  <p>{dimensions.width}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping Info: </p>
                  <p>{shippingInformation}</p>
                </div>
                <div className="flex justify-between">
                  <p>Return Policy: </p>
                  <p>{returnPolicy}</p>
                </div>
                <div className="flex justify-between">
                  <p>Warranty Info: </p>
                  <p>{warrantyInformation}</p>
                </div>
              </div>
            )}
            {item.key === "2" && (
              <div className="w-[350px] md:w-[600px]">
                {reviewArray.map((item) => (
                  <div>
                    <p>{item.reviewerName}</p>
                    <p>{item.reviewerEmail}</p>
                    {/* <p>{item.date}</p> */}
                    <p>{formatDate(item.date as string)}</p>
                    <p>{item.comment}</p>
                    <p>{item.rating}</p>
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
                      <Button type="primary" shape="round" danger>
                        Delete
                      </Button>
                    </Popconfirm>
                  </div>
                ))}

                {/* <Button type="primary">Add a Review</Button>
                 */}
                <div>
                  <Button type="primary" onClick={showModal}>
                    Open Modal
                  </Button>
                  <Modal
                    title="Add a new review"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <Form
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

                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
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
