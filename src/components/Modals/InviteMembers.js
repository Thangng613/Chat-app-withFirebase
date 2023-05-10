import { Avatar, Form, Input, Modal, Select, Spin } from "antd";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../firebase/services";
import { AuthContext } from "../../Context/AuthProvider";
import { debounce, update } from "lodash";
import {
  collection,
  limit,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const DebounceSelect = ({ fetchOptions, debounceTimeout = 300, ...props }) => {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, props.currentMembers).then((newOptions) => {
        console.log(newOptions);
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}>
      {options?.map((opt) => (
        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
          <Avatar size="small" src={opt.photoURL}>
            {opt.photoURL ? "" : opt.disPlayname?.charAt(0)?.toUpperCase()}
          </Avatar>
          {`${opt.label}`}
        </Select.Option>
      ))}
    </Select>
  );
};

const fetchUserList = async (search, currentMembers) => {
  const q = query(
    collection(db, "users"),
    where("keywords", "array-contains", search),
    orderBy("disPlayName"),
    limit(20)
  );

  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs
    .map((doc) => {
      return {
        label: doc.data().disPlayName,
        value: doc.data().uid,
        photoURL: doc.data().photoURL,
      };
    })
    .filter((opt) => currentMembers.includes(opt.value));
  return data;
};

const InviteMemberModal = () => {
  const [value, setValue] = useState();

  const {
    selectedRoomId,
    isModalOpenInviteMember,
    setIsModalOpenInviteMember,
    selectedRoom,
  } = useContext(AppContext);

  const [form] = Form.useForm();
  const handleSave = async () => {
    const roomRef = doc(db, "rooms", selectedRoomId);

    const updateMemberRoom = await updateDoc(roomRef, {
      members: [...selectedRoom.members, ...value.map((val) => val.value)],
    });

    setIsModalOpenInviteMember(false);

    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpenInviteMember(false);
    form.resetFields();
  };

  return (
    <div>
      <Modal
        title="Invite member"
        open={isModalOpenInviteMember}
        onOk={handleSave}
        onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <DebounceSelect
            mode="multiple"
            label="Member name"
            value={value}
            placeholder="Enter member name..."
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            currentMembers={selectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteMemberModal;
