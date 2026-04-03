"use client";
import { AdminLayout } from "../../components/AdminLayout";
import { useRouter } from "next/navigation";
  

export default function Dashboard() {
  const router = useRouter();

  return (
    <AdminLayout>
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Dashboard</h1>

        <h3 className="text-gray-600 mb-8">
          Manage your products, messages and return requests.
        </h3>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Cards grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between">
              <h4 className="text-xl font-semibold mb-4">Products</h4>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/manageaccountadmin/ProductsList");
                }}
                className="mt-auto bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
              >
                Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
