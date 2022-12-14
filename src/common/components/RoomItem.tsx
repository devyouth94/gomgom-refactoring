import { borderBoxDefault } from "shared/themes/boxStyle";
import { fontBold, fontMedium, fontSmall } from "shared/themes/textStyle";

import { ReactComponent as IconPerson } from "static/icons/Variety=person, Status=untab, Size=S.svg";
import { ReactComponent as IconAnnounce } from "static/icons/Variety=announce, Status=untab, Size=M.svg";
import { ReactComponent as IconAnnounced } from "static/icons/Variety=announced, Status=untab, Size=M.svg";
import styled from "styled-components";
import { RoomItemProps } from "types";

interface Props {
  roomItem: {
    room: RoomItemProps;
    entered?: number[];
    length: number;
  };
  handleJoin: any;
  idx: number;
  setRef: any;
}

const RoomItem = ({ roomItem: { room, entered, length }, handleJoin, idx, setRef }: Props) => {
  return (
    <S.Container
      onClick={() => handleJoin(room.roomKey)}
      cur={room.currentPeople}
      max={room.max}
      ref={idx === length - 1 ? setRef : null}
    >
      <S.Header cur={room.currentPeople} max={room.max}>
        {room.currentPeople === room.max ? <IconAnnounced /> : <IconAnnounce />}
        <span>{room.title}</span>
      </S.Header>

      <S.Body cur={room.currentPeople} max={room.max}>
        {room.hashTag?.map((item) => (
          <span key={item}>#{item}</span>
        ))}
      </S.Body>

      <S.Footer>
        <div>
          <IconPerson />
          <span>
            {room.currentPeople}/{room.max} 명
          </span>
          {entered?.includes(room.roomKey) && <span>상담 참여중</span>}
        </div>

        <div>
          작성자 <span>{room.host}</span>
        </div>
      </S.Footer>
    </S.Container>
  );
};

export default RoomItem;

interface StyledProps {
  cur: number;
  max: number;
}

const S = {
  Container: styled.article<StyledProps>`
    ${borderBoxDefault};
    position: relative;

    width: 100%;
    height: 11.4rem;
    padding: 1.6rem;
    background-color: ${(props) =>
      props.cur === props.max ? props.theme.color.sub4 : props.theme.color.white};

    cursor: pointer;
  `,

  Header: styled.div<StyledProps>`
    position: absolute;
    top: 1.6rem;
    left: 1.6rem;

    display: flex;
    align-items: center;
    gap: 0.2rem;

    span {
      ${fontBold};
      line-height: 2.1rem;
      color: ${(props) =>
        props.cur === props.max ? props.theme.color.sub2 : props.theme.color.black};
    }
  `,

  Body: styled.div<StyledProps>`
    position: absolute;
    top: 4.1rem;
    left: 1.6rem;

    display: flex;
    gap: 0.6rem;

    span {
      height: 100%;
      padding: 0 0.5rem;
      background-color: ${(props) =>
        props.cur === props.max ? "#D8D0C5" : props.theme.color.sub4};

      border-radius: 1rem;

      ${fontSmall}
      line-height: 2rem;
      color: ${({ theme }) => theme.color.sub2};
    }
  `,

  Footer: styled.div`
    position: absolute;
    bottom: 0;

    width: 100%;

    > div:nth-child(1) {
      position: absolute;
      bottom: 1.6rem;
      left: 1.6rem;

      display: flex;
      align-items: center;
      gap: 0.25rem;

      ${fontMedium};
      line-height: 2.1rem;
      color: ${({ theme }) => theme.color.sub2};

      > span:nth-child(3) {
        height: 100%;
        padding: 0 0.5rem;
        background-color: ${({ theme }) => theme.color.sub2};

        border-radius: 1rem;

        ${fontSmall}
        line-height: 2rem;
        color: ${({ theme }) => theme.color.white};
      }
    }

    > div:nth-child(2) {
      position: absolute;
      bottom: 1.6rem;
      right: 1.6rem;

      ${fontSmall};
      line-height: 2rem;
      color: ${({ theme }) => theme.color.sub2};

      span {
        ${fontBold};
      }
    }
  `,
};
