import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons";
import Message from "../Message/Message";
import { AppContext } from "../../../Context/AppProvider";
import InviteMemberModal from "../../Modals/InviteMembers";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { addDocument } from "../../firebase/services";
import { AuthContext } from "../../../Context/AuthProvider";
import useFirestore from "../../../hooks/useFirestore";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgba(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
      font-size: 20px;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgba(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const ChatWindow = () => {
  const { selectedRoom, members, setIsModalOpenInviteMember } =
    useContext(AppContext);
  const {
    user: { uid, photoURL, displayName },
  } = useContext(AuthContext);
  const handleInvite = () => {
    setIsModalOpenInviteMember(true);
  };
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnSubmit = () => {
    addDocument("message", {
      text: inputValue,
      uid,
      photoURL,
      displayName,
      roomId: selectedRoom.id,
    });
    form.resetFields(["message"]);
  };

  const condition = useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const message = useFirestore("message", condition);

  return (
    <WrapperStyled>
      {selectedRoom.id ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{selectedRoom.name}</p>
              <span className="header__description">
                {selectedRoom.description}
              </span>
            </div>
            <ButtonGroupStyled>
              <Button
                onClick={handleInvite}
                icon={<UserAddOutlined />}
                type="text">
                Moi
              </Button>

              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip key={member.id} title={member.disPlayName}>
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.disPlayName?.charAt(0)?.toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {message.map((mes) => (
                <Message
                  key={mes.id}
                  text={mes.text}
                  photoUrl={mes.photoURL}
                  displayName={mes.disPlayName}
                  createAt={mes.createAt}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Nhap tin nhan"
                  bordered={false}
                  autoComplete="off"
                />
              </Form.Item>
              <Button onClick={handleOnSubmit} type="primary">
                Gui
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Please choose one room"
          type="info"
          showIcon
          style={{ margin: 5 }}
        />
      )}

      <InviteMemberModal />
    </WrapperStyled>
  );
};

export default ChatWindow;
