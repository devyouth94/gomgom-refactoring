import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/config/hooks";
import { clearDataRoom, __getRoomAll, __getRoomBySearch } from "app/module/roomSlice";

const useGetRoom = (page: number) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.room.data);
  const query = useAppSelector((state) => state.room.query);
  const error = useAppSelector((state) => state.room.error);

  useEffect(() => {
    if (query) {
      dispatch(__getRoomBySearch(query));
      return;
    }

    dispatch(__getRoomAll(page));
  }, [dispatch, query, page]);

  useEffect(() => {
    return () => {
      dispatch(clearDataRoom());
    };
  }, [dispatch]);

  return { data, query, error };
};

export default useGetRoom;
