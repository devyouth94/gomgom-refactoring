import { useLocation } from "react-router-dom";

import WriteRoom from "domain/write/components/WriteRoom";
import WriteSelect from "domain/write/components/WriteSelect";
import { LocationState } from "types";

const Write = () => {
  const { state } = useLocation() as LocationState;

  return <>{state.now === "/select" ? <WriteSelect /> : <WriteRoom />}</>;
};

export default Write;
