export type TDimensions = {
  depth: number;
  height: number;
  width: number;
};

export type TMeta = {
  barcode: string;
  createdAt: string;
  qrCode: string;
  updatedAt: string;
};

export type TReviews = {
  comment: string;
  date?: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

export type TProducts = {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: TDimensions;
  discountPercentage: number;
  id: string;
  images: string[];
  meta: TMeta;
  minimumOrderQuantity: number;
  rating: number;
  returnPolicy: string;
  reviews: TReviews[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
  price: number;
};

export type TProductUpdate = {
  title: string;
  price: string;
  discountPercentage: number;
  stock: number;
  rating: number;
  description: string;
  brand?: string;
  category: string;
};

export type FieldType = {
  comment: string;
  date?: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};

export type TCategory = {
  slug: string;
  name: string;
  url: string;
};
