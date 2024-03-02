import { ChangeEvent, useEffect, useState } from "react";
import "./App.scss";
import Header from "./components/header/Header";
import { getProducts, getProductsBySearchResult } from "./api/product.api";
import { Product } from "./models/product.model";
import ProductItem from "./components/productItem/productItem";
import Spinner from "./components/spinner/spinner";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const limit = 20;
  const [skip, setSkip] = useState<number>(0);
  const [products, setProducts] = useState<Product[] | any>([]);
  const [counter, setCounter] = useState<number>(0);
  const [searchValue, setSearchValue] = useState("");
  const handleLoadMore = () => {
    setSkip((p) => p + limit);
    setCounter((p) => p++);
  };
  const handleSearchProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    setIsLoading(true);
    setSkip(0);
    if (searchValue == "") {
      console.log("trong ");
      getProducts(skip, limit).then((resp: any) => {
        console.log("resp", resp);
        setIsLoading(false);
        setProducts(resp.products);
      });
    } else {
      getProductsBySearchResult(searchValue, skip, limit).then((resp: any) => {
        setIsLoading(false);
        setProducts(resp.products);
      });
    }
  }, [searchValue]);
  useEffect(() => {
    setIsLoading(true);
    getProductsBySearchResult(searchValue, skip, limit).then((resp: any) => {
      setIsLoading(false);
      const updatedList: Product[] = [...products, ...resp.products];
      setProducts(updatedList);
    });
  }, [counter, skip]);

  return (
    <>
      <div className="app-container">
        <Header />
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search product.."
            value={searchValue}
            onChange={(e) => handleSearchProduct(e)}
          />
        </div>
        <div className="home-container">
          {products.length != 0 && (
            <div className="product-list-container">
              {products.map((productItem: Product) => (
                <ProductItem product={productItem} />
              ))}
            </div>
          )}
          {products.length == 0 && !isLoading && (
            <div className="not-available-wrapper">No products available</div>
          )}
        </div>
        <div className="action-wrapper">
          {isLoading && <Spinner />}
          {products.length !== 0 && !isLoading && (
            <div className="btn" onClick={() => handleLoadMore()}>
              Load more
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
