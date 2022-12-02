import { fontBold, fontSmall } from "shared/themes/textStyle";
import styled from "styled-components";

interface Props {
  handleLogoutModal: () => void;
}

const Logout = ({ handleLogoutModal }: Props) => {
  return (
    <S.Logout>
      <span onClick={handleLogoutModal}>로그아웃</span>
    </S.Logout>
  );
};

const S = {
  Logout: styled.article`
    display: flex;
    justify-content: center;

    margin-top: 3rem;

    ${fontSmall};
    ${fontBold};
    color: ${({ theme }) => theme.color.sub2};

    span {
      cursor: pointer;
    }
  `,
};

export default Logout;
