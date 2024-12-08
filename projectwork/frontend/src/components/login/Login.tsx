import React, { useEffect, useState } from "react";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import LiquidWarp from "../liquidwarp/LiquidWarp";
import * as THREE from "three";
import { FormGroup } from "../formcomponents/formComponents";
import Form from "../formcomponents/Form";
import Button from "../../common/button/Button";
import { loginUser } from "../../network/loginUser";
import { useUser } from "../context/UserContext";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user || isLoggedIn) navigate("/");
  }, [user, isLoggedIn, navigate]);
  return (
    <>
      {!user && !isLoggedIn &&
        <div>
          <LoginContainer />
          <div className="position-absolute start-0 top-0 z-0">
            <LiquidWarp background={new THREE.Color(0, 0, 0)} color={new THREE.Color(1, 1, 1)} seed={0} />
          </div>
        </div >
      }
    </>




  );
};

function LoginContainer() {
  const { setIsLoggedIn } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password) as any;
      if (!response.token) throw new Error("No token in response");
      setIsLoggedIn(true);
      if (redirect) { 
        navigate("/order"); 
        return; 
      }
      navigate("/");
    }
    catch (e: any) {
      alert("Login failed, " + e.message);
    }

  };

  return (
    <Form handleSubmit={handleSubmit}>
      <h2>Login</h2>

      <FormGroup defaultValue={email} idAndName="email" label="Email" onChange={(e) => setEmail(e.target.value)} type="text" />
      <PasswordInput password={password} setPassword={setPassword} />

      <div className={classes.formLinks}>
        <Link to="/forgot-password" className={classes.forgotPasswordLink}>
          Forgot password?
        </Link>
        <span> | </span>
        <Link to="/register" className={classes.createAccountLink}>
          Create an account
        </Link>
      </div>

      <div className="d-flex justify-content-end">
        <Button text="Log In" buttonStyle="btn-success" onClick={() => { }} />
      </div>

    </Form>
  )
}

interface PasswordInputProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

function PasswordInput({ password, setPassword }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <FormGroup label="Password" defaultValue={password} onChange={(e) => { setPassword(e.target.value) }} idAndName="password" type={showPassword ? "text" : "password"} />
      <button
        type="button"
        className={classes.togglePassword}
        onClick={togglePasswordVisibility}
        aria-label="Toggle password visibility"
      >
        {showPassword ? "👁️" : "🙈"}
      </button>
    </>

  )
}

export default Login;
