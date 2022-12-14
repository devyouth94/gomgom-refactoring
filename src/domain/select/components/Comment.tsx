import React, { useState } from "react";
import { useAppDispatch } from "app/config/hooks";
import { __deleteComment, __editComment, __postRecomment } from "app/module/commentSlice";

import ProfileImg from "common/elements/ProfileImg";
import Recomment from "domain/select/components/Recomment";

import { userStorage } from "shared/utils/localStorage";
import { remainedTime } from "shared/utils/timeCalculation";

import { fontBold, fontExtraBold, fontExtraSmall, fontMedium } from "shared/themes/textStyle";
import styled, { css } from "styled-components";
import { CommentItemProps } from "types";

interface Props {
  comment: CommentItemProps;
  handleModal: (msg?: string) => void;
}

const Comment = ({ comment, handleModal }: Props) => {
  const dispatch = useAppDispatch();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [replyComment, setReplyComment] = useState("");

  const handleEditToggle = (comment: string) => {
    setIsEditMode((prev) => !prev);
    setNewComment(comment);
  };

  const handleReplyToggle = () => {
    setIsReplyMode((prev) => !prev);
  };

  const handleEditComment = (commentKey: number) => {
    if (!newComment.trim().length) {
      handleModal("내용을 입력해주세요.");
      return;
    }

    dispatch(__editComment({ comment: newComment, commentKey }));
    setIsEditMode((prev) => !prev);
  };

  const handleDeleteComment = (commentKey: number) => {
    dispatch(__deleteComment(commentKey));
  };

  const handlePostRecomment = (commentKey: number) => {
    if (!replyComment.trim().length) {
      handleModal("내용을 입력해주세요.");
      return;
    }

    dispatch(__postRecomment({ comment: replyComment, commentKey }));
    setIsReplyMode((prev) => !prev);
    setReplyComment("");
  };

  return (
    <S.Comment key={comment.commentKey}>
      <ProfileImg point={comment.point} size="4rem" />
      <div>
        <S.Top>
          <div>
            <span>{comment.nickname}</span>
            <span>{remainedTime(comment.updatedAt)} 전</span>
          </div>
          {userStorage.getUserKey() === comment.userKey ? (
            isEditMode ? (
              <div>
                <span onClick={() => handleEditComment(comment.commentKey)}>완료</span>
                <span onClick={() => setIsEditMode((prev) => !prev)}>취소</span>
              </div>
            ) : (
              <div>
                <span onClick={() => handleEditToggle(comment.comment)}>수정</span>
                <span onClick={() => handleDeleteComment(comment.commentKey)}>삭제</span>
              </div>
            )
          ) : null}
        </S.Top>

        <S.Middle>
          {isEditMode ? (
            <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
          ) : (
            comment.comment
          )}
        </S.Middle>

        <S.Bottom isReplyMode={isReplyMode}>
          {isReplyMode ? (
            <>
              <span onClick={handleReplyToggle}>답글 취소</span>
              <div>
                <input
                  value={replyComment}
                  onChange={(event) => setReplyComment(event.target.value)}
                  placeholder="답글을 남겨주세요"
                />
                <span onClick={() => handlePostRecomment(comment.commentKey)}>등록</span>
              </div>
            </>
          ) : (
            <span onClick={handleReplyToggle}>답글 달기</span>
          )}
        </S.Bottom>

        <S.ReplyContainer>
          {comment.recomment?.map((recomment) => (
            <Recomment
              key={recomment.recommentKey}
              recomment={recomment}
              handleModal={handleModal}
            />
          ))}
        </S.ReplyContainer>
      </div>
    </S.Comment>
  );
};

const S = {
  Comment: styled.article`
    display: grid;
    grid-template-columns: 4rem auto;
    gap: 1.6rem;

    padding: 2.4rem 2rem 0 2rem;
    border-top: 1px solid ${({ theme }) => theme.color.sub4};

    > div:nth-child(2) {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
  `,

  Top: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div:nth-child(1) {
      display: flex;
      align-items: center;

      > span:nth-child(1) {
        ${fontMedium};
        ${fontBold}
      }

      > span:nth-child(2) {
        margin-left: 0.8rem;

        ${fontExtraSmall};
        color: ${({ theme }) => theme.color.sub2};
      }
    }

    > div:nth-child(2) {
      display: flex;
      gap: 1.6rem;

      span {
        ${fontExtraSmall};
        ${fontExtraBold};

        cursor: pointer;
      }
    }
  `,

  Middle: styled.div`
    ${fontMedium};

    input {
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: 999rem;
      background-color: ${({ theme }) => theme.color.white};
    }
  `,

  Bottom: styled.div<{ isReplyMode: boolean }>`
    ${fontMedium};

    > span {
      color: ${({ theme }) => theme.color.main2};
      cursor: pointer;
    }

    ${(props) =>
      props.isReplyMode &&
      css`
        > div {
          display: grid;
          grid-template-columns: auto 2.2rem;
          align-items: center;
          gap: 0.8rem;

          margin-top: 1rem;

          input {
            padding: 0.5rem 1rem;
            border-radius: 999rem;
            background-color: ${({ theme }) => theme.color.white};
          }

          span {
            ${fontExtraSmall};
            ${fontExtraBold};

            cursor: pointer;
          }
        }
      `}
  `,

  ReplyContainer: styled.span`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    margin-top: 1rem;
  `,
};

export default Comment;
