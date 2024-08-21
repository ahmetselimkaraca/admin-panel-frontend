import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login, register } from "../services/api";
import { Input, Button, Card, CardHeader } from "@nextui-org/react";

import Logo from "../assets/logo-outlined.svg";
import SideImage from "../assets/image.png";

import SkIcon from "../components/icons/SkIcon";

function Auth() {
  // State variables to manage input fields and error messages
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  // Hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();
  const isRegisterMode = location.pathname === "/register";

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  // Reset errors when the route changes
  useEffect(() => {
    setErrors({});
    setLoginError("");
  }, [location.pathname]);

  // Password validation function
  const validatePassword = (password) => {
    const passwordRequirements =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
    return passwordRequirements.test(password);
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegisterMode) {
      // Validate password if in register mode
      if (!validatePassword(password)) {
        setErrors({
          password:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one non-alphanumeric character.",
        });
        return;
      } else {
        setErrors({});
      }

      try {
        await register({ username, email, password });
        navigate("/login");
      } catch (error) {
        // Handle registration errors
        if (error.response && error.response.data) {
          const errorMessages = error.response.data.reduce((acc, err) => {
            if (err.code === "DuplicateUserName") {
              acc.username = "Username is already taken.";
            }
            if (err.code === "DuplicateEmail") {
              acc.email = "Email is already taken.";
            }
            return acc;
          }, {});
          setErrors(errorMessages);
        } else {
          console.error(error);
        }
      }
    } else {
      // Handle login errors
      try {
        const response = await login({ username, password });
        localStorage.setItem("token", response.data);
        navigate("/");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setLoginError("Check your credentials and try again.");
        } else {
          console.error(error);
        }
      }
    }
  };

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url(/waves.svg)" }}
    >
      <Card className="flex items-center justify-center p-0 w-full max-w-4xl h-auto md:h-2/3">
        <div className="flex w-full h-full">
          <div className="flex flex-col items-center justify-center p-10 w-full md:w-1/2">
            <CardHeader className="flex items-center flex-col mb-4 gap-4">
              <SkIcon height={14} />
              <h1 className="text-2xl font-bold">Admin Panel</h1>
            </CardHeader>
            <h2 className="text-lg mb-4">
              {isRegisterMode ? "Register" : "Login"}
            </h2>
            <form
              className="flex gap-3 flex-col w-full"
              onSubmit={handleSubmit}
            >
              <Input
                type="text"
                label="Username"
                value={username}
                isInvalid={errors.username}
                color={errors.username ? "danger" : "default"}
                errorMessage={errors.username}
                onChange={(e) => setUsername(e.target.value)}
                clearable
                bordered
              />
              {isRegisterMode && (
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  isInvalid={errors.email}
                  color={errors.email ? "danger" : "default"}
                  errorMessage={errors.email}
                  onChange={(e) => setEmail(e.target.value)}
                  clearable
                  bordered
                />
              )}
              <Input
                type="password"
                label="Password"
                value={password}
                isInvalid={errors.password}
                color={errors.password ? "danger" : "default"}
                errorMessage={errors.password}
                onChange={(e) => setPassword(e.target.value)}
                clearable
                bordered
              />
              <Button type="submit" fullWidth color="primary">
                {isRegisterMode ? "Register" : "Login"}
              </Button>
              <div className="mt-2 h-2">
                {loginError && (
                  <p className="text-center text-danger">{loginError}</p>
                )}
              </div>
              <p className="mt-4 text-center">
                {isRegisterMode ? (
                  <>
                    {`Already have an account? `}
                    <Link to="/login" className="text-primary hover:underline">
                      Login here
                    </Link>
                  </>
                ) : (
                  <>
                    {`Don't have an account? `}
                    <Link
                      to="/register"
                      className="text-primary hover:underline"
                    >
                      Register here
                    </Link>
                  </>
                )}
              </p>
            </form>
          </div>
          <div className="hidden md:block w-1/2 h-full relative">
            <img
              src={SideImage}
              alt="Side"
              className="h-full w-full object-cover rounded-r-lg"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Auth;
