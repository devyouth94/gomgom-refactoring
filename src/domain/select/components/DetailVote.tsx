import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import instance from "app/module/instance";

import GlobalButton from "common/elements/GlobalButton";

import { DetailItemProps, VoteResultProps } from "types";
import theme from "shared/themes/theme";
import { fontBold, fontExtra, fontExtraBold, fontMedium } from "shared/themes/textStyle";
import { borderBoxDefault } from "shared/themes/boxStyle";

import styled, { css } from "styled-components";

interface Props {
  info: DetailItemProps;
  selectKey: string | undefined;
  handleLoginModal: (msg?: string) => void;
}

const initailVoteResult = {
  msg: "",
  ok: true,
  result: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    total: 0,
    isVote: 0,
  },
};

const DetailVote = ({ info, selectKey, handleLoginModal }: Props) => {
  const [voteResult, setVoteResult] = useState<VoteResultProps>(initailVoteResult);
  const [selectedNumber, setSelectedNumber] = useState(0);

  const __getVoteResult = useCallback(async () => {
    const { data } = await instance.get(`/select/vote/${selectKey}`);
    setVoteResult(data);
  }, [selectKey]);

  useEffect(() => {
    __getVoteResult();
  }, [__getVoteResult]);

  const __postVote = async () => {
    try {
      const { data } = await instance.post(`/select/vote/${selectKey}`, {
        choice: selectedNumber,
      });
      setVoteResult(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        handleLoginModal((error.response?.data as { errMsg?: string }).errMsg);
      }
    }
  };

  return (
    <>
      {voteResult.msg?.includes("성공") ? (
        <S.ResultContainer>
          {info.options?.map((option, idx) => (
            <S.Result bgImage={info.image[idx]} key={idx}>
              <div>{voteResult.result[idx + 1] || 0}%</div>
              <div>{option}</div>
            </S.Result>
          ))}
        </S.ResultContainer>
      ) : (
        <S.VoteContainer isSelect={selectedNumber} image={info.image}>
          {info.options?.map((option, idx) => (
            <S.Vote bgImage={info.image[idx]} key={idx} onClick={() => setSelectedNumber(idx + 1)}>
              <input
                type="radio"
                hidden
                id={option}
                checked={selectedNumber === idx + 1}
                onChange={() => setSelectedNumber(idx + 1)}
              />
              <label htmlFor={option}>{option}</label>
              <GlobalButton
                onClick={__postVote}
                h="4.8rem"
                bgc={theme.color.white}
                font={theme.color.black}
                borderR="1.5rem"
                fw="bold"
              >
                클릭 후 투표
              </GlobalButton>
            </S.Vote>
          ))}
        </S.VoteContainer>
      )}
    </>
  );
};

export default DetailVote;

interface BgImageProps {
  bgImage: string;
}

interface ImageProps {
  isSelect: number;
  image: string[];
}

const S = {
  ResultContainer: styled.section`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 100%;
    height: 100%;
    padding: 2rem;
    margin: 2.4rem 0 4.8rem 0;
    background-color: ${({ theme }) => theme.color.sub5};

    border-radius: 2rem;
  `,

  Result: styled.article<BgImageProps>`
    ${borderBoxDefault};
    gap: 0.8rem;

    height: 15rem;
    padding: 2.65rem 1.6rem;
    background-color: ${(props) =>
      props.bgImage ? props.theme.color.white : props.theme.color.main2};
    color: ${({ theme }) => theme.color.white};

    //투표 결과 퍼센트
    div:nth-child(1) {
      ${fontExtra};
      ${fontExtraBold};
      line-height: 4.8rem;
    }

    //투표 선택지 이름
    div:nth-child(2) {
      ${fontMedium};
      line-height: 2.1rem;
    }

    ${(props) =>
      props.bgImage &&
      css<BgImageProps>`
        background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
          url(${(props) => props.bgImage});
        background-size: cover;
        background-position: center center;

        color: ${({ theme }) => theme.color.white};
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
      `}
  `,

  VoteContainer: styled.section<ImageProps>`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    width: 100%;
    padding: 2rem;
    margin: 2.4rem 0 4.8rem 0;
    background-color: ${({ theme }) => theme.color.sub5};

    border-radius: 2rem;

    //클릭한 선택지 CSS
    & > div:nth-child(${(props) => props.isSelect}) {
      display: flex;
      justify-content: space-between;

      background-color: ${({ theme }) => theme.color.main2};

      transition-duration: 0.3s;

      ${(props) =>
        props.image?.[0] &&
        css<ImageProps>`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
            url(${(props) => props.image[props.isSelect - 1]});
          background-size: cover;
          background-position: center center;
        `}

      //클릭한 선택지의 이름
      label {
        color: ${({ theme }) => theme.color.white};
        line-height: 2.4rem;
      }

      //클릭 후 투표 버튼
      button {
        display: flex;
      }
    }
  `,

  Vote: styled.div<BgImageProps>`
    ${borderBoxDefault};
    height: 15rem;
    padding: 2.6rem 1.6rem;
    background-color: #fff;

    ${fontBold}

    cursor: pointer;

    //클릭 후 투표 버튼
    //안보이다가 onclick 발생시 위의 코드에서 block으로 바뀝니다
    button {
      display: none;
    }

    //이미지 선택지면 글씨 컬러 흰색, 그림자 효과
    ${(props) =>
      props.bgImage &&
      css<BgImageProps>`
        background-image: url(${(props) => props.bgImage});
        background-size: cover;
        background-position: center center;

        label {
          color: #fff;
          text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
        }
      `}
  `,
};
