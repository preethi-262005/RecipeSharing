import React from 'react'
import { useState, useEffect } from "react";

import { useNavigate, Outlet } from "react-router-dom";
import axios from 'axios'


function Recipes() {
    const [recipeList, setrecipeList] = useState([]);
  const [err,setErr]=useState('')
  let navigate = useNavigate();

  let token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const getRecipesOfCurrentChef = async () => {
   let res= await axiosWithToken.get(`http://localhost:3100/user-api/recipe`)
   console.log(res)
   if(res.data.message==='All recipe'){
    setrecipeList(res.data.payload)
   }else{
    setErr(res.data.message)
   }
  };


  useEffect(() => {
    getRecipesOfCurrentChef();
  }, []);

  const readRecipeByRecipeId = (recipeObj) => {
    navigate(`../recipe/${recipeObj.recipeId}`, { state: recipeObj });
  };
  return (
    <div>
      {recipeList.length === 0 ? (
        <p className="display-1  text-center" style={{color:'var(--crimson)'}}>No Recipes found</p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5 mb-2">
          {recipeList.map((recipe) => (
            <div className="col" key={recipe.recipeId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    {recipe.content.substring(0, 80) + "...."}
                  </p>
                  <button
                    className="custom-btn btn-4 "
                    onClick={() => readRecipeByRecipeId(recipe)}
                  >
                    <span >Read More</span>
                  </button>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">
                    Last updated on {recipe.dateOfModification}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Outlet />
    </div>
  )
}

export default Recipes