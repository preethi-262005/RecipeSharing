import React from 'react'
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddRecipe() {
    let { register, handleSubmit } = useForm();
  let { currentUser } = useSelector((state) => state.userLogin);
  let [err, setErr] = useState("");
  let navigate = useNavigate();

  let token = sessionStorage.getItem("token");

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const addNewRecipe = async (newRecipe) => {
    newRecipe.recipeId = Date.now();
    newRecipe.dateOfCreation = new Date();
    newRecipe.dateOfModification = new Date();
    newRecipe.username = currentUser.username;
    newRecipe.comments = [];
    newRecipe.status = true;

    //make HTTP POST req to author api
    let res = await axiosWithToken.post(
      "http://localhost:3100/chef-api/new-recipe",
      newRecipe
    );
    console.log("res", res);
    if (res.data.message === "New recipe added") {
      //navigate for articlesBy author component
      navigate(`../recipe-by-chef/${currentUser.username}`);
    } else {
      setErr(res.data.message);
    }
  };
  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Write an Recipe</h2>
            </div>
            <div className="card-body bg-light">
              <form onSubmit={handleSubmit(addNewRecipe)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="cuisine" className="form-label">
                    Cuisine
                  </label>
                  <select
                    {...register("cuisine")}
                    id="cuisine"
                    className="form-select"
                  >
                    <option value="Indian">Indian</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Italian">Italian</option>
                    <option value="Korean">Korean</option>
                    <option value="Japanese">Japanese</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="content" className="form-label">
                    Procedure
                  </label>
                  <textarea
                    {...register("content")}
                    className="form-control"
                    id="content"
                    rows="10"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="time" className="form-label">
                    Time
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="time"
                    {...register("time")}
                  />
                </div>
                  <button type="submit" className="btn btn-dark p-2 m-4 ">
                    Post
                  </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRecipe;
