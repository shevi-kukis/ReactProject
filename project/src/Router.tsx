import { createBrowserRouter, Outlet } from "react-router";
import AppLayout from "./Components/AppLayout";
import { Box } from "@mui/material";
import RecipesList from "./Components/ListRecipes";
import RecipeDetail from "./Components/RecipeDetail";

import Home from "./Components/Home";
import About from "./Components/About";
import FormRecipe from "./Components/FormRecipe";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <h1>error</h1>,
    children: [
      {
        path: 'Home',
        element: (
          <Box
            sx={{

              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <Home />
          </Box>
        ),
      },
      {
        path: 'About',
        element: (
          <Box
            sx={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <About />
          </Box>
        ),
      },
      {
        path: 'recipe',
        element: (<Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <> <RecipesList />   < Outlet /></> </Box>
        ),
        children: [{ path: ':id', element: <RecipeDetail /> },
        { path: 'formRecipe', element: <FormRecipe /> }
        ]
      },

    ],
  },
]);
