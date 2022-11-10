import React from "react";
import { useNavigate } from "react-router-dom";

import { fontBold, fontExtraSmall } from "shared/themes/textStyle";

import IconVoteTab from "static/icons/Variety=vote, Status=tab, Size=L.svg";
import IconVoteUntab from "static/icons/Variety=vote, Status=untab, Size=L.svg";
import IconChatTab from "static/icons/Variety=_chat, Status=tab, Size=L.svg";
import IconChatUntab from "static/icons/Variety=chat, Status=untab, Size=L.svg";
import IconProfileTab from "static/icons/Variety=profile, Status=tab, Size=L.svg";
import IconProfileUntab from "static/icons/Variety=profile, Status=untab, Size=L.svg";
import IconGomTab from "static/icons/Variety=Gom, Status=tab, Size=L.svg";
import IconGomUntab from "static/icons/Variety=Gom, Status=untab, Size=L.svg";

import styled from "styled-components";

const Nav = ({ nowLocation }) => {
  const navigate = useNavigate();

  return (
    <S.Nav nowLocation={nowLocation}>
      <S.IconContainer onClick={() => navigate("/select")}>
        {nowLocation === "/select" ? (
          <img src={IconVoteTab} alt="IconVoteTab" />
        ) : (
          <img src={IconVoteUntab} alt="IconVoteUntab" />
        )}
        <span>고민투표</span>
      </S.IconContainer>

      {/* <StIconWrap onClick={() => navigate('/main', { state: { now: 'room' } })}>
        <StIcon>
          {state.now === 'room' ? (
            <img src={IconChatTab} alt="IconChatTab" />
          ) : (
            <img src={IconChatUntab} alt="IconChatUntab" />
          )}
        </StIcon>
        <StText>고민상담</StText>
      </StIconWrap>

      <StIconWrap
        onClick={() => navigate('/answer', { state: { now: 'answer' } })}
      >
        <StIcon>
          {state.now === 'answer' ? (
            <img src={IconGomTab} alt="IconGomTab" />
          ) : (
            <img src={IconGomUntab} alt="IconGomUntab" />
          )}
        </StIcon>
        <StText>곰곰해답</StText>
      </StIconWrap>

      <StIconWrap
        onClick={() => navigate('/mypage', { state: { now: 'mypage' } })}
      >
        <StIcon>
          {state.now === 'mypage' ? (
            <img src={IconProfileTab} alt="IconProfileTab" />
          ) : (
            <img src={IconProfileUntab} alt="IconProfileUntab" />
          )}
        </StIcon>
        <StText>마이페이지</StText>
      </StIconWrap> */}
    </S.Nav>
  );
};

export default Nav;

const S = {
  Nav: styled.nav`
    @media ${({ theme }) => theme.device.PC} {
      left: ${({ theme }) => theme.style.left};
      transform: ${({ theme }) => theme.style.transform};

      width: ${({ theme }) => theme.style.width};
    }

    position: fixed;
    bottom: 0;
    left: 0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 7.2rem;
    padding: 0.5rem 2.5rem 1.7rem 2.5rem;
    background-color: ${(props) =>
      props.nowLocation === "/answer" ? "transparent" : props.theme.bg};

    border-top: ${(props) =>
      props.nowLocation === "/answer" ? "none" : `1px solid ${props.theme.sub4}`};

    /* &
    > div:nth-child(${(props) =>
      props.nowLocation === "/select"
        ? 1
        : props.nowLocation === "/room"
        ? 2
        : props.nowLocation === "/answer"
        ? 3
        : props.nowLocation === "/mypage"
        ? 4
        : null}) {
    color: ${({ theme }) => theme.main2};
  } */
  `,

  IconContainer: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    color: ${({ theme }) => theme.sub2};

    cursor: pointer;

    span {
      ${fontBold};
      ${fontExtraSmall};
      line-height: 1.8rem;
    }
  `,
};
