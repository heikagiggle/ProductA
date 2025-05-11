import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, type ProductData } from "./schema";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useProducts } from "../../hooks/useProduct";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const ProductForm = ({ initialProduct }: { initialProduct?: ProductData }) => {
  const { addProduct, isLoading, updateProduct } = useProducts();
  const navigate = useNavigate();
  const form = useForm<ProductData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialProduct || {
      title: "",
      description: "",
      price: "",
      images: [],
      variants: [
        {
          size: "Medium",
          color: "black",
          additionalPrice: 0,
        },
      ],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialProduct) {
      form.reset(initialProduct);
    }
  }, [initialProduct, form]);

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = (data: ProductData) => {
    const productPayload = {
      id: initialProduct?.id ?? uuid(),
      title: data.title,
      description: data.description,
      images: data.images ?? [],
      price: parseFloat(data.price),
      rating: "4.5",
      stock: data.stock ?? "0",
      discountPercentage: data.discount ?? "0",
      availabilityStatus: "In Stock",
      variants: data.variants,
    };
    console.log("Updating product with ID:", productPayload.id);

    if (initialProduct?.id) {
      updateProduct(productPayload);
      toast.success("Product updated successfully!");
    } else {
      addProduct(productPayload);
      toast.success("Product added successfully!");
    }

    navigate("/pages/products");
  };

  return (
    <>
      <div className="flex items-center mt-5">
        <FaArrowLeft
          size={20}
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 max-w-xl mx-auto border p-4 rounded-md my-5"
        >
          <h1 className="text-xl md:text-2xl  font-semibold text-center">
            Product Form
          </h1>
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Images</FormLabel>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      const fileReaders = Array.from(files).map((file) => {
                        return new Promise<string>((resolve, reject) => {
                          const reader = new FileReader();
                          reader.onloadend = () =>
                            resolve(reader.result as string);
                          reader.onerror = reject;
                          reader.readAsDataURL(file);
                        });
                      });

                      Promise.all(fileReaders).then((base64Images) => {
                        field.onChange(base64Images);
                      });
                    }
                  }}
                />
                {field.value?.map((img, idx) => (
                  <div key={idx} className="flex space-x-2 mb-2">
                    <img
                      src={img}
                      alt={`Product Image ${idx + 1}`}
                      className="h-20 w-20 object-cover"
                    />
                    <Button
                      variant="destructive"
                      type="button"
                      onClick={() => {
                        const updated = [...(field.value ?? [])];
                        updated.splice(idx, 1);
                        field.onChange(updated);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <Input type="number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3>Variants</h3>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-4 rounded-md md:flex space-y-4 md:space-x-3 items-center"
              >
                <FormField
                  control={control}
                  name={`variants.${index}.size`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Small">Small</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`variants.${index}.color`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="red">Red</SelectItem>
                          <SelectItem value="white">White</SelectItem>
                          <SelectItem value="black">Black</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`variants.${index}.additionalPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Price</FormLabel>
                      <Input
                        type="number"
                        value={field.value || ""}
                        onChange={(e) => {
                          const parsedValue = parseFloat(e.target.value);
                          field.onChange(isNaN(parsedValue) ? 0 : parsedValue);
                        }}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-1"
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={() =>
                append({ size: "Medium", color: "red", additionalPrice: 0 })
              }
            >
              Add Variant
            </Button>
          </div>

          <FormField
            control={control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Product"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
