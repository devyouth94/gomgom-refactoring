declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PUBLIC_URL: string;
    GENERATE_SOURCEMAP: string;
    REACT_APP_API: string;
    REACT_APP_SOCKET: string;
    REACT_APP_CLIENT_ID: string;
    REACT_APP_REDIRECT_URI: string;
    REACT_APP_GOOGLE_ID: string;
    REACT_APP_GOOGLE_CALLBACK_URL: string;
    REACT_APP_FCM_VAPID_KEY: string;
  }
}
