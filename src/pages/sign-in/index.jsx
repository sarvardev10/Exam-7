import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../service/index";
import { Notification } from "../../utils/index";
import { signInValidationSchema } from "../../utils/validation";

const Index = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const response = await auth.sign_in(values);
      if (response.status === 200) {
        navigate("/");
        localStorage.setItem("access_token", response.data.access_token);
        Notification({
          title: "Sign In Successful",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
      Notification({
        title: "Sign In Failed",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center p-5">
        <h1 className="text-4xl font-semibold text-center mb-6">
          Login
        </h1>
        <div className="max-w-md w-full">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={signInValidationSchema}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="email"
                  type="email"
                  as={TextField}
                  label="Email address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="text-red-500 text-xs"
                    />
                  }
                />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  as={TextField}
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <ErrorMessage
                      name="password"
                      component="span"
                      className="text-red-500 text-xs"
                    />
                  }
                  InputProps={{
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
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: "#40E0D0", // Turquoise background
                    color: "#FFFFFF", // White text color
                    '&:hover': {
                      backgroundColor: "#36CFC9", // Darker turquoise on hover
                    },
                    mb: 2, // Margin bottom for spacing
                    py: 1.5, // Padding Y for button height
                  }}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    color: '#007BFF', // Blue color for forgot password link
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#0056b3', // Darker blue on hover
                    },
                    mb: 2, // Margin bottom for spacing
                  }}
                  onClick={() => setOpen(true)} // Uncomment if you use the forgot password modal
                >
                  {/* Forgot your password? */}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: 'center',
                    color: '#007BFF', // Blue color for registration link
                    cursor: 'pointer',
                    '&:hover': {
                      color: '#0056b3', // Darker blue on hover
                    },
                  }}
                  onClick={() => navigate("/sign-up")}
                >
                  {/* Register */}
                </Typography>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Index;
