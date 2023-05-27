import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { useRecoilState } from 'recoil';
import { authAtom } from 'src/states/authAtom';
import { userAtom } from 'src/states/userAtom';
import { login } from 'src/utils/authService';
// components
import Iconify from '../../../components/iconify';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const [, setAuth] = useRecoilState(authAtom);
  const [, setUser] = useRecoilState(userAtom);

  const handleClick = async() => {
    setLoading(true);
    try {
      await login(email, password);
      setAuth(localStorage.getItem('accessToken'));
      setUser(localStorage.getItem('user'));
      if(login) navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error(error);
      setMsg("email ou mot de passe incorrect");
    }
    setLoading(false);
    //  
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={(e) => {
                    setEmail(e.target.value);
                }} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => {
            setPassword(e.target.value);}
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>
      { (msg) && <Alert severity='warning'> {msg} </Alert>}

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading} onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
