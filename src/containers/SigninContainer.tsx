import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Signin from "../components/Signin";
import { login as loginSagaStart } from "../redux/modules/auth";
import { LoginReqType } from "../type";

function SigninContainer() {
  const dispatch = useDispatch();
  const login = useCallback((reqData: LoginReqType) => {
    dispatch(loginSagaStart(reqData));
  }, []);

  return <Signin login={login} />;
}

export default SigninContainer;
