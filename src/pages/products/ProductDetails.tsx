import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/api";
import { Image, Rate } from "antd";
import ProductDetailTabs from "./ProductDetailTabs";

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductDetailsQuery(id);

  console.log("data: ", data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const { thumbnail, title, description, price, category, rating } = data;

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
        </div>
      </div>

      <div>
        <ProductDetailTabs {...data} />
      </div>
    </>
  );
};

export default ProductDetails;
