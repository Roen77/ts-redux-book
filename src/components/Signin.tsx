import { Button, Col, Input, Row } from "antd";
import styles from "./Signin.module.css";
import React, { useRef } from "react";
import { LoginReqType } from "../type";

interface SigninProps {
  login: (reqData: LoginReqType) => void;
}

const Signin: React.FC<SigninProps> = ({ login }) => {
  //@ts-ignore
  const emailRef = useRef<Input>(null);
  //@ts-ignore
  const passwordRef = useRef<Input>(null);

  const click = () => {
    console.log(emailRef.current.input.value, "??");
    const email = emailRef.current!.input.value;
    const password = passwordRef.current!.input.value;
    login({ email, password });
  };
  return (
    <Row align="middle" className={styles.signin_row}>
      <Col span={24}>
        <Row className={styles.signin_contents}>
          <Col span={12}>
            <img
              className={styles.signin_bg}
              src="/bg_signin.png"
              alt="sigin"
            />
          </Col>
          <Col span={12}>
            <div className={styles.signin_title}>My Books</div>
            <div className={styles.signin_subtitle}>
              Please Note Your Opinion
            </div>
            <div className={styles.signin_underline}></div>
            {/* email */}
            <div className={styles.email_title}>
              Email<span className={styles.email_required}>*</span>{" "}
            </div>
            <div className={styles.input_area}>
              <Input
                className={styles.input}
                placeholder="Email"
                autoComplete="email"
                name="email"
                ref={emailRef}
              ></Input>
            </div>
            {/* [password] */}
            <div className={styles.password_title}>
              Password<span className={styles.email_required}>*</span>{" "}
            </div>
            <div className={styles.input_area}>
              <Input
                className={styles.input}
                type="password"
                autoComplete="current-password"
                name="Password"
                ref={passwordRef}
              ></Input>
            </div>
            {/* button */}
            <div className={styles.button_area}>
              <Button
                className={styles.input_button}
                size="large"
                onClick={click}
              >
                Sign in
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Signin;
