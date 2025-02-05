import { Container, Typography, Paper, Box } from "@mui/material";
import foodImage from "../images/food.png"
const Home = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h3" gutterBottom>
                    Welcome to the Recipe Website! 🍽️
                </Typography>
                <Box 
                    component="img"
                    src={foodImage}
                    alt="Delicious food"
                    sx={{ width: "100%", borderRadius: 2, mt: 2 }}
                />
            </Paper>
        </Container>
    );
};

export default Home;
