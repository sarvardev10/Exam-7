import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get_product } from "../../service/products";
import "./single.css";

const SinglePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await get_product(id);
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="single-page-container fade-in">
      {product.image_url && (
        <div className="product-image slide-in-left">
          <img src={product.image_url} alt="Product" className="image" />
        </div>
      )}
      <div className="product-details slide-in-right">
        <h2 className="product-name">{product.product_name}</h2>
        <div className="product-info">
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Made In:</strong> {product.made_in}
          </p>
          <p>
            <strong>Color:</strong> {product.color.join(", ")}
          </p>
          <p>
            <strong>Size:</strong> {product.size.join(", ")}
          </p>
          <p>
            <strong>Count:</strong> {product.count}
          </p>
          <p>
            <strong>Cost:</strong> ${product.cost}
          </p>
          <p>
            <strong>Discount:</strong> {product.discount}%
          </p>
          <p>
            <strong>Age Range:</strong> {product.age_min} - {product.age_max}{" "}
            years
          </p>
          <p>
            <strong>For Gender:</strong> {product.for_gender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
