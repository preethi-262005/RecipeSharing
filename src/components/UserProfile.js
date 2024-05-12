import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <>
     <NavLink to='recipes' className='fs-4 text-primary nav-link mt-4'>Recipes</NavLink>
      <Outlet />
    </>
  );
}

export default UserProfile;