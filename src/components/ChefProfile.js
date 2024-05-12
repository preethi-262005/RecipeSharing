import { NavLink, Outlet } from "react-router-dom";
import {useSelector} from 'react-redux';


function ChefProfile() {
  let {currentUser}=useSelector(state=>state.userLogin)
 // console.log(currentUser)
 
  return (
    <div className="author-profile p-3 ">
      <ul className="nav  justify-content-around fs-3">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to={`recipe-by-chef/${currentUser.username}`}
            style={{ color: "var(--dark-green)" }}
          >
            Recipes of Chef
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="new-recipe"
            style={{ color: "var(--dark-green)" }}
          >
            Add new
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default ChefProfile;