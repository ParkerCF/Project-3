import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_PRODUCT } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

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

  const handleRemoveProduct = async (product) => {
    try {
      const { data } = await removeProduct({
        variables: { product: { _id: product._id, name: product.name } },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!products.length) {
    return <h3>There's nothing for sale here!</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {products &&
          products.map((product) => (
            <div key={product.id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{product.name}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveProduct(product)}
                    >
                      X
                    </button>
                  )}
                </h4>
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
