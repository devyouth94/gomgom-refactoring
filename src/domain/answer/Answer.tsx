import { useLocation } from "react-router-dom";

import StartDisplay from "domain/answer/components/StartDisplay";
import Header from "common/components/Header";
import Nav from "common/components/Nav";
import GlobalButton from "common/elements/GlobalButton";
import useAnswerState from "domain/answer/hooks/useAnswerState";

import { fontBold } from "shared/themes/textStyle";

import Logo from "static/images/Logo.svg";
import ImageBubble1 from "static/images/speach bubble1.svg";
import ImageBubble2 from "static/images/speach bubble2.svg";
import ImageCharacter1 from "static/images/Character1.svg";
import ImageCharacter2 from "static/images/Character2.svg";

import styled from "styled-components";

const Answer = () => {
  const { pathname } = useLocation();
  const { think, answer, clickAnswerHandler } = useAnswerState();

  return (
    <>
      <StartDisplay />

      <Header w="4.5rem" isTransparent>
        <img onClick={() => window.location.reload()} src={Logo} alt="Logo" />
      </Header>

      <S.Layout>
        <S.Content>
          {answer ? (
            <>
              <img src={ImageBubble2} alt="ImageBubble2" />
              <img src={ImageCharacter2} alt="ImageCharacter2" />
            </>
          ) : (
            <>
              <img src={ImageBubble1} alt="ImageBubble1" />
              <img src={ImageCharacter1} alt="ImageCharacter1" />
            </>
          )}

          {think ? (
            <span>곰곰이 생각하는 중...</span>
          ) : answer ? (
            <span>{answer}</span>
          ) : (
            <span className="center">
              고민을 떠올리고 <br />
              하단 버튼을 눌러주세요
            </span>
          )}
        </S.Content>

        <GlobalButton onClick={clickAnswerHandler} position="absolute" bottom="9.6rem">
          {answer ? "곰곰의 해답 다시 듣기" : "곰곰의 해답 듣기"}
        </GlobalButton>
      </S.Layout>

      <Nav nowLocation={pathname} />
    </>
  );
};

export default Answer;

const S = {
  Layout: styled.main`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: relative;

    width: 100%;
    height: calc(var(--vh, 1vh) * 100);
    background: radial-gradient(15rem 32rem at 50% 45%, #ff9b25 0%, #000000 82.03%);

    border-left: 2rem solid transparent;
    border-right: 2rem solid transparent;
  `,

  Content: styled.section`
    position: absolute;
    left: 50%;
    top: 44%;
    transform: translate(-50%, -50%);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 41.4rem;

    img:nth-child(1) {
      position: absolute;
      top: 0;
    }

    img:nth-child(2) {
      position: absolute;
      bottom: 0;
    }

    span {
      position: absolute;
      left: 50%;
      top: 1.9rem;
      transform: translateX(-50%);

      display: flex;
      justify-content: center;
      align-items: center;

      width: 21rem;
      height: 6rem;
      background-color: #f8f3eb;

      ${fontBold};
      line-height: 2.4rem;

      z-index: 9;
    }

    .center {
      text-align: center;
    }
  `,
};
