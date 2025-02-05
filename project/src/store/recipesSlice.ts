import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export type Recipe = {
    id?: number;
    title: string;
    description: string;
    authorId?: number;
    ingredients: string[];
    instructions: string;
};
export const fetchData = createAsyncThunk(
    "recipes/fetch",
    async (_, thunkAPI) => {
        try {
            console.log("Fetching recipes...");
            const response = await axios.get("http://localhost:3000/api/recipes");
            return response.data;
        } catch (e: any) {
            console.error("Error fetching recipes:", e.message);
            return thunkAPI.rejectWithValue("Failed to load recipes.");
        }
    }
);
export const addRecipe = createAsyncThunk(
    "recipes/add",
    async (recipe: Recipe, thunkAPI) => {
        try {
            if (!recipe.authorId) {
                return thunkAPI.rejectWithValue("User ID is missing");
            }
            
            const response = await axios.post(
                "http://localhost:3000/api/recipes",
                {
                    title: recipe.title,
                    description: recipe.description,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                },
                {
                    headers: {
                        'user-id': recipe.authorId,
                    },
                }
            );
            return response.data.recipe;
        } catch (e: any) {
            console.error("Error adding recipe:", e.message);
            return thunkAPI.rejectWithValue("Failed to add recipe.");
        }
    }
);
const recipesSlice = createSlice({
    name: "recipes",
    initialState: { list: [] as Recipe[], loading: false, selectedRecipe: null as null | Recipe, error: "" },
    reducers: {
        get: (state, action) => {
            const recipe = state.list.find((r) => r.id === action.payload);
            if (recipe) {
                state.selectedRecipe = recipe;
            } else {
                console.warn("Recipe not found");
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                console.log("Loading recipes...");
                state.loading = true;
                state.error = "";
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                console.log("Recipes loaded successfully");
                state.list = action.payload || [];
                state.loading = false;
            })
            .addCase(fetchData.rejected, (state, action) => {
                console.error("Failed to load recipes:", action.payload);
                state.error = action.payload as string;
                state.loading = false;
            })
            .addCase(addRecipe.pending, (state) => {
                console.log("Adding recipe...");
                state.loading = true;
                state.error = "";
            })
            .addCase(addRecipe.fulfilled, (state, action) => {
                console.log("Recipe added successfully");
                state.list.push(action.payload);
                state.loading = false;
            })
            .addCase(addRecipe.rejected, (state, action) => {
                console.error("Failed to add recipe:", action.payload);
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});
export const { get } = recipesSlice.actions;
export default recipesSlice;

