import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select, Form, Input } from "antd";
import { useNavigate } from "react-router";

import cl from "../style.module.scss";
import { fetchGuarantors, getGuarantors } from "../../redux/reducers";
import { Loading, Button, Success, Error } from "../UI";

const RecipientAddContent = ({ isModal = false, handleCancelRecipientAdd }) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error, successModal } = useSelector(
    (state) => state.guarantor
  );
  const [state, setState] = useState({
    full_name: "",
    status: "",
    credit_history: null,
    phone: "",
    address: "",
    actual_address: "",
    income_statement: null,
  });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = () => {
    if (isModal) {
      dispatch(fetchGuarantors(state)).then(() => dispatch(getGuarantors()));
    } else {
      dispatch(fetchGuarantors(state));
    }
  };

  useEffect(() => {
    if (!isModal && success) navigate("/recipients");
    if (success && isModal) {
      dispatch(getGuarantors());
      handleCancelRecipientAdd && handleCancelRecipientAdd();
    }
  }, [success]);
  //-------------------------------------------
  return (
    <div className={cl.content}>
      <Form
        name="basic"
        autoComplete="off"
        onFinish={submitForm}
        onFinishFailed={() => alert("Заполните все поля")}
      >
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>ФИО залогодателя:</h2>
          <Form.Item
            name="full_name"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              name="full_name"
              onChange={handleInput}
              maxLength="100"
            />
          </Form.Item>
          {error && error.full_name && (
            <Error style={{ marginTop: "-20px" }}>{error.full_name}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Семейное положение:</h2>
          <Form.Item
            name="status"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              className={cl.content__accor}
              onChange={(e) => setState({ ...state, status: e })}
            >
              <Select.Option value="married">Женат/Замужем</Select.Option>
              <Select.Option value="divorced">Разведен</Select.Option>
              <Select.Option value="widow/widower">Вдова/Вдовец</Select.Option>
              <Select.Option value="single">Холост/Незамужем</Select.Option>
            </Select>
          </Form.Item>
          {error && error.status && <Error>{error.status}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Кредитная история:</h2>
          <Form.Item
            name="credit_history"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) => {
                setState({
                  ...state,
                  credit_history: e.target.files[0],
                });
              }}
            />
          </Form.Item>
          {error && error.credit_history && (
            <Error style={{ marginTop: "-20px" }}>{error.credit_history}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Номер телефона:</h2>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              name="phone"
              defaultValue="+996"
              onChange={handleInput}
              maxLength="30"
            />
          </Form.Item>
          {error && error.phone && (
            <Error style={{ marginTop: "-20px" }}>{error.phone}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Адрес прописки:</h2>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              name="address"
              onChange={handleInput}
              maxLength="100"
            />
          </Form.Item>
          {error && error.address && (
            <Error style={{ marginTop: "-20px" }}>{error.address}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Адрес фактический:</h2>
          <Form.Item
            name="actual_address"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              name="actual_address"
              onChange={handleInput}
              maxLength="100"
            />
          </Form.Item>
          {error && error.actual_address && (
            <Error style={{ marginTop: "-20px" }}>{error.actual_address}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Справка о доходах:</h2>
          <Form.Item
            name="income_statement"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) => {
                setState({
                  ...state,
                  income_statement: e.target.files[0],
                });
              }}
            />
          </Form.Item>
          {error && error.income_statement && (
            <Error>{error.income_statement}</Error>
          )}
        </div>
        {loading && <Loading>Отправка...</Loading>}
        {error && (
          <Error style={{ fontSize: "20px" }}>
            Данные не были отправлены. Проверьте корректность заполненых данных.
          </Error>
        )}
        {successModal && <Success>Данные успешно отправлены.</Success>}
        <Button disabled={loading}>Отправить</Button>
      </Form>
    </div>
  );
};

export default RecipientAddContent;
