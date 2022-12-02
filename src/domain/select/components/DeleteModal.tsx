import { MS } from "common/components/modal/modalStyles";

interface Props {
  handleClick: () => void;
  handleDelete: () => Promise<void>;
}

const DeleteModal = ({ handleClick, handleDelete }: Props) => {
  return (
    <>
      <MS.Window>
        <MS.TextContainer>
          <span>정말 투표를 삭제할까요?</span>
        </MS.TextContainer>
        <MS.ButtonContainer>
          <div onClick={handleDelete}>삭제</div>
          <div onClick={handleClick}>취소</div>
        </MS.ButtonContainer>
      </MS.Window>
      <MS.Background onClick={handleClick} />
    </>
  );
};

export default DeleteModal;
