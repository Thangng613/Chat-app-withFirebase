import { Form, Input, Modal } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";

const AddRoomModal = () => {
  const { isModalOpenAddRoom, setIsModalOpenAddRoom } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);
  const [form] = Form.useForm();
  const handleSave = () => {
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });
    setIsModalOpenAddRoom(false);
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpenAddRoom(false);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Add room"
        open={isModalOpenAddRoom}
        onOk={handleSave}
        onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item label="Room name" name="name">
            <Input placeholder="Room name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
