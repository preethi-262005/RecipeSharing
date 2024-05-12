import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FcClock, FcCalendar, FcComments, FcPortraitMode } from 'react-icons/fc';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { BiCommentAdd } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Recipe() {
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector((state) => state.userLogin);
  const { state } = useLocation();
  const [commentStatus, setCommentStatus] = useState('');
  const [recipeEditStatus, setRecipeEditStatus] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(state);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const postComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    const res = await axiosWithToken.post(`http://localhost:3100/user-api/comment/${state.recipeId}`, commentObj);
    if (res.data.message === 'User comment added') {
      setCommentStatus(res.data.message);
    } else {
      setErr(res.data.message);
    }
  };

  const ISOtoUTC = (iso) => {
    const date = new Date(iso).getUTCDate();
    const day = new Date(iso).getUTCDay();
    const year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  };

  const editRecipe = () => {
    setRecipeEditStatus(true);
  };

  const saveRecipe = async (editedRecipe) => {
    const modifiedRecipe = { ...state, ...editedRecipe };
    delete modifiedRecipe._id;
    modifiedRecipe.dateOfModification = new Date();
    try {
      const res = await axiosWithToken.put('http://localhost:3100/chef-api/recipe', modifiedRecipe);
      if (res.data.message === 'Recipe modified') {
        setRecipeEditStatus(false);
        setEditedRecipe(res.data.payload);
        navigate(`/chef-profile/recipe/${state.recipeId}`, { state: res.data.payload });
      }
    } catch (error) {
      console.error('Error updating recipe:', error);
      // Handle error
    }
  };

  const deleteRecipe = async () => {
    try {
      const res = await axiosWithToken.delete(`http://localhost:3100/chef-api/recipe/${state.recipeId}`);
      if (res.data.message === 'Recipe deleted') {
        navigate(`/chef-profile`);
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
      // Handle error
    }
  };

  return (
    <div>
      {recipeEditStatus === true ? (
        <form onSubmit={handleSubmit(saveRecipe)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              {...register('title')}
              defaultValue={state.title}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cuisine" className="form-label">
              Cuisine
            </label>
            <select
              {...register('cuisine')}
              id="cuisine"
              className="form-select"
              defaultValue={state.cuisine}
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
              {...register('content')}
              className="form-control"
              id="content"
              rows="10"
              defaultValue={state.content}
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
              {...register('time')}
            />
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-dark">
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <div>
              <p className="display-3 me-4">{editedRecipe.title}</p>
              <span className="py-3">
                <small className=" text-secondary me-4">
                  <FcCalendar className="fs-4" />
                  Created on:{editedRecipe.dateOfCreation}
                </small>
                <small className=" text-secondary">
                  <FcClock className="fs-4" />
                  Modified on:{editedRecipe.dateOfModification}
                </small>
              </span>
            </div>
            <div>
              {currentUser.userType === 'chef' && (
                <>
                  <button className="me-2 btn btn-warning " onClick={editRecipe}>
                    <CiEdit className="fs-2" />
                  </button>

                  <button className="me-2 btn btn-danger" onClick={deleteRecipe}>
                    <MdDelete className="fs-2" />
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="lead mt-3" style={{ whiteSpace: 'pre-line' }}>
            {editedRecipe.content}
          </p>

          <div className="comments my-4">
            {state.comments.length === 0 ? (
              <p className="display-6">No comments yet...</p>
            ) : (
              state.comments.map((commentObj, ind) => {
                return (
                  <div key={ind} className="bg-light  p-3">
                    <p
                      className="fs-4"
                      style={{
                        color: 'dodgerblue',
                        textTransform: 'capitalize',
                      }}
                    >
                      <FcPortraitMode className="fs-2 me-2" />
                      {commentObj.username}
                    </p>

                    <p
                      style={{
                        fontFamily: 'fantasy',
                        color: 'lightseagreen',
                      }}
                      className="ps-4"
                    >
                      <FcComments className="me-2" />
                      {commentObj.comment}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          <div>
            <h1>{commentStatus}</h1>
            {currentUser.userType === 'user' && (
              <form onSubmit={handleSubmit(postComment)}>
                <label className='form-control-label mb-3' htmlFor="comment"></label>
                <input placeholder='Write a comment' id='comment' type='text' className='mb-3 form-control' {...register("comment")} />
                <button type='submit' className='btn btn-dark'>post</button>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Recipe;
