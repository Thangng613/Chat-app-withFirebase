import { Col, Row } from "antd";
import React from "react";
import UserInfo from "../User/UserInfo";
import RoomList from "../RoomList/RoomList";
import styled from "styled-components";

const SidebarStyled = styled.div`
  background: #3f0e40;
  color: white;
  height: 100vh;
`;

const Sidebar = () => {
  return (
    <SidebarStyled>
      <Row>
        <Col span={24}>
          <UserInfo />
        </Col>
        <Col span={24}>
          <RoomList />
        </Col>
      </Row>
    </SidebarStyled>
  );
};

export default Sidebar;
