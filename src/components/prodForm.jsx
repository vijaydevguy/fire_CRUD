import React, { useEffect, useState } from "react";

const ProdForm = ({ close, isEdit, product, adding, editing, loading }) => {
  const [prodName, setProdName] = useState("");
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [active, setActive] = useState(false);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form adding");
    const newProd = {
      id: product?.id || "",
      prodName: prodName,
      prodDesc: desc,
      imgUrl: imgUrl,
      isActive: active,
    };
    if (isEdit) {
      await editing(product.id, newProd);
      close();
    } else {
      await adding(newProd);
      close();
    }
  };

  useEffect(() => {
    if (product) {
      setProdName(product.prodName || "");
      setDesc(product.prodDesc || "");
      setActive(!!product.isActive);
      setImgUrl(product.imgUrl || "");
    }
  }, [product]);

  return (
    <div
      className="modal d-block"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1050,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              {!isEdit ? "Add Product" : "Edit Product"}
            </h5>
            <button
              type="button"
              className="close btn-close"
              onClick={() => close()}
            ></button>
          </div>
          <div className="modal-body d-flex flex-column ">
            {imgUrl && (
              <img
                src={imgUrl}
                alt="img"
                style={{ width: "100px", height: "100px" }}
              />
            )}

            <form
              onSubmit={handleSubmit}
              className="d-flex flex-column "
              style={{ gap: "24px" }}
            >
              <div className="form-group">
                <label htmlFor="prodName">Enter Product Name</label>
                <input
                  type="text"
                  id="prodName"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  placeholder="Enter product name"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="prodDesc">Enter Product Description</label>
                <textarea
                  type="text"
                  id="prodDesc"
                  onChange={(e) => setDesc(e.target.value)}
                  value={desc}
                  placeholder="Enter product description"
                  className="form-control"
                  required
                />
              </div>

              <div className="form-group gap-2 d-flex">
                <input
                  type="checkbox"
                  id="check"
                  onChange={() => setActive(!active)}
                  className="form-check-input"
                />
                <label htmlFor="check">
                  {active ? "Active" : "Not Active"}
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="url">Enter Image URL</label>
                <input
                  type="text"
                  id="url"
                  className="form-control"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  placeholder="Enter product image url"
                  required
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary"
                >
                  {isEdit ? "Edit" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdForm;
