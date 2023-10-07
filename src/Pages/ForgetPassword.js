import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../Component/InputField/InputField";
import LogIn_img from "../Component/assets/img/LogIn_img.jpeg";
import AuthService from "../service/AuthService";

function ForgetPassword() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const login = async() => {
    setLoading(true);
    const res = await AuthService?.forget(name);
    await AuthService?.logout();
    window.location.href = "/";
    setLoading(false);
  };

  return (
    <div className="logIn_page">
      <div className="log_container">
        <div className="lgoIn_img">
          <img src={LogIn_img} alt="" />
        </div>
        <div className="logIn_from_area">
          <form action="" className="input_form logIn_from">
            <h1>
              <span className="aaab">Welcome to</span> <br /> Dream Records!
            </h1>
            <InputField
              label="User Name or Email"
              value={name}
              star="*"
              onChange={handleNameChange}
            />
            {error && <div className="mt-3 text-danger">{error}</div>}
            <div className="btn_area">
              <Link onClick={login} className="mt-3">
                <button className="btn" disabled={loading}>
                  {loading ? "Please Wait" : "Submit"}
                </button>
              </Link>
            </div>
          </form>
          <p className="copy_R">Copyright © 2023 Dream Records Pvt.Ltd.</p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
