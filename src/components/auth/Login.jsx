import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Avatar,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Divider,
  useTheme,
  alpha
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Business,
  Person
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
});

const registerValidationSchema = yup.object({
  firstName: yup
    .string('Enter your first name')
    .min(2, 'First name should be at least 2 characters')
    .required('First name is required'),
  lastName: yup
    .string('Enter your last name')
    .min(2, 'Last name should be at least 2 characters')
    .required('Last name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string('Confirm your password')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const theme = useTheme();

  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      
      try {
        await login(values.email, values.password);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      } finally {
        setLoading(false);
      }
    },
  });

  const registerFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      
      try {
        await register({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        });
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed');
      } finally {
        setLoading(false);
      }
    },
  });

  const currentFormik = isRegister ? registerFormik : loginFormik;

  return (
    <>
      <Helmet>
        <title>{isRegister ? 'Register' : 'Login'} - CRM System</title>
      </Helmet>
      
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(/assets/grid-pattern.svg)',
            opacity: 0.1,
          }
        }}
      >
        <Container component="main" maxWidth="sm" sx={{ display: 'flex', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: '100%', position: 'relative', zIndex: 1 }}
          >
            <Paper
              elevation={24}
              sx={{
                p: 4,
                borderRadius: 3,
                background: alpha(theme.palette.background.paper, 0.95),
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar
                  sx={{
                    m: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    width: 64,
                    height: 64,
                  }}
                >
                  <Business fontSize="large" />
                </Avatar>
                <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                  CRM System
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {isRegister ? 'Create your account' : 'Sign in to your account'}
                </Typography>
              </Box>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                </motion.div>
              )}

              <Box component="form" onSubmit={currentFormik.handleSubmit} noValidate>
                {isRegister && (
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={registerFormik.values.firstName}
                      onChange={registerFormik.handleChange}
                      error={registerFormik.touched.firstName && Boolean(registerFormik.errors.firstName)}
                      helperText={registerFormik.touched.firstName && registerFormik.errors.firstName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={registerFormik.values.lastName}
                      onChange={registerFormik.handleChange}
                      error={registerFormik.touched.lastName && Boolean(registerFormik.errors.lastName)}
                      helperText={registerFormik.touched.lastName && registerFormik.errors.lastName}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="action" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  value={currentFormik.values.email}
                  onChange={currentFormik.handleChange}
                  error={currentFormik.touched.email && Boolean(currentFormik.errors.email)}
                  helperText={currentFormik.touched.email && currentFormik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={currentFormik.values.password}
                  onChange={currentFormik.handleChange}
                  error={currentFormik.touched.password && Boolean(currentFormik.errors.password)}
                  helperText={currentFormik.touched.password && currentFormik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {isRegister && (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={registerFormik.values.confirmPassword}
                    onChange={registerFormik.handleChange}
                    error={registerFormik.touched.confirmPassword && Boolean(registerFormik.errors.confirmPassword)}
                    helperText={registerFormik.touched.confirmPassword && registerFormik.errors.confirmPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                  }}
                >
                  {loading ? 'Please wait...' : isRegister ? 'Create Account' : 'Sign In'}
                </Button>

                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2">
                    {isRegister ? 'Already have an account? ' : "Don't have an account? "}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsRegister(!isRegister);
                        setError('');
                        currentFormik.resetForm();
                      }}
                      sx={{ fontWeight: 'bold' }}
                    >
                      {isRegister ? 'Sign In' : 'Sign Up'}
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Demo credentials */}
            <Paper
              sx={{
                mt: 2,
                p: 2,
                background: alpha(theme.palette.background.paper, 0.8),
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" display="block" gutterBottom>
                Demo Credentials
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Admin: admin@demo.com / admin123<br />
                User: user@demo.com / user123
              </Typography>
            </Paper>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}

export default Login;