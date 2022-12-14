import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import instance from "app/module/instance";
import { __getRoomBySearch, clearErrorRoom, clearQueryRoom } from "app/module/roomSlice";

import BasicModal from "common/components/modal/BasicModal";
import LoginModal from "common/components/modal/LoginModal";
import JoinModal from "domain/room/components/JoinModal";
import Header from "common/components/Header";
import Layout from "common/components/Layout";
import Nav from "common/components/Nav";
import Search from "common/components/Search";
import RoomItem from "common/components/RoomItem";
import WriteButton from "common/elements/WriteButton";
import ScrollTopButton from "common/elements/ScrollTopButton";

import { RoomInfoProps, RoomItemProps } from "types";
import { FEEDBACK_LINK } from "domain/select/Select";
import useInfiniteScroll from "common/hooks/useInfiniteScroll";
import useGetRoom from "domain/room/hooks/useGetRoom";
import useScrollTop from "common/hooks/useScrollTop";
import useModalState from "common/hooks/useModalState";
import { fontMedium } from "shared/themes/textStyle";

import Logo from "static/images/Logo.svg";
import IconSurvey from "static/icons/Variety=Survey, Status=untab, Size=L.svg";
import styled from "styled-components";

const initailRoomInfo = {
  currentPeople: 0,
  hashTag: [],
  host: "",
  max: 0,
  roomKey: 0,
  title: "",
  userKey: 0,
  point: 0,
};

const Room = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { page, setLastItemRef, refreshPage } = useInfiniteScroll();
  const isScroll = useScrollTop();

  const { data, query, error } = useGetRoom(page);
  const [roomInfo, setRoomInfo] = useState<RoomInfoProps>(initailRoomInfo);

  const [modal, handleModal, message] = useModalState(false);
  const [loginModal, handleLoginModal] = useModalState(false);
  const [joinModal, handleJoinModal] = useModalState(false);

  const handleJoin = async (roomKey: number) => {
    try {
      const { data } = await instance.post(`/room/${roomKey}`);
      setRoomInfo(data.result);
      handleJoinModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = (error.response?.data as { errMsg?: string }).errMsg;
        if (msg?.includes("?????????")) {
          handleLoginModal(true);
        } else {
          handleModal(msg);
        }
      }
    }
  };

  return (
    <>
      {error && <BasicModal handleClick={() => dispatch(clearErrorRoom())}>{error}</BasicModal>}
      {modal && <BasicModal handleClick={handleModal}>{message}</BasicModal>}
      {loginModal && <LoginModal handleClick={handleLoginModal} />}
      {joinModal && (
        <JoinModal
          pathname={pathname}
          handleJoinModal={handleJoinModal}
          entered={data.entered}
          roomInfo={roomInfo}
        />
      )}

      <Header w="4.5rem">
        <img onClick={() => window.location.reload()} src={Logo} alt="Logo" />
        <div />
        <a href={FEEDBACK_LINK} target="_blank" rel="noreferrer">
          <img src={IconSurvey} alt="IconSurvey" />
        </a>
      </Header>

      <Search
        query={query}
        refreshPage={refreshPage}
        clearQuery={clearQueryRoom}
        getListBySearch={__getRoomBySearch}
        text="????????? ??????/??????, ?????? ??????(10??? ??????)"
      />

      <Layout>
        <S.Container>
          {!data.all.length && <span>???????????? ????????????.</span>}
          {data?.all.map((room: RoomItemProps, idx: number) => (
            <RoomItem
              key={room.roomKey}
              idx={idx}
              setRef={setLastItemRef}
              roomItem={{ room, entered: data.entered, length: data.all.length }}
              handleJoin={handleJoin}
            />
          ))}
        </S.Container>
      </Layout>

      <WriteButton pathname={pathname} handleLoginModal={handleLoginModal} />

      {isScroll && <ScrollTopButton />}

      <Nav nowLocation={pathname} />
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;

    padding: 14rem 0 9.6rem 0;

    > span {
      margin-top: 4rem;
      ${fontMedium};
    }
  `,
};

export default Room;
