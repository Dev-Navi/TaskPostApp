import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { PostCreate, PostEdit } from "../actions/apiActions";
import NavBar from "../component/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { getMyPost } from "../redux/features/getMyPost/getMyPost";
import { getUserProfile } from "../redux/features/userSlice/userSlice";
import { allUserGet } from "../redux/features/allUserSlice/allUserSlice";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

const initialState = {
  title: "",
  desc: "",
  image: "",
  date: "",
  file: null,
};
const initialState1 = {
  title1: "",
  desc1: "",
  image1: "",
  date1: "",
  file1: null,
};
export default function Home() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [ides, setIdes] = useState();
  const [formData, setFormData] = useState(initialState);
  const [formData1, setFormData1] = useState(initialState1);
  const [validateError, setValidateError] = useState({});
  const [validateError1, setValidateError1] = useState({});
  const [ediFo, setEdiFo] = useState();
  const posts = useSelector((state) => state.post.posts);
  const status = useSelector((state) => state.post.status);
  const user = useSelector((state) => state.user);
  const allUser = useSelector((state) => state.allUser.users);
  console.log(posts, "posts", status, user, allUser);
  const { title, image, desc, date, file } = formData;
  const { title1, desc1, file1 } = formData1;

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log(id, "ididid");
    setIdes(id);
    setShow(true);
  };

  const handleClose1 = () => setShow1(false);
  const handleShow1 = (ele) => {
    console.log(ele, "fffffffffffffff");
    setEdiFo(ele._id);
    setFormData1({
      ...formData1,
      ...{ title1: ele.title, desc1: ele.desc },
    });
    setShow1(true);
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(getMyPost(ides));
    }
  }, [dispatch, status, ides, show]);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(allUserGet());
  }, []);

  const handlePstChange = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    let formdata = { ...formData };
    if (name == "image") {
      formdata.file = files[0];
    } else {
      formdata = { ...formData, ...{ [name]: value } };
    }
    setFormData(formdata);
  };
  const handlePstChange1 = (e) => {
    e.preventDefault();
    const { name, value, files } = e.target;
    let formdata = { ...formData1 };
    if (name == "image") {
      formdata.file1 = files[0];
    } else {
      formdata = { ...formData1, ...{ [name]: value } };
    }
    setFormData1(formdata);
  };
  console.log(formData, "formData");

  const formValidation = async () => {
    let validateError = {};
    if (title.trim() == "") {
      validateError.title = "Title Required";
    }
    if (desc.trim() == "") {
      validateError.desc = "Descrition Required";
    }
    if (file == "") {
      validateError.image = "Image Required";
    }
    if (date == "") {
      validateError.date = "Date Required ";
    }
    setValidateError(validateError);
    return validateError;
  };

  const formValidation1 = async () => {
    let validateError = {};
    if (title1.trim() == "") {
      validateError.title1 = "Title Required";
    }
    if (desc1.trim() == "") {
      validateError.desc1 = "Descrition Required";
    }

    setValidateError1(validateError);
    return validateError;
  };

  const handlePostCreate = async () => {
    const check = await formValidation();
    console.log(check, "checkwwwww");
    var errorsSize = Object.keys(check).length;
    console.log(errorsSize, "errorsSize");
    if (errorsSize == 0) {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("image", file);
      formData.append("date", date);
      const result = await PostCreate(formData);
      if (result.status) {
        console.log("Done");
        dispatch(getMyPost());
        window.location.reload();
      }
    }
  };

  const handlePostDit = async () => {
    const check = await formValidation1();
    console.log(check, "check121212");
    var errorsSize = Object.keys(check).length;
    console.log(errorsSize, "errorsSize");
    if (errorsSize == 0) {
      //   let formData = new FormData();
      //   formData.append("title1", title1);
      //   formData.append("desc1", desc1);
      //   formData.append("image1", file1);
      //   formData.append("id", ediFo);
      const payload = {
        title1,
        desc1,
        id: ediFo,
      };
      const result = await PostEdit(payload);
      if (result.status) {
        console.log("Done");
        dispatch(getMyPost());
        window.location.reload();
      }
    }
  };

  return (
    <div>
      <NavBar />
      <Container>
        {user.UserRole == "Admin" ? (
          <>
            <h1 className="text-center my-4"> Users List</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Posts</th>
                </tr>
              </thead>
              <tbody>
                {allUser.length > 0 &&
                  allUser.map((ele, i) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td>{ele.name}</td>
                        <td>{ele.phone}</td>
                        <td>{ele.email}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => handleShow(ele._id)}
                          >
                            List
                          </Button>{" "}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            {" "}
            <h1 className="text-center my-4"> Create Post</h1>
            <Form>
              <Row>
                <Col>
                  <Form.Control
                    placeholder="Title"
                    name="title"
                    onChange={handlePstChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Description"
                    name="desc"
                    onChange={handlePstChange}
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control
                      type="file"
                      name="image"
                      onChange={handlePstChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    name="date"
                    onChange={handlePstChange}
                  />
                </Col>
              </Row>
              <Button
                className="mt-4 text-center"
                variant="primary"
                onClick={handlePostCreate}
              >
                Submit
              </Button>{" "}
            </Form>
            <hr />
            <Row>
              {posts.length > 0 &&
                posts.map((ele) => {
                  return (
                    <Col>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img
                          variant="top"
                          src={"http://localhost:4000/postImg/" + ele.image}
                        />
                        <Card.Body>
                          <Card.Title>{ele.title}</Card.Title>
                          <Card.Text>{ele.desc}</Card.Text>
                          <ListGroup.Item className="mb-4">
                            {moment(ele.createdAt).format("lll")}
                          </ListGroup.Item>
                          <Button
                            variant="info"
                            onClick={() => handleShow1(ele)}
                          >
                            Edit
                          </Button>{" "}
                          <Button variant="danger">Delete</Button>
                        </Card.Body>
                      </Card>{" "}
                    </Col>
                  );
                })}
            </Row>
          </>
        )}
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Posts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {posts.length > 0 &&
            posts.map((ele) => {
              return (
                <Col className="mb-4" style={{ textAlign: "center" }}>
                  <Card style={{ width: "18rem", textAlign: "center" }}>
                    <Card.Img
                      variant="top"
                      src={"http://localhost:4000/postImg/" + ele.image}
                    />
                    <Card.Body>
                      <Card.Title>{ele.title}</Card.Title>
                      <Card.Text>{ele.desc}</Card.Text>
                      <ListGroup.Item className="mb-4">
                        {moment(ele.createdAt).format("lll")}
                      </ListGroup.Item>
                    </Card.Body>
                  </Card>{" "}
                </Col>
              );
            })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <h4 className="text-center my-4"> Edit Post</h4>
          <Form>
            <Row>
              <Col>
                <Form.Control
                  placeholder="Title"
                  name="title1"
                  defaultValue={title1}
                  onChange={handlePstChange1}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Description"
                  name="desc1"
                  defaultValue={desc1}
                  onChange={handlePstChange1}
                />
              </Col>
            </Row>
            <Row className="mt-4">
              {/* <Col>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control
                    type="file"
                    name="image1"
                    onChange={handlePstChange1}
                  />
                </Form.Group>
              </Col> */}
              {/* <Col>
                <Form.Control
                  type="date"
                  placeholder="Date"
                  defaultValue={ediFo.date}
                  name="date"
                  onChange={handlePstChange}
                />
              </Col> */}
            </Row>
            <Button
              className="mt-4 text-center"
              variant="primary"
              onClick={handlePostDit}
            >
              Submit
            </Button>{" "}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
