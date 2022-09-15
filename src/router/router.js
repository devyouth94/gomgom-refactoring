import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Welcome = lazy(() => import('../pages/Welcome'));
const Main = lazy(() => import('../pages/Main'));

const SignUp = lazy(() => import('../pages/SignUp'));
const Login = lazy(() => import('../pages/Login'));
const KakaoRedirect = lazy(() => import('../pages/KakaoRedirect'));
const GoogleRedirect = lazy(() => import('../pages/GoogleRedirect'));

const MyPage = lazy(() => import('../pages/MyPage'));
const PostVoted = lazy(() => import('../components/features/mypage/postVoted'));
const Voted = lazy(() => import('../components/features/mypage/Voted'));
const MadeRoom = lazy(() => import('../components/features/mypage/MadeRoom'));
const OperatingRoom = lazy(() =>
  import('../components/features/mypage/OperatingRoom'),
);

const Write = lazy(() => import('../pages/Write'));
const Detail = lazy(() => import('../pages/Detail'));
const ChatRoom = lazy(() => import('../pages/ChatRoom'));

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/main" element={<Main />} />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/api/auth/kakao/callback" element={<KakaoRedirect />} />
          <Route
            path="/api/auth/google/callback"
            element={<GoogleRedirect />}
          />

          <Route path="/mypage" element={<MyPage />} />
          <Route path="/postvoted" element={<PostVoted />} />
          <Route path="/voted" element={<Voted />} />
          <Route path="/maderoom" element={<MadeRoom />} />
          <Route path="/operatingroom" element={<OperatingRoom />} />

          <Route path="/write" element={<Write />} />
          <Route path="/detail/:selectKey" element={<Detail />} />
          <Route path="/chatroom/:roomKey" element={<ChatRoom />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
