import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  let navigate = useNavigate();
  return (
    <div style={{ position: "relative" }}>
    <img
      src="https://i.pinimg.com/originals/d3/6d/46/d36d462db827833805497d9ea78a1343.jpg"
      className="w-100"
      alt="background"
    />
    <div
      className="text"
      style={{
        position: "absolute",
        top: "20%",
        left: "40%",
        
        textAlign: "center",
        color: "black",
        textShadow: "2px 2px 4px #000000",
      }}
    >
      <h2 className="mt-5 display-4 p-4 m-2 font-weight-bold ">
            Recipe<br></br> Share
          </h2>
      <button
            type="button"
            className="btn btn-dark text-white  p-3 m-2"
            onClick={() => navigate("/signup")}
          >
            Signup
          </button>
          <button
            type="button"
            className="btn btn-dark text-white  p-3 m-2"
            onClick={() => navigate("/signin")}
          >
            Signin
          </button>
    </div>
  </div>
  );
}

export default Home;



          