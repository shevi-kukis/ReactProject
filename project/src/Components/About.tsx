import { Typography, Container, Paper } from "@mui/material";

const About = () => {
    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ padding: 4, marginTop: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom>
                    About the Recipe Website 🍽️
                </Typography>
                <Typography variant="body1">
                    Welcome to our recipe website! Here you can find a rich collection of delicious recipes of all kinds – 
                    from main courses to perfect desserts. 
                    The website allows every user to share personal recipes, manage their own recipe collection, 
                    and discover new and exciting dishes.
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 2 }}>
                    We strive to make your cooking experience more enjoyable and convenient, 
                    with a user-friendly and easy-to-use interface. 
                    Join us and enjoy preparing special dishes for any occasion! 🍳✨
                </Typography>
            </Paper>
        </Container>
    );
};

export default About;
