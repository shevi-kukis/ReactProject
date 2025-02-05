import { TextField, Button, Typography, Modal, Box } from '@mui/material';
import { FormEvent, useContext, useState } from 'react';
import { UserContext } from '../reducer/userReducer';
import axios from 'axios';

const UpdateUser = () => {
  const userDetail = useContext(UserContext);
  const [toUpdate, setUpdate] = useState(false);
  const [firstName, setFirstName] = useState(userDetail.user.firstName || '');
  const [lastName, setLastName] = useState(userDetail.user.lastName || '');
  const [email, setEmail] = useState(userDetail.user.email || '');
  const [address, setAddress] = useState(userDetail.user.address || '');
  const [password, setPassword] = useState(userDetail.user.password || '');
  const [phone, setPhone] = useState(userDetail.user.phone || '');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedData = {
        firstName, lastName, email, address, password, phone, id: userDetail.user.id
      };
      await axios.put('http://localhost:3000/api/user', updatedData, {
        headers: {
          'user-id': userDetail.user.id
        }
      });
      userDetail.Dispatch({
        type: 'UPDATE_USER',
        data: { firstName, lastName, email, address, password, phone, id: userDetail.user.id },
      });
      setUpdate(false);
    } catch (e: any) {
      console.error("Error in login/register:", e);
      if (e.response?.status === 404) alert(e.response.data.message);
    }
  };

  const handleUpdate = () => {
    setUpdate(true);
  };

  return (
    <>
      <Button onClick={handleUpdate} variant="outlined" sx={{ color: 'red', borderColor: 'red' }}>
        Update user details
      </Button>
      <Modal open={toUpdate} onClose={() => setUpdate(false)}>
        <Box sx={{
          padding: 4, backgroundColor: 'white', borderRadius: 2, maxWidth: 500, width: '100%',
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          boxShadow: 24
        }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" gutterBottom align="center" sx={{ color: 'red' }}>
              Update user details
            </Typography>
            <TextField label="First Name" variant="outlined" fullWidth margin="normal"
              value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <TextField label="Last Name" variant="outlined" fullWidth margin="normal"
              value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            <TextField label="Address" variant="outlined" fullWidth margin="normal"
              value={address} onChange={(e) => setAddress(e.target.value)} required />
            <TextField label="Email" variant="outlined" fullWidth margin="normal"
              value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />
            <TextField label="Password" variant="outlined" fullWidth margin="normal"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField label="Phone" variant="outlined" fullWidth margin="normal"
              value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <Button onClick={handleSubmit} type="submit" variant="contained"
              sx={{ backgroundColor: 'red', color: 'white', width: '100%',
               marginTop: 2, '&:hover': { backgroundColor: 'darkred' } }}>
              Send
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateUser;
