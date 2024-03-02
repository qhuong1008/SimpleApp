import "./productItem.scss";
import { Product } from "../../models/product.model";
const ProductItem = (props: { product: Product }): JSX.Element => {
  return (
    <>
      <div className="product-item-container">
        <img src={props.product.thumbnail} alt="thumbnail" />
        <div className="content-wrapper">
          <div className="name">{props.product.title}</div>
          <div className="rating-wrapper">{props.product.rating}</div>
          <div className="brand-wrapper">
            <div className="title">Brand:</div>
            <div className="name">{props.product.brand}</div>
          </div>
          <div className="price-wrapper">
            <div className="title">Price:</div>
            <div className="price">{props.product.price}$</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
