import { useAppDispatch } from "app/config/hooks";
import { useLocation } from "react-router-dom";
import { __getSelectBySearch, clearError, clearQuery } from "app/module/selectSlice";

import BasicModal from "common/components/modal/BasicModal";
import LoginModal from "common/components/modal/LoginModal";
import WriteModal from "domain/select/components/WriteModal";
import Header from "common/components/Header";
import Layout from "common/components/Layout";
import Search from "common/components/Search";
import Category from "domain/select/components/Category";
import SelectItem from "common/components/SelectItem";
import WriteButton from "common/elements/WriteButton";
import ScrollTopButton from "common/elements/ScrollTopButton";
import Nav from "common/components/Nav";

import { SelectItemProps } from "types";
import useInfiniteScroll from "common/hooks/useInfiniteScroll";
import useGetSelect from "domain/select/hooks/useGetSelect";
import useModalState from "common/hooks/useModalState";
import useScrollTop from "common/hooks/useScrollTop";
import { fontMedium } from "shared/themes/textStyle";

import Logo from "static/images/Logo.svg";
import IconSurvey from "static/icons/Variety=Survey, Status=untab, Size=L.svg";
import styled from "styled-components";

export const FEEDBACK_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSeHPoDci-rlaFfTEteUDaJXwnoVvvLUKDBQ831gb1o1U6fF5A/viewform";

const Select = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const { page, setLastItemRef, refreshPage } = useInfiniteScroll();
  const { data, selected, error } = useGetSelect(page);
  const isScroll = useScrollTop();

  const [loginModal, handleLoginModal] = useModalState(false);
  const [writeModal, handleWriteModal] = useModalState(false);

  return (
    <>
      {error && <BasicModal handleClick={() => dispatch(clearError())}>{error}</BasicModal>}
      {loginModal && <LoginModal handleClick={handleLoginModal} />}
      {writeModal && <WriteModal handleClick={handleWriteModal} />}

      <Header w="4.5rem">
        <img onClick={() => window.location.reload()} src={Logo} alt="Logo" />
        <div />
        <a href={FEEDBACK_LINK} target="_blank" rel="noreferrer">
          <img src={IconSurvey} alt="IconSurvey" />
        </a>
      </Header>

      <Search
        query={selected.query}
        refreshPage={refreshPage}
        clearQuery={clearQuery}
        getListBySearch={__getSelectBySearch}
        text="?????? ??????/?????? ??????(10??? ??????)"
      />

      <Category
        filter={selected.filter}
        category={selected.category}
        proceeding={selected.proceeding}
        length={data.length}
        refreshPage={refreshPage}
      />

      <Layout>
        <S.Container>
          {!data.length && <span>????????? ????????????.</span>}
          {data?.map((item: SelectItemProps, idx: number) => (
            <SelectItem
              key={item.selectKey}
              item={item}
              idx={idx}
              setRef={setLastItemRef}
              length={data.length}
              pathname={pathname}
            />
          ))}
        </S.Container>
      </Layout>

      <WriteButton
        pathname={pathname}
        handleWriteModal={handleWriteModal}
        handleLoginModal={handleLoginModal}
      />

      {isScroll && <ScrollTopButton />}

      <Nav nowLocation={pathname} />
    </>
  );
};

const S = {
  Container: styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;

    padding: 17rem 0 9.6rem 0;

    > span {
      margin-top: 4rem;
      ${fontMedium};
    }
  `,
};

export default Select;
