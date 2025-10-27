import React from "react";

const Product = ({ view, product, close }) => {
  if (!view || !product) return null;

  return (
    <div
      className="modal  d-block "
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
      //   onClick={() => close()}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Product Details
            </h5>
            <button
              type="button"
              className="close btn-close"
              onClick={() => close()}
            ></button>
          </div>
          <div className="modal-body">
            <img
              src={product.imgUrl}
              alt="img"
              style={{
                width: "150px",
                height: "100px",
              }}
            />

            <h2>{product.prodName}</h2>
            <p>{product.prodDesc}</p>
            <p
              style={{
                background: "black",
                color: "white",
                // width:"100%",
                display: "inline-block",
                padding: "8px",
                borderRadius: "4px",
              }}
            >
              {product.isActive ? "Active" : "Not Active"}
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => close()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
