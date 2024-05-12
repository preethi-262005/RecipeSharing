import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FcReading } from "react-icons/fc";
import "./RecipeByChef.css"

function RecipeByChef() {
  const [recipeList, setRecipeList] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.userLogin);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const getRecipesOfCurrentChef = async () => {
      try {
        const res = await axios.get(`http://localhost:3100/chef-api/recipe/${currentUser.username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.message === 'Recipes') {
          setRecipeList(res.data.payload);
        } else {
          setErr(res.data.message);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Handle error
      }
    };

    getRecipesOfCurrentChef();
  }, [currentUser.username, token]);

  const readRecipesByRecipeId = (recipeObj) => {
    navigate(`../recipe/${recipeObj.recipeId}`, { state: recipeObj });
  };

  return (
    <div>
      {recipeList.length === 0 ? (
        <p className="display-1 text-center" style={{ color: "var(--crimson)" }}>
          No Recipes found
        </p>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
          {recipeList.map((recipe) => (
            <div className="col" key={recipe.recipeId}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title" style={{ color: 'var(--dark-maroon)' }}>{recipe.title}</h5>
                  <p className="card-text">
                    {recipe.content.substring(0, 80) + "...."}
                  </p>
                  <button
                    className="custom-btn btn-4"
                    onClick={() => readRecipesByRecipeId(recipe)}
                  >
                    <span><FcReading className="me-2 fs-3" style={{ color: 'var(--light-yellow)' }} />Read More...</span>
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
    </div>
  );
}

export default RecipeByChef;
