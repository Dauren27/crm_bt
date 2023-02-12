import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import cl from "./Actives.module.scss";
import { fetchActivity, getActivities } from "../../redux/reducers";
import { Button, Error, Loading, Success } from "../UI";

const Activites = () => {
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();

  const [state, setState] = useState({});
  const { success, loading, error } = useSelector((state) => state.activity);

  const submitForm = () => {
    dispatch(fetchActivity(state)).then(() => dispatch(getActivities()));
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(fetchActivity());
  }, [dispatch]);

  return (
    <form
      className={cl.companies__category}
      onSubmit={handleSubmit(submitForm)}
    >
      <h2 className={cl.companies__title}>Добавить источник дохода:</h2>
      <input
        className={cl.companies__input}
        type="text"
        onChange={handleInput}
        name="activites_add"
        required
      />
      {success && <Success>Данные были успешно отправлены</Success>}
      {loading && <Loading>Загрузка...</Loading>}
      {error && <Error>Данные не были отправлены</Error>}
      <Button disabled={loading}>Submit</Button>
    </form>
  );
};

export default Activites;
