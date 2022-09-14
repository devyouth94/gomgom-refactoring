import React from 'react';
import { useState } from 'react';

import imageCompression from 'browser-image-compression';

import { borderBoxDefault } from '../../../shared/themes/boxStyle';
import { IconMedium, IconSmall } from '../../../shared/themes/iconStyle';
import { fontBold, fontSmall } from '../../../shared/themes/textStyle';

import IconImage from '../../../static/icons/Variety=image, Status=untab.svg';
import IconImageDelete from '../../../static/icons/Variety=image delete, Status=L.svg';

import styled from 'styled-components';

const WriteImageUpload = ({ setImages, num }) => {
  const [previewImg, setPreviewImg] = useState({});

  //이미지 미리보기
  const encodeFile = (file, name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = () => {
        setPreviewImg((prev) => ({ ...prev, [name]: reader.result }));
        resolve();
      };
    });
  };

  const fileHandler = (event) => {
    const { name } = event.target;
    const file = event.target.files[0];

    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }).then((compressedFile) => {
      const newFile = new File([compressedFile], file.name, {
        type: file.type,
      });
      encodeFile(newFile, name);
      setImages((prev) => ({ ...prev, [name]: newFile }));
    });
  };

  const deletePreviewHandler = (payload) => {
    setPreviewImg((prev) => ({ ...prev, [payload]: '' }));
    setImages((prev) => ({ ...prev, [payload]: '' }));
  };

  return (
    <>
      {previewImg[num] ? (
        <StPreview previewImg={previewImg[num]}>
          <StDeleteButton onClick={() => deletePreviewHandler(num)}>
            <StCancelIcon>
              <img src={IconImageDelete} alt="IconImageDelete" />
            </StCancelIcon>
            <span>삭제</span>
          </StDeleteButton>
        </StPreview>
      ) : (
        <StImageLabel>
          <input
            name={num}
            hidden
            type="file"
            accept="image/*"
            onChange={(event) => fileHandler(event)}
          />
          <StImageIcon>
            <img src={IconImage} />
          </StImageIcon>
          <StImageUpload>이미지 첨부(선택)</StImageUpload>
        </StImageLabel>
      )}
    </>
  );
};

export default WriteImageUpload;

const StPreview = styled.div`
  ${borderBoxDefault};
  height: 15rem;
  margin-top: 2.8rem;

  background: url(${(props) => props.previewImg});
  background-size: cover;
  background-position: center center;
`;

const StDeleteButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  span {
    ${fontSmall};
    ${fontBold};
    line-height: 2rem;
    color: #fff;
    text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
  }
`;

const StCancelIcon = styled.div`
  ${IconMedium};
`;

const StImageLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const StImageIcon = styled.div`
  ${IconSmall};
`;

const StImageUpload = styled.span`
  ${fontSmall}
  ${fontBold}
  line-height: 2rem;
  color: ${({ theme }) => theme.sub1};
`;
