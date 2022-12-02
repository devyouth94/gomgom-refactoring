import { fontLarge } from "shared/themes/textStyle";
import styled from "styled-components";

interface Props extends WidthProps {
  children: React.ReactNode;
}

const Header = ({ children, w, isTransparent, length }: Props) => {
  return (
    <S.Header w={w} isTransparent={isTransparent} length={length}>
      {children}
    </S.Header>
  );
};

export default Header;

interface WidthProps {
  w?: string;
  isTransparent?: boolean;
  length?: number;
}

const S = {
  Header: styled.header<WidthProps>`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    top: 0;
    left: 0;

    display: grid;
    grid-template-columns: ${(props) => props.w || "3.2rem"} auto 3.2rem;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 6.4rem;
    padding: 0 2rem;
    background-color: ${(props) => (props.isTransparent ? "transparent" : props.theme.color.bg)};
    border-bottom: ${(props) =>
      props.length !== 0 ? null : `1px solid ${props.theme.color.sub4}`};

    z-index: 9;

    > img {
      width: 100%;
      cursor: pointer;
    }

    h1 {
      ${fontLarge}

      > span {
        color: ${({ theme }) => theme.color.sub3};
      }
    }
  `,
};
