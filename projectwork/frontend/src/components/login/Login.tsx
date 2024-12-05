import React, { useState } from "react";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import LiquidWarp from "../liquidwarp/LiquidWarp";
import * as THREE from "three";
import { FormGroup } from "../formcomponents/formComponents";
import Form from "../formcomponents/Form";
import Button from "../../common/button/Button";

const Login = () => {

  return (
    <div>
      <LoginContainer />
      <div className="position-absolute start-0 top-0 z-0">
        <LiquidWarp background={new THREE.Color(0, 0, 0)} color={new THREE.Color(1, 1, 1)} seed={0} />
      </div>
    </div >


  );
};

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email: ${email}\nPassword: ${password}`);
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
        <Button text="Log In" buttonStyle="btn-success" onClick={() => {/*LOGIN */ }} />
      </div>

    </Form>
  )
}

interface FormGroupProps {
  extraStyle?: string;
  children: React.ReactNode;
}

// function FormGroup({ extraStyle = "", children }: FormGroupProps) {

//   return (
//     <div className={classes.formGroup + " " + extraStyle} >
//       {children}
//     </div>
//   )
// }

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
