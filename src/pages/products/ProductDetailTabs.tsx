import type { ConfigProviderProps, RadioChangeEvent } from "antd";
import { Radio, Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import { useState } from "react";
import { TProducts } from "./Product.interface";

type SizeType = ConfigProviderProps["componentSize"];

const ProductDetailTabs = (data: TProducts) => {
  console.log("data tabs", data);
  const { dimensions, shippingInformation, returnPolicy, warrantyInformation } =
    data;
  const [size, setSize] = useState<SizeType>("middle");

  const onChange = (e: RadioChangeEvent) => {
    setSize(e.target.value);
  };

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
    { label: "Reviews", key: "3" },
  ];

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
              </div>
            )}
            {item.key === "2" && <div>Item 2</div>}
            {item.key === "3" && <div>Item 3</div>}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductDetailTabs;
