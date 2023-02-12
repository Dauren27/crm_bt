import classNames from "classnames";
import React from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import cl from "./Login.module.scss";
import { userLogin } from "../../redux/reducers";
import { Loading, Button, Error } from "../../components/UI";

const Login = () => {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const submitForm = (data) => {
    dispatch(userLogin(data));
  };
  return (
    <div className={cl.login}>
      <form
        className={classNames(cl.login__form, "row")}
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className={cl.login__title}>Вход</h1>
        <div className={cl.login__row}>
          <h4 className={cl.title}>Логин:</h4>
          <input
            type="email"
            className={cl.input}
            {...register("email")}
            required
            autoComplete="off"
          />
        </div>
        <div className={cl.login__row}>
          <h4 className={cl.title}>Пароль:</h4>
          <input
            type="password"
            className={cl.input}
            {...register("password")}
            required
            autoComplete="off"
          />
        </div>
        <div className={cl.link} style={{ marginTop: "10px" }}>
          <NavLink to="/registration">Регистрация</NavLink>
        </div>
        {loading && <Loading>Загрузка...</Loading>}
        {error &&
          (error.response.data && typeof error.response.data == "object" ? (
            Object.keys(error.response.data).map((item) => (
              <Error style={{ fontSize: "20px" }}>
                {error.response.data[item]}
              </Error>
            ))
          ) : (
            <Error>{error.message && error.message}</Error>
          ))}
        <Button type="submit" disabled={loading}>
          Войти
        </Button>
      </form>
    </div>
  );
};

export default Login;
