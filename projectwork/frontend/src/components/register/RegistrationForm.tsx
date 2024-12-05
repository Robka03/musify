import React, { HTMLInputTypeAttribute, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../common/button/Button";
import { FormGroup, FormCheckboxGroup } from "../formcomponents/formComponents"
import Form from "../formcomponents/Form";

const RegistrationForm = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("A jelszavak nem egyeznek!");
      return;
    }
    if (!formData.privacyPolicy) {
      alert("El kell fogadnia az Adatvédelmi Tájékoztatót!");
      return;
    }
    alert("Sikeres regisztráció!");
    console.log(formData);
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
        <FormCheckboxGroup label="Subscribe to our newsletter" value={formData.subscribe} idAndName="subscribe" onChange={handleChange} />

        <div className="w-100 d-flex justify-content-end">
          <Button text="Register" onClick={() => {/*create user api*/ }} buttonStyle="btn-success" />
        </div>
      </Form>

    </>

  );
};

export default RegistrationForm;
