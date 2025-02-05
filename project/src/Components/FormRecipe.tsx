import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { addRecipe, Recipe } from '../store/recipesSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { useContext, useState } from 'react';
import { UserContext } from '../reducer/userReducer';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    ingredients: Yup.array().of(Yup.string().required('Ingredient is required'))
        .min(1, 'At least one ingredient is required'),
    instructions: Yup.string().required('Instructions are required'),
});
const FormRecipe = () => {
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch<AppDispatch>();
    const userDetail = useContext(UserContext);
    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors } } = useForm<Recipe>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            title: '', description: '', ingredients: [], instructions: '',},
    });
    const onSubmit = async (data: Recipe) => {
        data.authorId = userDetail.user.id;
        await dispatch(addRecipe(data));
        handleClose();
        navigate('/recipe');
    };
    const handleClose = () => {
        setOpen(false);
        navigate('/recipe');
    };
    return (
        <Dialog open={open} onClose={handleClose} disableEnforceFocus disableAutoFocus>
            <DialogTitle sx={{ color: 'red' }}>Add New Recipe</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
                    <Controller
                        name="title" control={control}
                        render={({ field }) => (
                            <TextField
                                {...field} label="Title" variant="outlined"
                                fullWidth error={!!errors.title}
                                helperText={errors.title ? errors.title.message : ''}
                                sx={{ '& .MuiOutlinedInput-root': { borderColor: 'red' } }}
                            />
                        )}
                    />
                    <Controller
                        name="description" control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Description" variant="outlined" fullWidth error={!!errors.description}
                                helperText={errors.description ? errors.description.message : ''}
                                multiline rows={4}
                                sx={{ '& .MuiOutlinedInput-root': { borderColor: 'red' } }}
                            />
                        )}
                    />
                    <Controller
                        name="ingredients" control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Ingredients (comma separated)"
                                variant="outlined" fullWidth error={!!errors.ingredients}
                                helperText={errors.ingredients ? errors.ingredients.message : ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    field.onChange(value.split(',').map(item => item.trim()).filter(item => item));
                                }}
                                value={field.value ? field.value.join(', ') : ''}
                                sx={{ '& .MuiOutlinedInput-root': { borderColor: 'red' } }}
                            />
                        )}
                    />
                    <Controller
                        name="instructions" control={control}
                        render={({ field }) => (
                            <TextField
                                {...field} label="Instructions" variant="outlined"
                                fullWidth error={!!errors.instructions}
                                helperText={errors.instructions ? errors.instructions.message : ''}
                                multiline rows={4}
                                sx={{ '& .MuiOutlinedInput-root': { borderColor: 'red' } }}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2, backgroundColor: 'red', '&:hover': 
                        { backgroundColor: 'darkred' } }}> Submit Recipe  </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: 'red' }}> Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};
export default FormRecipe;
