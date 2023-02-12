import classNames from "classnames";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

import cl from "./registration.module.scss";
import { registerUser } from "../../redux/reducers";
import { Loading, Button, Success, Error } from "../../components/UI";

const Registration = () => {
  const { registerLoading, registerError, registerSuccess } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const navigate = useNavigate();
  const [state, setState] = useState({});
  const submitForm = () => {
    dispatch(registerUser(state));
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (registerSuccess) navigate("/login");
  }, [registerSuccess]);
  return (
    <div className={cl.registration}>
      <form
        className={classNames(cl.registration__form, "row")}
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className={cl.registration__title}>Регистрация</h1>
        <div className={cl.registration__row}>
          <h4 className={cl.title}>ФИО:</h4>
          <input
            type="text"
            className={cl.input}
            name="full_name"
            required
            autoComplete="off"
            onChange={handleInput}
          />
          {registerError && registerError.full_name && (
            <Error>{registerError.full_name}</Error>
          )}
        </div>
        <div className={cl.registration__row}>
          <h4 className={cl.title}>Номер телефона:</h4>
          <input
            className={cl.input}
            type="tel"
            name="phone_number"
            required
            autoComplete="off"
            onChange={handleInput}
          />
          {registerError && registerError.phone_number && (
            <Error>{registerError.phone_number}</Error>
          )}
        </div>
        <div className={cl.registration__row}>
          <h4 className={cl.title}>Должность:</h4>
          <Select
            id="occupation"
            className={cl.select}
            required
            onChange={(e) => setState({ ...state, occupation: e })}
          >
            <Select.Option value="admin">Кредитный админ</Select.Option>
            <Select.Option value="spec">Кредититный специалист</Select.Option>
          </Select>
          {registerError && registerError.occupation && (
            <Error>{registerError.occupation}</Error>
          )}
        </div>
        <div className={cl.registration__row}>
          <h4 className={cl.title}>Логин:</h4>
          <input
            type="email"
            name="email"
            required
            className={cl.input}
            autoComplete="off"
            onChange={handleInput}
          />
          {registerError && registerError.email && (
            <Error>{registerError.email}</Error>
          )}
        </div>
        <div className={cl.registration__row}>
          <h4 className={cl.title}>Пароль:</h4>
          <input
            type="password"
            className={cl.input}
            name="password"
            required
            autoComplete="off"
            onChange={handleInput}
          />
          {registerError && registerError.password && (
            <Error>{registerError.password}</Error>
          )}
        </div>
        <div className={cl.registration__row}>
          <h4 className={cl.title}> Подтвердить пароль:</h4>
          <input
            type="password"
            className={cl.input}
            name="password_confirm"
            required
            autoComplete="off"
            onChange={handleInput}
          />
          {registerError && registerError.password_confirm && (
            <Error>{registerError.password_confirm}</Error>
          )}
          {registerError && registerError.non_field_errors && (
            <Error>{registerError.non_field_errors}</Error>
          )}
        </div>
        <div className={cl.link}>
          <NavLink to="/login">Войти</NavLink>
        </div>
        {registerLoading && <Loading>Загрузка...</Loading>}
        {registerSuccess && <Success>Вы были успешно зарегестрированы</Success>}
        {registerError && Number.isInteger(registerError) && (
          <Error style={{ fontSize: "20px" }}>{registerError}</Error>
        )}
        <Button type="submit" disabled={registerLoading}>
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};

export default Registration;
