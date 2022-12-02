import { useState, useEffect, useCallback } from "react";
import instance from "app/module/instance";
import { RoomItemProps, SelectItemProps } from "types";

interface voteData {
  data: { result: SelectItemProps[] };
}

interface roomData {
  data: { result: RoomItemProps[] };
}

const useGetMyContents = (page: number, pathname: string) => {
  const [voteList, setVoteList] = useState<SelectItemProps[]>([]);
  const [roomList, setRoomList] = useState<RoomItemProps[]>([]);

  const __getList = useCallback(async () => {
    let voteData: voteData;
    let roomData: roomData;

    switch (pathname) {
      case "/postvoted":
        voteData = await instance.get(`my/select?page=${page}`);
        setVoteList((prev) => [...prev, ...voteData.data.result]);
        break;
      case "/voted":
        voteData = await instance.get(`my/vote?page=${page}`);
        setVoteList((prev) => [...prev, ...voteData.data.result]);
        break;
      case "/maderoom":
        roomData = await instance.get(`my/room?page=${page}`);
        setRoomList((prev) => [...prev, ...roomData.data.result]);
        break;
      case "/operatingroom":
        roomData = await instance.get(`my/enter?page=${page}`);
        setRoomList((prev) => [...prev, ...roomData.data.result]);
        break;
      default:
        break;
    }
  }, [page, pathname]);

  useEffect(() => {
    __getList();
  }, [__getList]);

  return { voteList, roomList };
};

export default useGetMyContents;
