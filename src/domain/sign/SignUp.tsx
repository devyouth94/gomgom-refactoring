import { useNavigate } from "react-router-dom";
import instance from "app/module/instance";
import axios from "axios";

import ModalBasic from "common/components/modal/BasicModal";
import Header from "common/components/Header";
import Layout from "common/components/Layout";
import GlobalInput from "common/elements/GlobalInput";
import GlobalButton from "common/elements/GlobalButton";

import useModalState from "common/hooks/useModalState";
import useSignUpInput from "domain/sign/hooks/useValidate";
import { fontBold, fontSmall } from "shared/themes/textStyle";

import IconBack from "static/icons/Variety=back, Status=untab, Size=L.svg";
import styled from "styled-components";

const SignUp = () => {
  const navigate = useNavigate();

  const { signUpInfo, validateInfo, handleOnChange } = useSignUpInput();
  const [modal, handleModal, message] = useModalState(false);
  const [successModal, handleSuccessModal] = useModalState(false);

  const handleClickSignUp = async () => {
    try {
      await instance.post("/user/signup", signUpInfo);
      handleSuccessModal();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleModal((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  };

  return (
    <>
      {successModal && (
        <ModalBasic handleClick={() => navigate("/login", { replace: true })}>
          회원가입을 완료했습니다
        </ModalBasic>
      )}

      {modal && <ModalBasic handleClick={handleModal}>{message}</ModalBasic>}

      <Header>
        <img onClick={() => navigate(-1)} src={IconBack} alt="IconBack" />
        <h1>회원가입</h1>
      </Header>

      <Layout>
        <S.Container>
          <S.InnerContainer validate={`${validateInfo.userId?.includes("가능한")}`}>
            <h2>아이디</h2>
            <GlobalInput
              name="userId"
              type="text"
              placeholder="아이디 입력"
              minLength={6}
              maxLength={12}
              onChange={handleOnChange}
            />
            {validateInfo.userId && <span>{validateInfo.userId}</span>}
          </S.InnerContainer>

          <S.InnerContainer validate={`${validateInfo.password?.includes("가능한")}`}>
            <h2>비밀번호</h2>
            <GlobalInput
              name="password"
              type="password"
              placeholder="영문,숫자로만 6자리 이상"
              minLength={6}
              maxLength={20}
              onChange={handleOnChange}
            />
            {validateInfo.password && <span>{validateInfo.password}</span>}

            <GlobalInput
              name="confirm"
              type="password"
              placeholder="비밀번호 재입력"
              minLength={6}
              maxLength={20}
              onChange={handleOnChange}
            />
            {validateInfo.confirm && <span>{validateInfo.confirm}</span>}
          </S.InnerContainer>

          <S.InnerContainer
            validate={`${
              validateInfo.nickname?.includes("가능한") || validateInfo.nickname?.includes("익명")
            }`}
          >
            <h2>닉네임</h2>
            <GlobalInput
              name="nickname"
              type="text"
              placeholder="최소 2자 입력"
              minLength={2}
              maxLength={10}
              onChange={handleOnChange}
            />
            <span>{validateInfo.nickname}</span>
          </S.InnerContainer>

          <GlobalButton onClick={handleClickSignUp}>가입하기</GlobalButton>
        </S.Container>
      </Layout>
    </>
  );
};

export default SignUp;

interface ValidateProps {
  validate: string;
}

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;

    padding-top: 8.4rem;
  `,

  InnerContainer: styled.article<ValidateProps>`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;

    h2 {
      ${fontBold};
      line-height: 2.4rem;
    }

    span {
      margin-top: -1.2rem;
      margin-left: 1.2rem;

      ${fontSmall}
      line-height: 2rem;
      color: ${(props) =>
        props.validate === "true" ? props.theme.color.sub2 : props.theme.color.warning};
    }
  `,
};
