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

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
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
        <section class="bg-gray-50 dark:bg-gray-900">
          <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Post Create App
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login User
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required=""
                      onChange={handleLogChange}
                    />
                    {validateError.email && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {validateError.email}
                      </span>
                    )}
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={handleLogChange}
                    />
                    {validateError.password && (
                      <span
                        className="text-danger"
                        style={{ fontSize: "13px" }}
                      >
                        {validateError.password}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    onClick={handleLogin}
                    style={{
                      background: "rgb(37 99 235 / var(--tw-bg-opacity))",
                    }}
                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Login Here
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    You don't have an account?{" "}
                    <Link
                      to={"/register"}
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Register here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Container>
      {/* <Container>
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
      </Container> */}
    </div>
  );
}
