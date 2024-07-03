export const formatDate = (dateString: string) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  const discountedPrice = price - (price * discountPercentage) / 100;
  return discountedPrice.toFixed(2);
};
