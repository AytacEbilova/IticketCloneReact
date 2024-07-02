import { useContext, useState } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import styles from "../Header/header.module.scss";
import { CiHeart, CiSearch } from "react-icons/ci";
import { SlBasket } from "react-icons/sl";
import { IoPersonOutline } from "react-icons/io5";
import { Button, Modal, Input, Form, message, Dropdown, Menu } from "antd";
import { useFormik } from "formik";
import userValidation from "../../validation/register.validation.js";
import controller from "../../services/api/request.js";
import { endpoints } from "../../services/api/constant.js";
import Swal from "sweetalert2";
import loginValidation from "../../validation/login.validation.js";
import { useGetOneUserQuery } from "../../services/redux/userApi.js";
import { FavContext } from "../../context/favoriteContext.jsx";
const sendVerifyEmail = require("../helpers/sendMail");

// import { useContext } from "react"

const Header = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const navigate = useNavigate();
  const userDataJson = localStorage.getItem("user");
  const { id } = useParams();
  const user = JSON.parse(userDataJson);
  const { data: userId } = useGetOneUserQuery(id);
  const { fav } = useContext(FavContext);
  // const userId= user?._id

  const handleClick = (path) => {
    setActiveLink(path);
  };
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleVerifyCancel = () => {
    setIsModalOpen(false);
  };

  const onFinishLogin = (values) => {
    console.log("Login Success:", values);
    setIsModalOpen(false);
    message.success("Login successful!");
  };

  const onFinishFailedLogin = (errorInfo) => {
    console.log("Login Failed:", errorInfo);
  };

  const switchToRegister = () => {
    setActiveTab("register");
  };

  const switchToLogin = () => {
    setActiveTab("login");
  };

  const loginUser = async (email, password) => {
    console.log("login started");
    try {
      const response = await controller.getAll(endpoints.users);
      let users = response.data;
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1000,
        });
        setIsModalOpen(false);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "An error occurred during login",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  const showModal = () => {
    const user = getUser();
    if (user) {
      navigate(`/profile/${userId}`);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleVerifyCode = ()=>{

  }

  //formik
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: async (values, actions) => {
      await loginUser(values.email, values.password);
      actions.resetForm();
    },
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: userValidation,
    onSubmit: async (values, actions) => {
      const newUser = {
        firstName: values.firstName,
        lastName: values.lastName,
        mobile: values.mobile,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      try {
        console.log("Sending request to:", endpoints.users);
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        if (email) {
          localStorage.setItem(email, randomCode);
        }
        sendVerifyEmail(newUser.email, token);

        //open modal

        const response = await controller.post(endpoints.users, newUser);
        console.log("Response received:", response);

        if (response.response) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: response.response.data.message,
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Sign Up successfully",
            showConfirmButton: false,
            timer: 1000,
          });
          actions.resetForm();

          setRegisteredEmail(values.email);
          await loginUser(values.email, values.password);
        }
      } catch (error) {
        console.error("Error during request:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "An error occurred",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
  });
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={`/profile/${userId?._id}`}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/wallet">Wallet</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/giftcard">GiftCard</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/update-pass">Update Password</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <header>
      <div className="container">
        <div className={styles.all}>
          <div className={styles.logo}>
            <Link to="/">
              <svg
                viewBox="0 0 160 43"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M28.4104 40.7111V42.6294H6.7431C3.01861 42.6294 0.000244141 39.6111 0.000244141 35.8874V7.15433C0.000244141 3.42616 3.01861 0.408203 6.7431 0.408203H28.4104V2.3229C26.7358 2.34902 25.377 3.71555 25.377 5.39677C25.377 7.07514 26.7358 8.44167 28.4104 8.46412V10.3862C26.7358 10.4127 25.377 11.7751 25.377 13.4572C25.377 15.1392 26.7358 16.5049 28.4104 16.5278V18.4462C26.7358 18.4727 25.377 19.8351 25.377 21.5204C25.377 23.1988 26.7358 24.5649 28.4104 24.5874V26.5098C26.7358 26.5323 25.377 27.8984 25.377 29.5804C25.377 31.2584 26.7358 32.6286 28.4104 32.6515V34.5694C26.7358 34.5923 25.377 35.9584 25.377 37.6409C25.377 39.3221 26.7358 40.6886 28.4104 40.7111"
                  fill="#FFDC00"
                ></path>{" "}
                <path
                  d="M124.469 30.4205C124.469 31.8278 123.327 32.9691 121.919 32.9691C120.512 32.9691 119.374 31.8278 119.374 30.4205C119.374 29.0123 120.512 27.8711 121.919 27.8711C123.327 27.8711 124.469 29.0123 124.469 30.4205Z"
                  fill="#FFDC00"
                ></path>{" "}
                <path
                  d="M11.6436 32.3849H15.4317V17.1028L11.6436 18.3792V32.3849Z"
                  fill="#828283"
                ></path>{" "}
                <path
                  d="M13.5391 10.6494C12.1313 10.6494 10.9897 11.7947 10.9897 13.1988C10.9897 14.6061 12.1313 15.7474 13.5391 15.7474C14.9468 15.7474 16.0885 14.6061 16.0885 13.1988C16.0885 11.7947 14.9468 10.6494 13.5391 10.6494Z"
                  fill="#828283"
                ></path>{" "}
                <g className="text-color">
                  <path d="M38.7801 29.0307C38.2507 28.7414 37.9874 28.0471 37.9874 26.9585V20.1295H42.3205V17.1005H37.9874V13.1699L34.196 14.4087V17.1005H31.4099V20.1295H34.196V26.7222C34.196 30.1005 35.9303 31.5536 36.9625 32.116C37.845 32.6009 38.7947 32.796 39.7299 32.796C41.3858 32.796 43.0037 32.1805 44.1454 31.4524L42.1813 28.6209C41.0552 29.3422 39.5458 29.4507 38.7801 29.0307Z"></path>{" "}
                  <path d="M48.6942 10.6494C47.2864 10.6494 46.1444 11.7947 46.1444 13.1988C46.1444 14.6061 47.2864 15.7474 48.6942 15.7474C50.102 15.7474 51.2436 14.6061 51.2436 13.1988C51.2436 11.7947 50.102 10.6494 48.6942 10.6494Z"></path>{" "}
                  <path d="M46.7986 32.3849H50.5867V17.1028L46.7986 18.3792V32.3849Z"></path>{" "}
                  <path d="M61.7797 20.1442C63.5483 20.1442 65.065 21.1956 65.7744 22.6969L69.0711 20.7977C67.7005 18.1626 64.9487 16.3564 61.7797 16.3564C57.2442 16.3564 53.5573 20.043 53.5573 24.5777C53.5573 29.1087 57.2442 32.7952 61.7797 32.7952C64.9487 32.7952 67.7005 30.9895 69.0711 28.3581L65.7744 26.4548C65.065 27.9569 63.5483 29.0079 61.7797 29.0079C59.3356 29.0079 57.3495 27.0181 57.3495 24.5777C57.3495 22.134 59.3356 20.1442 61.7797 20.1442Z"></path>{" "}
                  <path d="M85.5175 16.9143H80.2273L75.2224 22.0498V9.95801L71.4342 11.2347V32.3845H75.2224V27.4821L76.2701 26.4119L81.2787 32.3845H86.2273L78.924 23.6825L85.5175 16.9143Z"></path>{" "}
                  <path d="M90.4653 22.6707C91.1788 21.1838 92.6878 20.1446 94.449 20.1446C96.2062 20.1446 97.7155 21.1838 98.4323 22.6707H90.4653ZM94.449 16.3564C90.6794 16.3564 87.6881 19.0556 86.8255 22.6707C86.6765 23.2825 86.5933 23.9209 86.5933 24.5777C86.5933 25.2301 86.6765 25.8723 86.8255 26.4846C87.6881 30.1043 90.6794 32.7952 94.449 32.7952C97.4788 32.7952 100.126 31.1433 101.553 28.6919L98.2596 26.796C97.4935 28.1103 96.0821 29.007 94.449 29.007C92.3955 29.007 90.6792 27.5956 90.1764 25.6964H102.585C102.634 25.3282 102.668 24.9568 102.668 24.5776C102.668 23.9209 102.585 23.2821 102.435 22.6707C101.575 19.0556 98.3241 16.3564 94.449 16.3564Z"></path>{" "}
                  <path d="M114.333 28.6206C113.206 29.3418 111.697 29.4541 110.927 29.03C110.401 28.741 110.135 28.0504 110.135 26.9614V20.1292H114.472V17.1031H110.135V13.1729L106.347 14.4116V17.1031H103.561V20.1292H106.347V26.721C106.347 30.1035 108.078 31.5524 109.11 32.1194C109.996 32.6039 110.946 32.7953 111.881 32.7953C113.537 32.7953 115.155 32.1794 116.293 31.4512L114.333 28.6206Z"></path>
                </g>{" "}
                <path
                  d="M138.01 28.0396C138.891 27.1898 139.332 26.089 139.332 24.7368C139.332 23.3849 138.891 22.2792 138.01 21.4188C137.129 20.558 136.115 20.1278 134.968 20.1278C133.718 20.1278 132.688 20.5482 131.879 21.3878C131.07 22.2278 130.665 23.3441 130.665 24.7368C130.665 26.1298 131.07 27.2413 131.879 28.0702C132.688 28.9 133.718 29.3147 134.968 29.3147C136.115 29.3147 137.129 28.8898 138.01 28.0396ZM143.388 32.3878H139.332V31.1894C137.959 32.2955 136.269 32.8486 134.261 32.8486C132.233 32.8486 130.47 32.08 128.975 30.5445C127.479 29.0078 126.732 27.0723 126.732 24.7368C126.732 22.4017 127.484 20.4613 128.99 18.9147C130.496 17.3678 132.253 16.5947 134.261 16.5947C136.289 16.5947 137.979 17.158 139.332 18.2845V17.0551H143.388V32.3878Z"
                  fill="#828283"
                ></path>{" "}
                <path
                  d="M159.829 32.3876H146.215V29.7451L154.451 20.3741H146.43V17.0553H159.46V19.7594L151.224 29.0692H159.829V32.3876Z"
                  fill="#828283"
                ></path>
              </svg>
            </Link>
          </div>
          <div className={styles.middleSect}>
            <ul>
              <li>
                <Link
                  to="/events"
                  className={`${styles.link} ${
                    activeLink === "/events" ? styles.active : ""
                  }`}
                  onClick={() => handleClick("/events")}
                >
                  All Events
                </Link>
              </li>
              <li>
                <Link
                  to="/concerts"
                  className={`${styles.link} ${
                    activeLink === "/concerts" ? styles.active : ""
                  }`}
                  onClick={() => handleClick("/concerts")}
                >
                  Concerts
                </Link>
              </li>
              <li>
                <Link
                  to="/kids"
                  className={`${styles.link} ${
                    activeLink === "/kids" ? styles.active : ""
                  }`}
                  onClick={() => handleClick("/kids")}
                >
                  Kids
                </Link>
              </li>
              <li>
                <Link
                  to="/theatre"
                  className={`${styles.link} ${
                    activeLink === "/theatre" ? styles.active : ""
                  }`}
                  onClick={() => handleClick("/theatre")}
                >
                  Theatre
                </Link>
              </li>
              <li>
                <Link
                  to="/sport"
                  className={`${styles.link} ${
                    activeLink === "/sport" ? styles.active : ""
                  }`}
                  onClick={() => handleClick("/sport")}
                >
                  Sport
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.lastSect}>
            <NavLink to={"/favorites"}>
              <CiHeart className={styles.icon} />
              <sub>{fav.length}</sub>
            </NavLink>
            <a href="">
              <CiSearch className={styles.icon} />
            </a>
            <a href="">
              <SlBasket className={styles.icon} />
            </a>
            <span className={styles.person}>
              <Dropdown overlay={menu} trigger={["hover"]}>
                <a onClick={showModal}>
                  <IoPersonOutline />
                </a>
              </Dropdown>
              <Modal
                title={activeTab === "login" ? "Login" : "Register"}
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                className={styles.personModel}
                style={{ padding: "60px" }}
              >
                {activeTab === "login" && (
                  <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={loginFormik.handleSubmit}
                    onFinishFailed={() => {
                      message.error("Validation failed");
                    }}
                  >
                    <Form.Item>
                      <Input
                        placeholder="Email"
                        {...loginFormik.getFieldProps("email")}
                      />
                      {loginFormik.touched.email &&
                        loginFormik.errors.email && (
                          <span style={{ color: "red" }}>
                            {loginFormik.errors.email}
                          </span>
                        )}
                    </Form.Item>
                    <Form.Item>
                      <Input.Password
                        placeholder="Password"
                        {...loginFormik.getFieldProps("password")}
                      />
                      {loginFormik.touched.password &&
                        loginFormik.errors.password && (
                          <span style={{ color: "red" }}>
                            {loginFormik.errors.password}
                          </span>
                        )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          width: "100%",
                          backgroundColor: "#fd0",
                          color: "black",
                        }}
                      >
                        Log in
                      </Button>
                      New to iticket.az?{" "}
                      <a onClick={switchToRegister}>Sign up now</a>
                    </Form.Item>
                  </Form>
                )}

                {activeTab === "register" && (
                  <Form name="register" onFinish={formik.handleSubmit}>
                    <Form.Item>
                      <Input
                        placeholder="First Name"
                        {...formik.getFieldProps("firstName")}
                      />
                      {formik.touched.firstName && formik.errors.firstName && (
                        <span style={{ color: "red" }}>
                          {formik.errors.firstName}
                        </span>
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Input
                        placeholder="Last Name"
                        {...formik.getFieldProps("lastName")}
                      />
                      {formik.touched.lastName && formik.errors.lastName && (
                        <span style={{ color: "red" }}>
                          {formik.errors.lastName}
                        </span>
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Input
                        placeholder="Mobile"
                        {...formik.getFieldProps("mobile")}
                      />
                      {formik.touched.mobile && formik.errors.mobile && (
                        <span style={{ color: "red" }}>
                          {formik.errors.mobile}
                        </span>
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Input
                        placeholder="Email"
                        {...formik.getFieldProps("email")}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <span style={{ color: "red" }}>
                          {formik.errors.email}
                        </span>
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Input.Password
                        placeholder="Password"
                        {...formik.getFieldProps("password")}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <span style={{ color: "red" }}>
                          {formik.errors.password}
                        </span>
                      )}
                    </Form.Item>
                    <Form.Item>
                      <Input.Password
                        placeholder="Confirm Password"
                        {...formik.getFieldProps("confirmPassword")}
                      />
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword && (
                          <span style={{ color: "red" }}>
                            {formik.errors.confirmPassword}
                          </span>
                        )}
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          width: "100%",
                          backgroundColor: "#fd0",
                          color: "black",
                        }}
                      >
                        Register
                      </Button>
                      Already have an account?{" "}
                      <a onClick={switchToLogin}>Log in here</a>
                    </Form.Item>
                  </Form>
                )}
              </Modal>
              <Modal
                title="Verify"
                visible={isVerifyModalOpen}
                onCancel={handleVerifyCancel}
                footer={null}
                className={styles.personModel}
                style={{ padding: "60px" }}
              >
                <Form.Item>
                  <Input
                    placeholder="Verify Code"
                    {...loginFormik.getFieldProps("verifyCode")}
                  />
                </Form.Item>
                <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          width: "100%",
                          backgroundColor: "#fd0",
                          color: "black",
                        }}
                        onClick={handleVerifyCode} 
                      >
                        Verify
                      </Button>
                      
                    </Form.Item>
              </Modal>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
