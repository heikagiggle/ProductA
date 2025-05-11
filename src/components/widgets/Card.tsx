import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import type { Product } from "@/hooks/useProduct";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const handleProductClick = (id: string) => {
    navigate(`/pages/products/product/${id}`);
  };
  return (
    <Card className="p-4 space-y-3">
      <div
        onClick={() => handleProductClick(product.id)}
        className="cursor-pointer"
      >
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-40 object-contain rounded-md"
        />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold line-clamp-1">{product.title}</h3>
        <p className="text-card-foreground font-medium">₦{product.price}</p>
        {product.variants && product.variants.length > 0 && (
          <ul>
            {product.variants.map((v, idx) => (
              <li key={idx} className=" space-y-1">
                <p>
                  Color: {v.color.charAt(0).toUpperCase() + v.color.slice(1)}
                </p>

                <p>
                  Size: {v.size}, Extra Price: ₦{v.additionalPrice}
                </p>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm text-card-foreground">⭐ {product.rating}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
