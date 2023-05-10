import { createContext, useContext, useMemo, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useFirestore from "../hooks/useFirestore";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isModalOpenAddRoom, setIsModalOpenAddRoom] = useState(false);
  const [isModalOpenInviteMember, setIsModalOpenInviteMember] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(false);

  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomsCondition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );
  const userCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: selectedRoom.members,
    };
  }, [selectedRoom.members]);

  const members = useFirestore("users", userCondition);

  const appContext = {
    rooms,
    isModalOpenAddRoom,
    setIsModalOpenAddRoom,
    selectedRoomId,
    setSelectedRoomId,
    selectedRoom,
    members,
    isModalOpenInviteMember,
    setIsModalOpenInviteMember,
  };

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
