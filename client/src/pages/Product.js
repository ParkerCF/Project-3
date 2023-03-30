import React from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_PRODUCT } from "../utils/queries";

const Product = () => {
  const { productId } = useParams();

  const { loading, data } = useQuery(productId ? QUERY_SINGLE_PRODUCT : null, {
    variables: { productId: productId },
  });

  const product = data?.product || {};

  //   console.log(product);
  console.log(productId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product?.name) {
    return <h4>There is no such product</h4>;
  }

  // returning the product information to the "product" page
  return (
    <div key={product.id}>
      <h2 className="card-header">
        <span>Item: {product.name} </span>
      </h2>
      <h3>
        <span>Price: {product.price} dollars</span>
      </h3>
      <h4>
        <span>Description: {product.description}</span>
      </h4>
    </div>
  );
};
export default Product;
