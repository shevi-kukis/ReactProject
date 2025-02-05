import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StoreType } from "../store/store";
import { useEffect } from "react";
import { get } from "../store/recipesSlice";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Paper, Box } from "@mui/material";

const RecipeDetail = () => {
    const { id } = useParams();
    const numericId = Number(id);
    const dispatch = useDispatch();
    const selectedRecipe = useSelector((state: StoreType) => state.recipes.selectedRecipe);

    useEffect(() => {
        if (!isNaN(numericId)) {
            console.log("📢 Fetching recipe with ID:", numericId);
            dispatch(get(numericId));
        }
    }, [dispatch, numericId]);

    if (!selectedRecipe) return <Typography 
    variant="h6" align="center" sx={{ mt: 5 }}>טוען מתכון...</Typography>;

    return (
        <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            minHeight: "calc(100vh - 3cm)", 
            backgroundColor: "#f5f5f5", 
            padding: 2 
        }}>
            <Paper elevation={4} sx={{ 
                maxWidth: 450, 
                padding: 2, 
                borderRadius: 3, 
                backgroundColor: "white",
                maxHeight: "calc(100vh - 6cm)", 
                overflowY: "auto" 
            }}>
                <Card sx={{ 
                    bgcolor: "#ffffff", 
                    borderRadius: 3, 
                    boxShadow: 2
                }}>
                    <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2,
                             textAlign: "center", color: "#333" }}>
                            {selectedRecipe.title}
                        </Typography>
                       
                        <Typography variant="body2" sx={{ mt: 2, textAlign: "justify", color: "#555" }}>
                            {selectedRecipe.description}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: 3, fontWeight: "bold", color: "#222" }}>
                        Preparation instructions:
                        </Typography>
                        <Typography variant="body2" sx={{ textAlign: "justify", color: "#444" }}>
                            {selectedRecipe.instructions}
                        </Typography>

                        <Typography variant="subtitle1" sx={{ mt: 3, fontWeight: "bold", color: "#222" }}>
                        Ingredients:
                        </Typography>
                        <List sx={{ backgroundColor: "#f9f9f9", borderRadius: 2, padding: 1 }}>
                            {selectedRecipe.ingredients?.map((ingredient, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText primary={ingredient} 
                                    sx={{ textAlign: "center", color: "#333" }} />
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </Paper>
        </Box>
    );
};

export default RecipeDetail;
