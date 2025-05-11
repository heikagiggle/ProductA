import { Button } from "../../components/ui/button";
import { useProducts } from "../../hooks/useProduct";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ProductId = () => {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const product = products.find((product) => product.id === id);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) return <p>Product not found</p>;
  const handleDelete = () => {
    deleteProduct(product.id);
    navigate("/pages/products");
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <FaArrowLeft
            size={20}
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          />
        </div>
        <div className="flex justify-end gap-x-3 mt-6">
          <Button
            variant="secondary"
            onClick={() =>
              navigate(`/pages/products/edit-product/${product.id}`)
            }
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 mt-14 md:mt-28 p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="lg:w-[500px] w-full">
            <img
              src={product.images[0]}
              alt={product.title}
              className="lg:w-[500px] lg:h-[300px] object-contain"
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {product.title}
            </h1>
            <p>{product.description}</p>
            <p>
              <span className="font-semibold">Price:</span> ₦{product.price}
            </p>
            <p>
              <span className="font-semibold">Stock:</span> {product.stock}
            </p>
            <p>
              <span className="font-semibold">Discount:</span>{" "}
              {product.discountPercentage}%
            </p>
            <p>
              <span className="font-semibold">Rating:</span> {product.rating}
            </p>
            {product.variants && product.variants.length > 0 && (
              <div>
                {product.variants.map((variant, idx) => (
                  <div key={idx} className="space-x-2 flex ">
                    <p>
                      <span className="font-semibold">Size:</span>{" "}
                      {variant.size}
                    </p>
                    <p>
                      <span className="font-semibold">Color:</span>{" "}
                      {variant.color}
                    </p>
                    <p>
                      <span className="font-semibold">Extra Price:</span> ₦
                      {variant.additionalPrice}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductId;
