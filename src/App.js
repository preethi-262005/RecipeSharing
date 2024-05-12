import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import RootLayout from './RootLayout';
import Home from './components/Home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { useSelector } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfile from './components/UserProfile';
import ChefProfile from './components/ChefProfile';
import Recipes from './components/Recipes';
import AddRecipe from './components/AddRecipe';
import Recipe from './components/Recipe';
import RecipeByChef from './components/RecipeByChef';

function App() {
  const { currentUser } = useSelector((state) => state.userLogin);
  const browserRouter = createBrowserRouter([{
    path: '',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path:"/user-profile",
        element:<UserProfile/>,
        children:[
          {
            path:'',
            element:<Navigate to='recipes'/>
          },
          {
            path:'recipes',
            element:<Recipes/>
          },
          {
            path:'recipe/:recipeId',
            element:<Recipe/>
          }
        ]
      },
      {
        path:"/chef-profile",
        element:<ChefProfile/>,
        children:[
          {
            path:'new-recipe',
            element:<AddRecipe/>
          },
          {
            path:'recipe-by-chef/:username',
            element:<RecipeByChef/>
          },
          {
            path:'recipe/:recipeId',
            element:<Recipe/>
          },
          {
            path:'',
            element:<Navigate to={`recipe-by-chef/${currentUser.username}`}/>
          }
        ]
      }
    ]
  }]);

  return (
    <RouterProvider router={browserRouter} />
  );
}

export default App;
