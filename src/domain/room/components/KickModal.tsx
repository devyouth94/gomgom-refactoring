import { MS } from "common/components/modal/modalStyles";

interface Props {
  socket: any;
  roomKey: number;
  userKey: number;
  nickname: string;
  handleClickKick: any;
  handleSetKick: () => void;
}

const KickModal = ({
  socket,
  roomKey,
  userKey,
  nickname,
  handleClickKick,
  handleSetKick,
}: Props) => {
  const handleKickUser = () => {
    socket.current.emit("expulsion", { roomKey, userKey });
    handleSetKick();
  };

  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>'{nickname}'님을 상담방에서 내보냅니다.</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={handleKickUser}>내보내기</div>
          <div onClick={handleClickKick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClickKick} />
    </>
  );
};

export default KickModal;
