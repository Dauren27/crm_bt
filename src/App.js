import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.min.css";

import { PrivateRoutes, PublicRoutes } from "./routes/routes";
import { GlobalContext } from "./context";
import { getUserDetail, updateToken } from "./redux/reducers";

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateToken());
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(getUserDetail());
  }, [isAuth]);

  return (
    <>
      <BrowserRouter>
        <GlobalContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
          {isAuth ? <PrivateRoutes /> : <PublicRoutes />}
        </GlobalContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
