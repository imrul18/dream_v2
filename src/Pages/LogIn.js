import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../Component/InputField/InputField";
import PasswordInput from "../Component/InputField/PasswordInput";
import LogIn_img from "../Component/assets/img/LogIn_img.jpeg";
import AuthService from "../service/AuthService";

function LogIn() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlepassChange = (event) => {
    setPass(event.target.value);
  };
  const login = async () => {
    setLoading(true);
    const res = await AuthService?.login(name, pass);
    if (!res?.status) {
      setError("Wrong Username or Password");
    }
    else{
      window.location.href = "/dashboard";
    }
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
              label="Email"
              value={name}
              star="*"
              onChange={handleNameChange}
            />
            <PasswordInput
              label="Password"
              value={pass}
              star="*"
              onChange={handlepassChange}
            />
            {error && <div className="mt-3 text-danger">{error}</div>}
            <div className="btn_area">
              <Link to="/forget-password" className="mt-3 forget">
                Forget your password?
              </Link>
              <Link onClick={login} className="mt-3">
                <button className="btn" disabled={loading}>
                  {loading ? "Please Wait" : "Log In"}
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

export default LogIn;
