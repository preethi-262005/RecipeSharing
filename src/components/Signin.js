import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { userLoginThunk } from "../redux/slices/userLoginSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loginStatus } = useSelector(state => state.userLogin);

  function onSignUpFormSubmit(data) {
    dispatch(userLoginThunk(data));
  }

  useEffect(() => {
    if (loginStatus === true) {
      if (currentUser.userType === 'user') {
        navigate('/user-profile');
      } else if (currentUser.userType === 'chef') {
        navigate('/chef-profile');
      }
    }
  }, [loginStatus, currentUser, navigate]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signin</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--light-dark-grey)",
                    }}
                  >
                    Login as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="chef"
                      value="chef"
                      {...register("userType")}
                    />
                    <label
                      htmlFor="chef"
                      className="form-check-label"
                      style={{ color: "var(--dark-green)" }}
                    >
                      Chef
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label
                      htmlFor="user"
                      className="form-check-label"
                      style={{ color: "var(--dark-green)" }}
                    >
                      User
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password")}
                  />
                </div>

                <div className="text-end">
                  <button
                    type="submit"
                    className="text-white p-2"
                    style={{ backgroundColor: "black" }}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
