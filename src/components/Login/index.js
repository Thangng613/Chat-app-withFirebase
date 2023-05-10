import React, { useEffect } from "react";
import { Row, Col, Button, Typography } from "antd";
import { auth, db } from "../firebase/firebase";
import {
  FacebookAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
} from "firebase/auth";
import { addDocument, generateKeywords } from "../firebase/services";

const { Title } = Typography;

const provider = new FacebookAuthProvider();

const Login = () => {
  const handleFbLogin = async () => {
    const data = await signInWithPopup(auth, provider);
    const { user } = data;
    const { isNewUser, providerId } = getAdditionalUserInfo(data);

    const docData = {
      disPlayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      providerId: providerId,
      keywords: generateKeywords(user.displayName),
    };

    if (isNewUser) {
      addDocument("users", docData);
    }
  };
  return (
    <div>
      <Row justify="center" style={{ height: 800, alignItems: "center" }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Chat App
          </Title>
          <Button style={{ width: "100%", marginBottom: 5 }}>
            Đăng nhập bằng Google
          </Button>
          <Button onClick={handleFbLogin} style={{ width: "100%" }}>
            Đăng nhập bằng Facebook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
