import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from "../redux/slices/userLoginSlice";

function Header() {
  const { loginStatus, currentUser } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the action to reset the user login state
    dispatch(resetState());
    // Perform any additional logout tasks (e.g., clearing local storage)
    // Add your code here if needed
  };

  return (
    <div>
      <ul className="nav bg-black justify-content-end  p-3">
        {loginStatus === false ? (
          <>
            <li className="nav-item m-2">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link className="nav-link text-white" to="/signup">
                Register
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link className="nav-link text-white" to="/signin">
                Login
              </Link>
            </li>
          </>
        ) : (
          <li className="nav-item m-2">
            <Link className="nav-link text-black" to="#" onClick={handleLogout}>
              <span className="lead fs-3 text-warning">{currentUser.username}</span>
              Logout
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Header;
