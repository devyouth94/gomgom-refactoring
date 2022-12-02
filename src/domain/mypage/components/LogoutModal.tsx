import { MS } from "common/components/modal/modalStyles";
import { userStorage } from "shared/utils/localStorage";

interface Props {
  handleClick: () => void;
}

const LogoutModal = ({ handleClick }: Props) => {
  const handleLogout = () => {
    userStorage.clearStorage();
    handleClick();
  };

  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>로그아웃 하시겠습니까?</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={handleLogout}>로그아웃</div>
          <div onClick={handleClick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default LogoutModal;
