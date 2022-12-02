import { useEffect, useState } from "react";
import instance from "app/module/instance";
import { userStorage } from "shared/utils/localStorage";
import { MyInfo } from "types";

const useGetMyInfo = () => {
  const [myInfo, setMyInfo] = useState<MyInfo>({ nickname: "", point: 0 });

  const __getMyInfo = async () => {
    const { data } = await instance.get("/my");
    setMyInfo(data.result);
  };

  useEffect(() => {
    if (!userStorage.getToken()) return;

    __getMyInfo();
  }, []);

  return myInfo;
};

export default useGetMyInfo;
