import React from "react";

import { fontBold, fontMedium } from "../../shared/themes/textStyle";

import styled from "styled-components";

export const ModalBasic = ({ children, setter }) => {
  return (
    <>
      <StModalWindow>
        <StModalText>
          <span>{children}</span>
        </StModalText>
        <StModalButton>
          <div onClick={setter}>확인</div>
        </StModalButton>
      </StModalWindow>
      <StModalBg onClick={setter} />
    </>
  );
};

export const ModalExit = ({ leave, setter }) => {
  return (
    <>
      <StModalWindow>
        <StModalTitle>상담방 나가기</StModalTitle>
        <StModalText>
          <span>나가기를 하면 작성자의 추천을 받을 수 없어요.</span>
          <span>(추천을 받으면 등급이 올라가요!)</span>
        </StModalText>
        <StModalButton>
          <div onClick={leave}>나가기</div>
          <div onClick={setter}>취소</div>
        </StModalButton>
      </StModalWindow>
      <StModalBg onClick={setter} />
    </>
  );
};

export const ModalKick = ({ setter, kick, nickname }) => {
  return (
    <>
      <StModalWindow>
        <StModalText>
          <span>'{nickname}'님을 상담방에서 내보냅니다.</span>
        </StModalText>
        <StModalButton>
          <div onClick={kick}>내보내기</div>
          <div onClick={setter}>취소</div>
        </StModalButton>
      </StModalWindow>
      <StModalBg onClick={setter} />
    </>
  );
};

export const ModalRecommend = ({ children, setter, leave, recommend, user }) => {
  return (
    <>
      <StModalWindowWide>
        <StModalTitle>고민해결에 도움 된 사람을 추천해주세요</StModalTitle>
        <StModalTextWide>
          {user === 1 ? (
            <div>남아있는 인원이 없어요.</div>
          ) : (
            <>
              <div>*현재 상담방에 남아 있는 사람입니다.</div>
              {children}
            </>
          )}
        </StModalTextWide>
        <StModalButton>
          {user !== 1 && <div onClick={recommend}>추천하고 삭제</div>}
          <div onClick={leave}>상담방 삭제</div>
        </StModalButton>
      </StModalWindowWide>
      <StModalBg onClick={setter} />
    </>
  );
};

const StModalBg = styled.div`
  @media ${({ theme }) => theme.device.PC} {
    width: ${({ theme }) => theme.style.width};
    left: ${({ theme }) => theme.style.left};
    transform: ${({ theme }) => theme.style.transform};
  }

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);

  z-index: 99;
`;

const StInfoText = styled.div`
  ${fontBold};
  color: ${({ theme }) => theme.main2};
`;

const StModalWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 29rem;
  background-color: #fff;

  border-radius: 2rem;

  line-height: 2.1rem;

  z-index: 999;
`;

const StModalWindowWide = styled(StModalWindow)`
  width: 33rem;
`;

const StModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 5.6rem;
  background-color: ${({ theme }) => theme.main2};

  border-radius: 2rem 2rem 0 0;

  ${fontBold};
  color: ${({ theme }) => theme.white};
`;

const StModalText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  min-height: 7.2rem;
  padding: 1rem;

  span {
    text-align: center;
    line-height: 2.5rem;
  }

  span:nth-child(1) {
    ${fontMedium}
  }

  span:nth-child(2) {
    ${fontMedium}
    color: ${({ theme }) => theme.sub2};
  }
`;

const StModalTextWide = styled(StModalText)`
  & > div:nth-child(1) {
    ${fontMedium};
    line-height: 1.8rem;
    color: ${({ theme }) => theme.sub2};
  }
`;

const StModalButton = styled.div`
  display: flex;
  align-items: center;

  height: 5.6rem;

  border-top: 0.1rem solid #e7e7e7;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    ${fontMedium}

    cursor: pointer;
  }

  div:nth-child(2) {
    border-left: 0.1rem solid #e7e7e7;
  }
`;