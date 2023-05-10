import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../../../Context/AppProvider";
import AddRoomModal from "../../Modals/AddRoomModal";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;
const RoomList = () => {
  const { rooms, setIsModalOpenAddRoom, setSelectedRoomId } = useContext(AppContext);

  const handleAddRoom = () => {
    setIsModalOpenAddRoom(true);
  };

  const handleSetRoomId = (id) => {
    setSelectedRoomId(id);
  };

  return (
    <>
      <Collapse ghost defaultActiveKey={["1"]}>
        <PanelStyled header="Danh sach cac phong" key="1">
          {rooms.map((room) => (
            <LinkStyled onClick={() => handleSetRoomId(room.id)} key={room.id}>
              {room.name}
            </LinkStyled>
          ))}

          <Button
            onClick={handleAddRoom}
            className="add-room"
            type="text"
            icon={<PlusSquareOutlined />}>
            Them phong
          </Button>
        </PanelStyled>
      </Collapse>
      <AddRoomModal />
    </>
  );
};

export default RoomList;
