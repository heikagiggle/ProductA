import TopBar from "../../components/topbar/TopBar";
import { Button } from "../../components/ui/button";
import ProductCard from "../../components/widgets/Card";
import { useProducts } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { products, isLoading } = useProducts();
  if (isLoading) return <p>Loading...</p>;

  const filteredProducts = products.filter((product) => {
    const query = searchTerm.toLowerCase();
    return (
      product.title.toLowerCase().includes(query) ||
      product.variants?.some((variant) =>
        [variant.size, variant.color].some((val) =>
          val?.toLowerCase().includes(query)
        )
      )
    );
  });

  return (
    <>
      <TopBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="space-y-2">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
          <h1 className="font-medium text-xl whitespace-nowrap">Products</h1>
          <Button
            variant="secondary"
            onClick={() => navigate("/pages/products/new-product")}
            className="ml-auto"
          >
            Add Product
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
