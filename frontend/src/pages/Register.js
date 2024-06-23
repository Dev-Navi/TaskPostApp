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
  console.log(formdata, "formdata");
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
      }
      if (email.trim() == "") {
        validateError.email = "Email Required";
      }
      if (!ValidateEmail(email)) {
        validateError.email = "Email not valid";
      }
      if (phone.trim() == "") {
        validateError.phoneNo = "Mobile Number Required";
      }
      if (password.trim() == "") {
        validateError.password = "Password Required";
      }
      if (confirmpassword.trim() == "") {
        validateError.confirmpassword = "Confirm Password Required";
      }
      if (password != confirmpassword) {
        validateError.confirmpassword =
          "Password and Confirm Password Does not Match";
      }
      if (role == "") {
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

  const handleRegSubmit = async (e) => {
    try {
      e.preventDefault();
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
        console.log(result, result?.status, "ffff");
        if (result.status) {
          toast.success("Registeration Successfully Completed", toastOPtion);
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        } else {
          console.log(result, "result111");
          toast.error(result.message, toastOPtion);
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
                  Create an account
                </h1>
                <form class="space-y-4 md:space-y-6" action="#">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John Doe"
                        required=""
                        onChange={handleRegChange}
                      />
                      {validateError.name && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {validateError.name}
                        </span>
                      )}
                    </div>
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
                        onChange={handleRegChange}
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
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        for="confirmpassword"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmpassword"
                        id="confirmpassword"
                        placeholder="••••••••"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={handleRegChange}
                      />
                      {validateError.confirmpassword && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {validateError.confirmpassword}
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
                        onChange={handleRegChange}
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
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label
                        for="email"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Your Mobile
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="9876543210"
                        required=""
                        onChange={handleRegChange}
                      />
                      {validateError.phoneNo && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {validateError.phoneNo}
                        </span>
                      )}
                    </div>

                    <div>
                      <label
                        for="confirmpassword"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select Role
                      </label>
                      <select
                        id="role"
                        name="role"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleRegChange}
                      >
                        <option value="">Select</option>
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                      </select>
                      {validateError.role && (
                        <span
                          className="text-danger"
                          style={{ fontSize: "13px" }}
                        >
                          {validateError.role}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleRegSubmit}
                    style={{
                      background: "rgb(37 99 235 / var(--tw-bg-opacity))",
                    }}
                    class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Container>
      {/* <Container>
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
      </Container> */}
    </div>
  );
}
