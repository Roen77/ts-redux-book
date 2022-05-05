import { useSelector } from "react-redux";
import { RootState } from "../type";

export default function useToken() {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );

  return token;
}
