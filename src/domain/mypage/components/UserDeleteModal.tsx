import instance from "app/module/instance";
import axios from "axios";
import { MS } from "common/components/modal/modalStyles";
import { userStorage } from "shared/utils/localStorage";

interface Props {
  handleClick: () => void;
  handleModal: (msg?: string) => void;
}

const UserDeleteModal = ({ handleClick, handleModal }: Props) => {
  const __deleteUser = async () => {
    try {
      await instance.delete("/user/del");
      handleClick();
      userStorage.clearStorage();
      handleModal("회원 탈퇴가 완료됐습니다.");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleModal((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  };

  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>정말 회원 탈퇴를 하시겠습니까?</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={__deleteUser}>회원 탈퇴</div>
          <div onClick={handleClick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default UserDeleteModal;
