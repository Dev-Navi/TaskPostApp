import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { LoginUser } from "../actions/apiActions";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";
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

const initialstate = {
  email: "",
  password: "",
};

export default function Login() {
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState(initialstate);
  const [validateError, setValidateError] = useState({});

  const [cookies, setCookie, removeCookie] = useCookies(["name"]);

  const { email, password } = formdata;
  const handleLogChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formData = { ...formdata, ...{ [name]: value } };
    setformdata(formData);
  };
  const Fromvalidation = async () => {
    try {
      var validateError = {};
      if (email.trim() == "") {
        validateError.email = "Email Required";
      } else if (!ValidateEmail(email)) {
        validateError.email = "Invalid Email Address";
      }
      if (password.trim() == "") {
        validateError.password = "Password Required";
      }
      setValidateError(validateError);
      return validateError;
    } catch (err) {
      //console.log(err);
    }
  };

  function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  const handleLogin = async () => {
    try {
      const check = await Fromvalidation();
      var errorsSize = Object.keys(check).length;
      if (errorsSize == 0) {
        var payload = {
          email: email,
          password: password,
        };

        const result = await LoginUser(payload, dispatch);

        if (result.status == false) {
          let validateError = {};
          validateError.email = result.message.email;
          validateError.password = result.message.password;
          setValidateError(validateError);
        } else {
          setCookie("loggedin", true, { path: "/dashboard" });
          Cookies.set("userToken", result.result.token, { path: "/" });
          toast.success("Login Successfully Completed", toastOPtion);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Container>
        <h1 className="text-center my-4"> Login</h1>
        <Form>
          <Row>
            <Col>
              <Form.Control
                placeholder="Email"
                name="email"
                onChange={handleLogChange}
              />
              {validateError.email && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {validateError.email}
                </span>
              )}
            </Col>
            <Col>
              <Form.Control
                placeholder="Password"
                type="password"
                name="password"
                onChange={handleLogChange}
              />
              {validateError.password && (
                <span className="text-danger" style={{ fontSize: "13px" }}>
                  {validateError.password}
                </span>
              )}
            </Col>
          </Row>
          <Button
            className="mt-4 text-center"
            variant="primary"
            onClick={handleLogin}
          >
            Submit
          </Button>{" "}
        </Form>
        <Link to="/register">Register</Link>
      </Container>
    </div>
  );
}
