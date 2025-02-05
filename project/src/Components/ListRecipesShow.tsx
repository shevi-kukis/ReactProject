import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ListRecipesShow = ({ id, title, description }: { id?: number; title: string; description: string }) => {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Card sx={{ 
                borderRadius: 2, 
                boxShadow: 3, 
                backgroundColor: '#ffffff', 
                padding: 2, 
                width: "100%" 
            }}>
                <CardContent sx={{ textAlign: "center" }}> 
                    <Link to={`/recipe/${id}`} style={{ textDecoration: "none", color: '#f44336' }}> 
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                            {title}
                        </Typography>
                    </Link>
                    <Typography variant="body2" color="textSecondary" sx={{ lineHeight: 1.5 }}>
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ListRecipesShow;
