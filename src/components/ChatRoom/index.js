import { Col, Row } from 'antd'
import React from 'react'
import Sidebar from './Layout/Sidebar'
import ChatWindow from './Layout/ChatWindow'

const ChatRoom = () => {
  return (
    <Row>
      <Col span={6}><Sidebar /></Col>
      <Col span={18}><ChatWindow /></Col>
    </Row>
  )
}

export default ChatRoom