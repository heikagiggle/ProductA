import { useParams } from "react-router-dom";
import { useProducts } from "../../../hooks/useProduct";
import ProductForm from "../../../components/add-product/ProductForm";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { products, isLoading } = useProducts();

  const product = products.find((p) => p.id === id);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) return <p>Product not found.</p>;

  const transformedProduct = {
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price.toString(),
    variants: product.variants,
    images: product.images,
    stock: product.stock.toString(),
    discount: product.discountPercentage.toString(),
  };

  return (
    <div>
      <ProductForm initialProduct={transformedProduct} />
    </div>
  );
};

export default EditProduct;
