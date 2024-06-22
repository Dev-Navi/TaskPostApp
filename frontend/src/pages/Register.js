import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { registerAction } from "../actions/apiActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

let toastOPtion = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

let initialstate = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmpassword: "",
  role: "",
};

export default function Register() {
  const [formdata, setformdata] = useState(initialstate);
  const [validateError, setValidateError] = useState({});

  const { email, confirmpassword, name, role, password, phone } = formdata;

  const handleRegChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formdata, ...{ [name]: value } };
    setformdata(formData);
  };

  const formValidation = () => {
    try {
      let validateError = {};
      if (name.trim() == "") {
        validateError.name = "Name Required";
      } else if (email.trim() == "") {
        validateError.email = "Email Required";
      } else if (!ValidateEmail(email)) {
        validateError.email = "Email not valid";
      } else if (phone.trim() == "") {
        validateError.phoneNo = "Mobile Number Required";
      } else if (password.trim() == "") {
        validateError.password = "Password Required";
      } else if (confirmpassword.trim() == "") {
        validateError.confirmpassword = "Confirm Password Required";
      } else if (password != confirmpassword) {
        validateError.confirmpassword =
          "Password and Confirm Password Does not Match";
      } else if (role == "") {
        validateError.role = "Role Required";
      }
      setValidateError(validateError);
      return validateError;
    } catch (err) {
      console.log(err);
    }
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  const handleRegSubmit = async () => {
    try {
      const check = await formValidation();
      var errorsSize = Object.keys(check).length;
      if (errorsSize == 0) {
        const payload = {
          email,
          password,
          name,
          confirmpassword,
          phone,
          role,
        };
        const result = await registerAction(payload);
        console.log(result, result.status, "ffff");
        if (result.status) {
          toast.success("Registeration Successfully Completed", toastOPtion);
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <h1 className="text-center my-4"> Register</h1>
        <Form>
          <Row>
            <Col>
              <Form.Control
                placeholder="Name"
                name="name"
                onChange={handleRegChange}
              />
              {validateError.name && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {validateError.name}
                </span>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder="Email"
                name="email"
                onChange={handleRegChange}
              />
              {validateError.email && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {validateError.email}
                </span>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder="Phone"
                name="phone"
                onChange={handleRegChange}
              />
              {validateError.phoneNo && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {validateError.phoneNo}
                </span>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleRegChange}
              />
              {validateError.password && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {validateError.password}
                </span>
              )}
            </Col>
            <Col>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                onChange={handleRegChange}
              />
              {validateError.confirmpassword && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {validateError.confirmpassword}
                </span>
              )}
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                name="role"
                onChange={handleRegChange}
              >
                <option>Select Role</option>
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </Form.Select>
              {validateError.role && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {validateError.role}
                </span>
              )}
            </Col>
          </Row>
          <Button
            className="mt-4 text-center"
            variant="primary"
            onClick={handleRegSubmit}
          >
            Submit
          </Button>{" "}
        </Form>
        <Link to="/login">Login</Link>
      </Container>
    </div>
  );
}
