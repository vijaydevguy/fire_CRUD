import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Product from "../components/product";
import ProdForm from "./prodForm";
import { useProducts } from "../hooks/useProducts";

// const Products = [
//   {
//     id: 1,
//     prodName: "Apple",
//     prodDesc: "Description",
//     imgUrl:
//       "https://th.bing.com/th/id/R.fa020e00e8fa2eafac81b41f561fc2da?rik=sxi7qmdgsPmdfw&riu=http%3a%2f%2fpngimg.com%2fuploads%2fapple%2fapple_PNG12436.png&ehk=tbW%2fssLN0M3RIrPvvicGeaXsDVX%2b8kN0%2baApNC3ICEs%3d&risl=1&pid=ImgRaw&r=0",
//     isActive: true,
//   },
// ];

const Products = () => {
  const { loading, products, adding, deleting, editing } = useProducts();

  const [viewProd, setViewProd] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const [addModal, setAddModal] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  console.log("products showing:" ,products)

  console.log(viewProd, showViewModal);

  const handleViewModal = (product) => {
    console.log(product);
    setViewProd(product);
    setShowViewModal(true);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setViewProd(null);
  };

  const handleAddModal = () => {
    setAddModal(true);
  };

  const closeAddModal = () => {
    setAddModal(false);
  };

  const navigate = useNavigate();
  const { signOut } = useAuth();
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleDelete = (product) => {
    deleting(product.id);
  };

  const handleEditModal = (product) => {
    setEditModal(true);
    setEditProduct(product);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditProduct(null);
  };

  return (
    <div className="container-fluid d-flex flex-column gap-3 py-3">
      <div className="d-flex justify-content-end w-100 gap-3">
        <button className="btn btn-info" onClick={() => handleAddModal()}>
          Add Product
        </button>

        <button className="btn btn-danger w-fit" onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
      {showViewModal && viewProd && (
        <Product
          view={showViewModal}
          product={viewProd}
          close={closeViewModal}
        />
      )}

      {addModal && (
        <ProdForm
          close={closeAddModal}
          view={addModal}
          adding={adding}
          loading={loading}
        />
      )}

      {editModal && (
        <ProdForm
          product={editProduct}
          view={editModal}
          editing={editing}
          loading={loading}
          close={closeEditModal}
          isEdit={true}
        />
      )}

      <div>
        <table className="table table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">s.no</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Description</th>
              <th scope="col">Image</th>
              <th scope="col">Active</th>
              <th scope="col">View</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          {/* {loading && <h2>Loading...</h2>} */}

          {loading ? (
            <tbody>
              <tr>
                <td colSpan="8" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {products.length > 0 &&
                products.map((product, i) => {
                  return (
                    <tr key={product.id}>
                      <th>{i + 1}</th>
                      <th>{product.prodName}</th>
                      <th>{product.prodDesc}</th>
                      <th>
                        <img
                          src={product.imgUrl}
                          alt={product.prodName}
                          style={{ width: "150px", height: "100px" }}
                        />
                      </th>
                      <th>{product.isActive ? "Active" : "Not Active"}</th>
                      <th>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleViewModal(product)}
                        >
                          View
                        </button>
                      </th>
                      <th>
                        <button
                          className="btn btn-info"
                          onClick={() => handleEditModal(product)}
                        >
                          Edit
                        </button>
                      </th>
                      <th>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(product)}
                        >
                          Delete
                        </button>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Products;
