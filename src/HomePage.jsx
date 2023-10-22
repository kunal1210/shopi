import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function HomePage() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(" http://localhost:9000/products");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <main className="homepage">
      <h1>Homepage of my Dummy Product Page</h1>
      <div className="products__list">
        {product.map((item) => {
          return (
            <Link
              key={item.id}
              to={`/product?id=${item.id}`}
              className="product__item"
            >
              <img src={item.imageUrl} />
              <h2>{item.itemName}</h2>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
export default HomePage;
