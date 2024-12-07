import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../common/button/Button";
import { FormGroup, FormCheckboxGroup } from "../formcomponents/formComponents"
import Form from "../formcomponents/Form";
import { registerUser } from "../../network/registerUser";
import { useUser } from "../context/UserContext";
import config from '../../config';

const RegistrationForm = () => {
  const { user, isLoggedIn } = useUser();
  useEffect(() => {
    if (user || isLoggedIn) navigate("/");
  }, [user, isLoggedIn]);
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    confirmPassword: "",
    privacyPolicy: false,
    dateOfBirth: new Date().toISOString(),
    subscribe: false
  });

  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type == "checkbox") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.checked
      });
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }
    if (!formData.privacyPolicy) {
      alert("El kell fogadnia az Adatvédelmi Tájékoztatót!");
      return;
    }
    console.log(formData);
    try {
      const response = await registerUser(config.apiBaseUrl+"/api/users/register", formData.firstName, formData.email, formData.password, formData.firstName, formData.lastName, formData.dateOfBirth, formData.subscribe) as any;
      if (response.ok) navigate("/login");
    }
    catch(e:any) {
      alert("Registration failed "+e.message);
    }
    
  };

  return (
    <>
      <h2>Register</h2>
      <Form handleSubmit={handleSubmit}>
        <FormGroup label="Last name" type="text" idAndName="lastName" defaultValue={formData.lastName} onChange={handleChange} />
        <FormGroup label="First name" type="text" idAndName="firstName" defaultValue={formData.firstName} onChange={handleChange} />
        <FormGroup label="Email address" type="email" idAndName="email" defaultValue={formData.email} onChange={handleChange} />
        <FormGroup label="Password" type="password" idAndName="password" defaultValue={formData.password} onChange={handleChange} />
        <FormGroup label="Confirm password" type="password" idAndName="confirmPassword" defaultValue={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
        <FormGroup label="Date of birth" type="date" idAndName="dateofbirth" defaultValue={formData.dateOfBirth} onChange={handleChange} />

        <FormCheckboxGroup label={<div>I agree to the <Link to="#">Privacy Policy</Link></div>} value={formData.privacyPolicy} idAndName="privacyPolicy" onChange={handleChange} />
        <FormCheckboxGroup label="Subscribe to our newsletter" value={formData.subscribe} idAndName="subscribe" onChange={handleChange} required={false} />

        <div className="w-100 d-flex justify-content-end">
          <Button text="Register" onClick={() => { }} buttonStyle="btn-success" />
        </div>
      </Form>

    </>

  );
};

export default RegistrationForm;
