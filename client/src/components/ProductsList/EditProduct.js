import React, { useState, memo } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { UPDATE_PRODUCT } from "../../utils/mutations";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_PRODUCT } from "../../utils/queries";
import Auth from "../../utils/auth";
function EditProduct() {
    let navigate = useNavigate();
    const { productId } = useParams();
    const { loading, data } = useQuery(productId ? QUERY_SINGLE_PRODUCT : null, {
        variables: { productId: productId },
    });
    const product = data?.product || {};
    const productName = "" + product.name + "";
    const [formData, setFormData] = useState({});
    const [updateProduct, { error }] = useMutation(UPDATE_PRODUCT);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        let price = parseFloat(formData.price);
        const { name, description } = formData;
        const product = { name, price, description };
        const profileId = Auth.getProfile().data._id;
        console.log(product, productName);
        try {
            const data = await updateProduct({
                variables: { profileId, name: productName, product },
            });
            navigate('/products/' + productId);
        } catch (err) {
            console.error(err);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!product?.name) {
        return <h4>There is no such product</h4>;
    }
    return (
        <div>
            <h4>Edit Product</h4>

            {Auth.loggedIn() ? (
                <form
                    className="flex-row justify-center justify-space-between-md align-center"
                    onSubmit={handleFormSubmit}
                >
                    <div className="col-12 col-lg-9">
                        <input
                            placeholder="Product Name"
                            name="name"
                            defaultValue={product.name}
                            className="form-input w-100"
                            onChange={(event) => handleInputChange(event)}
                        />
                        <input
                            placeholder="Price"
                            name="price"
                            defaultValue={product.price}
                            className="form-input w-100"
                            onChange={(event) => handleInputChange(event)}
                        />
                        <input
                            placeholder="Description"
                            name="description"
                            defaultValue={product.description}
                            className="form-input w-100"
                            onChange={(event) => handleInputChange(event)}
                        />
                    </div>

                    <div className="col-12 col-lg-3">
                        <button className="btn btn-info btn-block py-3" type="submit">
                            Update
                        </button>
                    </div>
                    {error && (
                        <div className="col-12 my-3 bg-danger text-white p-3">
                            {error.message}
                        </div>
                    )}
                </form>
            ) : (
                <p>
                    You need to be logged in to list an item for sale. Please{" "}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    );
}

export default memo(EditProduct);