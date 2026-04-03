"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "../../components/AdminLayout";
import { toast } from "react-toastify";
import ManageProduct from "../../components/ManageProduct";

export default function ProductsListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [homeProductId, setHomeProductId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products?page=1&limit=50`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHomePageProduct = async () => {
    try {
      const res = await fetch("/api/homepage-product");
      const data = await res.json();
     

      if (data.success && data.data?.productId) {
        setHomeProductId(data.data.productId);
      }
    } catch (err) {
      console.error("Fetch home page product error:", err);
    }
  };

  const handleMakeHomePageProduct = async (productId) => {
    if (!confirm("Set this product as Home Page Product?")) return;

    try {
      const res = await fetch("/api/homepage-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Home page product updated");
        fetchHomePageProduct(); // 👈 refresh badge instantly
      } else {
        toast.error(data.error || "Failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchHomePageProduct();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Product deleted");
        fetchProducts();
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // Open Add/Edit modal
  const handleOpenModal = (product = null) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Manage Products</h3>

          <button
            onClick={() => handleOpenModal()}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Subtitle</th>
                  <th className="px-4 py-3">Colors</th>
                  <th className="px-4 py-3">Sizes</th>
                  <th className="px-4 py-3">Payment Mode</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className={`hover:bg-gray-50 ${
                        homeProductId === product._id
                          ? "bg-green-50 border-l-4 border-green-600"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-3">{product.title}</td>
                      <td className="px-4 py-3">{product.subtitle}</td>
                      <td className="px-4 py-3">
                        {product.variations?.map((v) => v.color).join(", ")}
                      </td>
                      <td className="px-4 py-3">
                        {[
                          ...new Set(
                            product.variations?.flatMap((v) =>
                              v.sizes?.map((s) => s.size),
                            ),
                          ),
                        ].join(", ")}
                      </td>
                      <td className="px-4 py-3">{product.paymentMode}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => handleOpenModal(product)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded text-xs hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleMakeHomePageProduct(product._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Make Home Page Product
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg w-full max-w-6xl p-6 relative scrollableHeight">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-4">
                {selectedProduct ? "Edit Product" : "Add Product"}
              </h2>

              <ManageProduct
                product={selectedProduct}
                onSuccess={() => {
                  setShowModal(false);
                  fetchProducts();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
