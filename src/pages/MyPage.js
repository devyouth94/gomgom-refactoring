import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import BodyPadding from '../components/common/BodyPadding';
import Footer from '../components/common/Footer';
import { fontLarge, fontSmall, fontMedium } from '../shared/themes/textStyle';
import { fontExtraBold, fontBold } from '../shared/themes/textStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { editNickNameThunk, getMyPointThunk } from '../app/module/myPageSlice';
import { css } from 'styled-components';
import { IconLarge, IconMedium } from '../shared/themes/iconStyle';
import { ModalBasic } from '../components/common/Modal';

import IconEdit from '../static/icons/Variety=edit, Status=untab.svg';
import IconNext from '../static/icons/Variety=next, Status=untab.svg';
import IconVoteTab from '../static/icons/Variety=vote, Status=tab.svg';
import IconChatting from '../static/icons/Variety=chating, Status=untab.svg';
import ProfileImg from '../components/elements/ProfileImg';

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const userNickname = useSelector((state) => state.myPageSlice.data);
  const userPoint = useSelector((state) => state.myPageSlice.point);
  const [tierInfo, setTierInfo] = useState(false);

  const [modal, setModal] = useState('');

  const onClickTireInfo = () => {
    setTierInfo((status) => !status);
  };
  //나의 포인트 조회
  useEffect(() => {
    if (localStorage.getItem('userKey')) {
      dispatch(getMyPointThunk());
    }
  }, [dispatch]);

  //티어별 상세정보
  const [white, setWhite] = useState(false);
  const [yellow, setYellow] = useState(false);
  const [green, setGreen] = useState(false);
  const [blue, setBlue] = useState(false);
  const [purple, setPurple] = useState(false);

  const onFocusWhite = () => {
    setWhite((status) => !status);
  };
  const onBlurWhite = () => {
    setWhite((status) => !status);
  };

  const onFocusYellow = () => {
    setYellow((status) => !status);
  };
  const onBlurYellow = () => {
    setYellow((status) => !status);
  };

  const onFocusGreen = () => {
    setGreen((status) => !status);
  };
  const onBlurGreen = () => {
    setGreen((status) => !status);
  };

  const onFocusBlue = () => {
    setBlue((status) => !status);
  };
  const onBlurBlue = () => {
    setBlue((status) => !status);
  };

  const onFocusPurple = () => {
    setPurple((status) => !status);
  };
  const onBlurPurple = () => {
    setPurple((status) => !status);
  };

  //로그인 여부
  const loggined = localStorage.getItem('token');

  //로그아웃
  const onClickLogOut = () => {
    localStorage.clear();
    window.location.reload('/mypage');
  };

  //닉네임변경
  const [editNickname, setEditNickname] = useState('');
  const [editMode, setEditMode] = useState(false);
  const userKey = localStorage.getItem('userKey');

  const onClickEditNickName = () => {
    setEditMode((status) => !status);
    if (editMode === true) {
      dispatch(editNickNameThunk({ ...editNickname, userKey: userKey }));
    }
  };

  const onChangeEditNickName = (event) => {
    const { name, value } = event.target;
    setEditNickname({ [name]: value });
  };

  return (
    <div style={{ paddingBottom: '7rem' }}>
      {modal && <ModalBasic setter={() => setModal('')}>{modal}</ModalBasic>}

      {loggined !== null ? (
        <>
          <MyPageHeadContainer>
            <StProfileImgLarge />
            <div>
              <div>
                <Badge userPoint={userPoint}>
                  {userPoint <= 10
                    ? 'White'
                    : userPoint > 10 && userPoint <= 25
                    ? 'Yellow'
                    : userPoint > 25 && userPoint <= 50
                    ? 'Green'
                    : userPoint > 50 && userPoint <= 100
                    ? 'Blue'
                    : userPoint > 100
                    ? 'Purple'
                    : null}
                </Badge>
              </div>
              <StNicknameWrap>
                <Nickname>
                  {editMode ? (
                    <EditNicknameInput
                      name="nickname"
                      onChange={onChangeEditNickName}
                      type="text"
                    />
                  ) : (
                    <>
                      {userNickname && localStorage.getItem('nickname')}
                      <span style={{ fontWeight: '400' }}>님</span>
                    </>
                  )}
                </Nickname>
                <EditNickname onClick={onClickEditNickName}>
                  {editMode ? (
                    <span>변경</span>
                  ) : (
                    <>
                      <img width="20" src={IconEdit} alt="IconEdit" />
                      <span>변경</span>
                    </>
                  )}
                </EditNickname>
              </StNicknameWrap>
            </div>
          </MyPageHeadContainer>

          <ScoreContainer>
            <MyScore>
              <ScoreInfo1>
                현재등급
                <ScoreDetail>
                  {userPoint <= 10
                    ? 'White'
                    : userPoint > 10 && userPoint <= 25
                    ? 'Yellow'
                    : userPoint > 25 && userPoint <= 50
                    ? 'Green'
                    : userPoint > 50 && userPoint <= 100
                    ? 'Blue'
                    : userPoint > 100
                    ? 'Purple'
                    : null}
                </ScoreDetail>
              </ScoreInfo1>
              <ScoreInfo2>
                모은점수
                <ScoreDetail>
                  {userPoint === null ? '0' : userPoint}
                </ScoreDetail>
              </ScoreInfo2>
              <ScoreInfo3>
                다음등급 까지
                <ScoreDetail>
                  {userPoint <= 10
                    ? `${11 - userPoint}점 남음`
                    : userPoint >= 10 && userPoint <= 25
                    ? `${26 - userPoint}점 남음`
                    : userPoint >= 25 && userPoint <= 50
                    ? `${51 - userPoint}점 남음`
                    : userPoint >= 51 && userPoint <= 100
                    ? `${101 - userPoint}점 남음`
                    : '-'}
                </ScoreDetail>
              </ScoreInfo3>
            </MyScore>
          </ScoreContainer>

          <TierLetter onClick={onClickTireInfo}>
            등급별 혜택/달성조건 알아보기
          </TierLetter>

          {tierInfo ? (
            <TierInfoContainer>
              <TierInfo>
                <Tiers>
                  <TierButton
                    autoFocus
                    onFocus={onFocusWhite}
                    onBlur={onBlurWhite}
                  >
                    White
                  </TierButton>
                  <TierButton onFocus={onFocusYellow} onBlur={onBlurYellow}>
                    Yellow
                  </TierButton>
                  <TierButton onFocus={onFocusGreen} onBlur={onBlurGreen}>
                    Green
                  </TierButton>
                  <TierButton onFocus={onFocusBlue} onBlur={onBlurBlue}>
                    Blue
                  </TierButton>
                  <TierButton onFocus={onFocusPurple} onBlur={onBlurPurple}>
                    Purple
                  </TierButton>
                </Tiers>
              </TierInfo>

              <TierInfoLetter>
                {white
                  ? '최다 득표 투표 항목과 본인 투표 일치가 0~100회 일때'
                  : null}
                {yellow
                  ? '최다 득표 투표 항목과 본인 투표 일치가 101~200회 일때'
                  : null}
                {green
                  ? '최다 득표 투표 항목과 본인 투표 일치가 201~300회 일때'
                  : null}
                {blue
                  ? '최다 득표 투표 항목과 본인 투표 일치가 301~400회 일때'
                  : null}
                {purple
                  ? '최다 득표 투표 항목과 본인 투표 일치가 401~500회 일때'
                  : null}
              </TierInfoLetter>
            </TierInfoContainer>
          ) : null}
          <BodyPadding>
            <StTitle>고민투표</StTitle>
            <StBox>
              <StInnerNavi onClick={() => navigate('/postvoted')}>
                <StInnerTitle>
                  <div>
                    <img src={IconEdit} alt="IconEdit" />
                  </div>
                  <div>내가 등록한 고민 투표</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>

              <StInnerNavi onClick={() => navigate('/voted')}>
                <StInnerTitle>
                  <div>
                    <img src={IconVoteTab} alt="IconVoteTab" />
                  </div>
                  <div>내가 투표한 고민 투표</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>
            </StBox>

            <StTitle>고민상담</StTitle>
            <StBox>
              <StInnerNavi onClick={() => navigate('/maderoom')}>
                <StInnerTitle>
                  <div>
                    <img src={IconEdit} alt="IconEdit" />
                  </div>
                  <div>내가 만든 고민 상담방</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>

              <StInnerNavi onClick={() => navigate('/operatingroom')}>
                <StInnerTitle>
                  <div>
                    <img src={IconChatting} alt="IconChatting" />
                  </div>
                  <div>대화중인 고민 상담방</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>
            </StBox>
          </BodyPadding>
        </>
      ) : (
        <>
          <MyPageHeadContainer>
            로그인하고 곰곰의 <br />
            다양한 서비스를 경험해보세요.
          </MyPageHeadContainer>
          <ButtonWrap>
            <StUserButton onClick={() => navigate('/login')}>
              로그인
            </StUserButton>
            <StUserButton onClick={() => navigate('/signup')}>
              회원가입
            </StUserButton>
          </ButtonWrap>
          <BodyPadding>
            <StTitle>고민투표</StTitle>
            <StBox>
              <StInnerNavi
                onClick={() => setModal('로그인 후 사용 가능합니다.')}
              >
                <StInnerTitle>
                  <div>
                    <img src={IconEdit} alt="IconEdit" />
                  </div>
                  <div>내가 등록한 고민 투표</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>

              <StInnerNavi
                onClick={() => setModal('로그인 후 사용 가능합니다.')}
              >
                <StInnerTitle>
                  <div>
                    <img src={IconVoteTab} alt="IconVoteTab" />
                  </div>
                  <div>내가 투표한 고민 투표</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>
            </StBox>

            <StTitle>고민상담</StTitle>
            <StBox>
              <StInnerNavi
                onClick={() => setModal('로그인 후 사용 가능합니다.')}
              >
                <StInnerTitle>
                  <div>
                    <img src={IconEdit} alt="IconEdit" />
                  </div>
                  <div>내가 만든 고민 상담방</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>

              <StInnerNavi
                onClick={() => setModal('로그인 후 사용 가능합니다.')}
              >
                <StInnerTitle>
                  <div>
                    <img src={IconChatting} alt="IconChatting" />
                  </div>
                  <div>대화중인 고민 상담방</div>
                </StInnerTitle>
                <StInnerArrow>
                  <img src={IconNext} alt="IconNext" />
                </StInnerArrow>
              </StInnerNavi>
            </StBox>
          </BodyPadding>
        </>
      )}
      {loggined !== null ? (
        <Logout onClick={onClickLogOut}>로그아웃</Logout>
      ) : null}

      <Footer state={state} />
    </div>
  );
};

export default MyPage;

const StTitle = styled.div`
  margin-bottom: 1.6rem;

  ${fontBold};
  line-height: 2.4rem;
  color: ${({ theme }) => theme.sub2};
`;

const StBox = styled.div`
  height: 10.4rem;
  background-color: ${({ theme }) => theme.white};
  margin-bottom: 3.2rem;

  border-radius: 2rem;
`;

const StInnerNavi = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50%;
  padding-left: 1.6rem;
  padding-right: 0.8rem;
`;

const StInnerTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  height: 100%;

  & > div:nth-child(1) {
    ${IconLarge}
  }
`;

const StInnerArrow = styled.div`
  ${IconMedium};
`;

const MyPageHeadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;

  width: 100%;
  height: 11.3rem;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.white};

  ${fontLarge}
  ${fontExtraBold}
  line-height: 3rem;
`;

const StProfileImgLarge = styled(ProfileImg)`
  width: 6.5rem;
  height: 6.5rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.8rem;

  width: 100%;
  height: 6.8rem;
  padding: 0 2rem;
  margin-bottom: 3.2rem;
  background-color: ${({ theme }) => theme.white};

  border-radius: 0 0 2rem 2rem;
`;

const StUserButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4.4rem;
  background-color: ${({ theme }) => theme.main2};

  border-radius: 2rem;

  ${fontExtraBold}
  ${fontMedium}
  color: ${({ theme }) => theme.white};
`;

const Badge = styled.div`
  width: 5rem;
  padding: 0 0.6rem;

  border-radius: 99rem;

  ${fontBold}
  ${fontSmall}
  color: ${({ theme }) => theme.white};
  line-height: 2rem;
  text-align: center;

  ${(props) =>
    props.userPoint <= 10
      ? css`
          background-color: #ececec;
        `
      : props.userPoint > 10 && props.userPoint <= 25
      ? css`
          background-color: #fdd74f;
        `
      : props.userPoint > 25 && props.userPoint <= 50
      ? css`
          background-color: #91dc6e;
        `
      : props.userPoint > 50 && props.userPoint <= 100
      ? css`
          background-color: #70a0ff;
        `
      : props.userPoint > 100
      ? css`
          background-color: #a57aff;
        `
      : null}
`;

const StNicknameWrap = styled.div`
  display: flex;
  align-items: center;

  gap: 0.8rem;
`;

const Nickname = styled.div`
  height: 3rem;

  ${fontLarge}
`;

const EditNickname = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.8rem;
  height: 3.6rem;
  padding: 0.8rem 1rem 0.8rem 0.8rem;

  border: none;
  border-radius: 99rem;
`;

const EditNicknameInput = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.sub4};
  min-width: 18.5rem;

  &:focus {
    outline: none;
  }
`;

const ScoreContainer = styled.div`
  padding: 0 2rem;
  background: ${({ theme }) => theme.white};
`;

const MyScore = styled.div`
  border: 1px solid ${({ theme }) => theme.sub4};
  border-radius: 2rem;
  width: 100%;
  height: 6.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
`;

const ScoreInfo1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30%;

  ${fontMedium}
  ${fontBold}
`;

const ScoreInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 30%;

  border-left: 1px solid ${({ theme }) => theme.sub4};
  border-right: 1px solid ${({ theme }) => theme.sub4};

  ${fontMedium}
  ${fontBold}
`;

const ScoreInfo3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 40%;

  ${fontMedium}
  ${fontBold}
`;

const ScoreDetail = styled.p`
  font-weight: 400;
  color: ${({ theme }) => theme.main2};
  margin-top: 1.1rem;
`;

const TierInfoContainer = styled.div`
  margin-top: -3.5rem;
`;

const TierInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.4rem 0 1.6rem 0;
  width: 100%;
  height: 5.5rem;
  margin-bottom: 2.4rem;
  background: #ffffff;
  border-radius: 0px 0px 20px 20px;
`;

const TierLetter = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  ${fontSmall}
  text-align: center;
  padding: 1rem 0;
  background-color: #fff;
  margin-bottom: 2.4rem;
  border-radius: 0px 0px 20px 20px;
`;

const Tiers = styled.div`
  display: flex;
  width: 100%;
  padding: 0 0.8rem;

  justify-content: space-around;
`;

const TierButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: #fff;
  color: #999999;
  font-size: 1.4rem;
  padding: 0 0.6rem;
  border-radius: 99rem;
  &:nth-child(1):focus {
    background-color: black;
    color: #fff;
  }
  &:nth-child(2):focus {
    background-color: #ffd232;
    color: #fff;
  }
  &:nth-child(3):focus {
    background-color: green;
    color: #fff;
  }
  &:nth-child(4):focus {
    background-color: #7aa7ff;
    color: #fff;
  }
  &:nth-child(5):focus {
    background-color: purple;
    color: #fff;
  }
`;

const TierInfoLetter = styled.p`
  margin-bottom: 2.4rem;
  text-align: center;
  ${fontMedium}
  padding-bottom: 2rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border-bottom: 1px solid #e6e6e6;
`;

const Logout = styled.div`
  cursor: pointer;

  margin-top: -1.5rem;

  text-align: center;
  ${fontSmall}
  color:#767676;
`;
