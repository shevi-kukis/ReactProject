
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { AppDispatch, StoreType } from "../store/store";
import { fetchData } from "../store/recipesSlice";

import {  Paper, List, ListItem, Typography, Fab, Stack } from "@mui/material";
import { UserContext } from "../reducer/userReducer";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ListRecipesShow from "./ListRecipesShow";


const RecipesList = () => {
    const recipesList = useSelector((store: StoreType) => store.recipes.list);
    const dispatch = useDispatch<AppDispatch>();
    const userDetail = useContext(UserContext);
    useEffect(() => {
   
            console.log("🚀 Dispatching fetchData...");
            dispatch(fetchData());
        
    }, [dispatch, recipesList.length]);
    return (

        <Paper
            elevation={3}
            sx={{
                position: "fixed",
                right: "20px",
                top: "100px",
                width: "300px",
                maxHeight: "80vh",
                overflowY: "auto",
                padding: "16px",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5"
            }}
        >
            <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
              List Of Recipes
            </Typography>

            <List>
                {recipesList.map((recipe, index) => (
                    <ListItem key={`${recipe.id}-${index}`} divider>
                        <ListRecipesShow id={recipe.id} title={recipe.title} description={recipe.description} />
                    </ListItem>
                ))}
            </List>

            {userDetail.user.id > 0&& (
                <Stack direction="row" justifyContent="center" sx={{ mt: 2 ,}}>
                    <Link to={"/recipe/formRecipe"} style={{ textDecoration: "none", color:'red'}}>
                        <Fab color="primary" aria-label="add"  sx={{ backgroundColor: 'red' }}>
                            <AddIcon />
                        </Fab>
                    </Link>
                </Stack>
            )}
        </Paper>
    );
};

export default RecipesList;
