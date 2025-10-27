import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { sigin } from "../service/auth";

const form = () => {

  
  const { signUp, loading, err } = useAuth();

  const [isSignin, setIsSignin] = useState(false);

  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState("");

  const [mail, setMail] = useState("");
  const [mailErr, setMailErr] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [confirmpassword, setConfirmPassword] = useState("");
  const [confirmpasswordErr, setConfirmPasswordErr] = useState("");

  const handleName = (e) => {
    setName(e.target.value);

    if (!name) {
      setNameErr("Enter Name");
    } else {
      setNameErr("");
    }
  };

  const handleMail = (e) => {
    const value = e.target.value;
    setMail(value);

    const mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!mailRegex.test(value)) {
      setMailErr("Enter valid mail");
    } else {
      setMailErr("");
    }
  };

  const handlePassword = (e) => {
    const value = e.target.value;

    setPassword(value);

    const passRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;

    if (!value) {
      setPasswordErr("Enter password");
    } else if (!passRegex.test(value)) {
      setPasswordErr(
        "Password must be 8–20 characters, include uppercase, lowercase, digit, special character, and no spaces."
      );
    } else {
      setPasswordErr("");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;

    setConfirmPassword(value);

    if (!password) {
      setConfirmPasswordErr("Enter password first");
    } else if (password != value) {
      setConfirmPasswordErr("Password doesn't match");
    } else {
      setConfirmPasswordErr("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !isSignin &&
      !nameErr &&
      !mailErr &&
      !passwordErr &&
      !confirmpasswordErr
    ) {
      signUp(mail, password);
    } else if (isSignin && !nameErr && !mailErr && !passwordErr) {
      sigin(mail, password);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row w-100">
        <div className="col-12 col-md-8 col-lg-6 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="p-4 rounded shadow bg-white d-flex flex-column "
            style={{ gap: "24px" }}
          >
            <h2 className="text-start">{isSignin ? "Sign In" : "Sign Up"}</h2>
            {err && (
              <h2 className=" text-danger" style={{ fontSize: "12px" }}>
                {err}
              </h2>
            )}
            {/*         
            {err && (
              <div
                class="position-fixed bottom-0 end-0 p-3"
                style="z-index: 11"
              >
                <div
                  id="liveToast"
                  className="toast show"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="toast-header">
                    <img src="..." className="rounded me-2" alt="..." />
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="toast"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="toast-body">
                    Hello, world! This is a toast message.
                  </div>
                </div>
              </div>
            )} */}

            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Enter Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleName}
                onBlur={handleName}
                required
                className="form-control"
              />
              {nameErr && <small className="text-danger">{nameErr}</small>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="mail">Enter Email</label>
              <input
                type="text"
                id="mail"
                value={mail}
                onChange={handleMail}
                onBlur={handleMail}
                required
                className="form-control"
              />
              {mailErr && <small className="text-danger">{mailErr}</small>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePassword}
                onBlur={handlePassword}
                required
                className="form-control"
              />
              {passwordErr && (
                <small className="text-danger">{passwordErr}</small>
              )}
            </div>

            {/* Confirm Password */}
            {!isSignin && (
              <div className="form-group">
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmpassword"
                  value={confirmpassword}
                  onChange={handleConfirmPassword}
                  onBlur={handleConfirmPassword}
                  required
                  className="form-control"
                />
                {confirmpasswordErr && (
                  <small className="text-danger">{confirmpasswordErr}</small>
                )}
              </div>
            )}

            <button className="btn btn-primary w-100" type="submit">
              {isSignin ? "Sign In" : "Sign Up"}
            </button>

            <div className="text-center mt-3">
              {isSignin ? (
                <p>
                  Don't have an account?{" "}
                  <span
                    role="button"
                    className="text-primary"
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => setIsSignin(false)}
                  >
                    Sign Up
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span
                    role="button"
                    className="text-primary"
                    style={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => setIsSignin(true)}
                  >
                    Sign In
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default form;
