import { Avatar, Button, Typography } from "antd";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../../Context/AuthProvider";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;
const handleLogOut = () => {
  signOut(auth);
};

const UserInfo = () => {
 

  const {
    user: { displayName, photoURL },
  } = useContext(AuthContext);

  return (
    <WrapperStyled>
      <div>
        <Avatar src={photoURL}>
          {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Typography.Text className="username">{displayName}</Typography.Text>
      </div>
      <Button onClick={handleLogOut} ghost>
        Log out
      </Button>
    </WrapperStyled>
  );
};

export default UserInfo;
