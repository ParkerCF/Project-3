import React from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";

import { REMOVE_PRODUCT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

// importing the ProductsList component
const ProductsList = ({ products, isLoggedInUser = false }) => {
  const [removeProduct, { error }] = useMutation(REMOVE_PRODUCT, {
    update(cache, { data: { removeProduct } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeProduct },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  // removeProduct function
  const handleRemoveProduct = async (product) => {
    try {
      const { data } = await removeProduct({
        variables: { productId: product._id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!products.length) {
    return <h3>There's nothing for sale here!</h3>;
  }

  // returning the product information to the "product" page and checking if the user is logged in to render the remove button
  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {products &&
          products.map((product) => (
            <div key={product._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span class="productName">{product.name}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveProduct(product)}
                    >
                      X
                    </button>
                  )}
                </h4>
                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/products/${product._id}`}
                >
                  View and purchase this product.
                </Link>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default ProductsList;
