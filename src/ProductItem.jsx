import { useEffect, useState } from "react";
import { useURLID } from "./useURLID";
import { useNavigate } from "react-router-dom";

function ProductItem() {
  const { id } = useURLID();
  const [singleProduct, setSingleProduct] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:9000/products/${id}`);
        const data = await res.json();
        console.log(data);
        setSingleProduct(data);
      } catch (erro) {
        console.log(erro);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);
  const navigate = useNavigate();
  if (loading) return <div className="">loding....</div>;
  return (
    <div className="single__product">
      <h1>
        <span onClick={() => navigate("/")}>🔙</span>
        <span>
          {singleProduct.itemName} Page id: {id}
        </span>
      </h1>
      <section>
        <figure className="product__img-container">
          <img
            className="product__img"
            src={singleProduct.imageUrl}
            alt="Image"
          />
        </figure>
        <aside>
          <h2>{singleProduct.itemName}</h2>
          <h3>{singleProduct.notes}</h3>
          <h4>
            Category: <span>{singleProduct.type}</span>
          </h4>
          <p>
            Width: <strong>{singleProduct?.size?.width}</strong>
          </p>
          <p>
            Length: <strong>{singleProduct?.size?.length}</strong>
          </p>
        </aside>
      </section>
    </div>
  );
}
export default ProductItem;
