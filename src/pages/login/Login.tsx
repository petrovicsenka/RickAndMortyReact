import { useState, useEffect } from "react";
import { Card, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./Login.module.scss";

const Login = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (success) {
      message.success(success);
    }
  }, [success]);

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const [isRegistering, setIsRegistering] = useState(false);

  const initialUser: User = {
    username: null,
    password: null,
    name: null,
    surname: null,
    phone: null,
  };
  
  const [users, setUsers] = useState<User[]>([initialUser]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  const onFinish = (values: any) => {
    if (isRegistering) {

      const existingUser = users?.find(
        (user: any) => user?.username === values?.username
      );
      if (existingUser) {
        setError("Error: User already exists.");
        return;
      }

      if (values?.password === confirmPassword) {
        const newUser = {
          username: values?.username,
          password: values?.password,
          name,
          surname,
          phone,
        };      

        users?.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setSuccess("Registration successful! You can now log in.");
        setIsRegistering(false);
        setError(null);
      } else {
        setError("Error: Passwords do not match.");
      }
    } else {
      const foundUser = users?.find(
        (user: any) =>
          user?.username === values?.username && user?.password === values?.password
      );
      if (foundUser) { 
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        setSuccess("Logged in successfully!");
        setError(null);
      } else {
        setError("Error: Wrong username or password.");
      }
    }
  };

  const onRegisterClick = () => {
    setIsRegistering(true);
  };

  const backToLogin = () => {
    setIsRegistering(false);
    setError(null);
  };

  return (
    <Card className={styles["card-container"]}>
      <Form name="login" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username ?? ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            value={password ?? ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        {isRegistering && (
          <>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                value={confirmPassword ?? ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input
                placeholder="Name"
                value={name ?? ""}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="surname"
              rules={[
                { required: true, message: "Please input your surname!" },
              ]}
            >
              <Input
                placeholder="Surname"
                value={surname ?? ""}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" },
              { pattern: /^[0-9]+$/, message: "Please enter a valid phone number!" }]}
            >
              <Input
                placeholder="Phone"
                value={phone ?? ""}
                onChange={(e) => setPhone(e.target.value ?? null)}
              />
            </Form.Item>
          </>
        )}
        <Form.Item>
          {isRegistering && (
              <Button 
                type="link"
                onClick={backToLogin}
                className={styles["login-button"]}
              >
                Back
              </Button>
          )}
          <Button
            type="primary"
            htmlType="submit"
            className={styles["login-button"]}
          >
            {isRegistering ? "Submit" : "Log in"}
          </Button>
          {!isRegistering && (
            <Button type="link" onClick={onRegisterClick}>
              Register
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
