export const getProducts = async (skip: number, limit: number) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products?skip=${skip}&limit=${limit}`
    );
    return response.json();
  } catch (err) {
    return err;
  }
};
export const getProductsBySearchResult = async (
  searchValue: string,
  skip: number,
  limit: number
) => {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchValue}&skip=${skip}&limit=${limit}`
    );

    return response.json();
  } catch (err) {
    return err;
  }
};
