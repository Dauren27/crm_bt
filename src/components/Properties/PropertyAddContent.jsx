import { Form, Input } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";

import cl from "../style.module.scss";
import { fetchProperties, getProperties } from "../../redux/reducers";
import { Loading, Button, Success, Error } from "../UI";

const PropertyAddContent = ({ isModal = false, handleCancelPropertyAdd }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.property);
  const [state, setState] = useState({
    type: "",
    address: "",
    filesArray: [],
    imagesArray: [],
  });
  const [imageFiles, setImageFiles] = useState(0);
  const [fileFiles, setFileFiles] = useState(0);

  const submitForm = () => {
    dispatch(fetchProperties(state));
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!isModal && success) navigate("/properties");
    if (isModal && success) {
      dispatch(getProperties());
      handleCancelPropertyAdd && handleCancelPropertyAdd();
    }
  }, [success]);
  return (
    <div className={cl.content}>
      <Form
        name="basic"
        autoComplete="off"
        onFinish={submitForm}
        onFinishFailed={() => alert("Заполните все поля")}
      >
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Залоговое имущество:</h2>
          <Form.Item
            name="text"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              type="text"
              className={cl.content__input}
              name="type"
              onChange={handleInput}
            />
          </Form.Item>
          {error && error.type && (
            <Error style={{ marginTop: "-20px" }}>{error.type}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Местонахождение залога:</h2>
          <Form.Item
            name="address"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              type="text"
              className={cl.content__input}
              name="address"
              onChange={handleInput}
            />
          </Form.Item>
          {error && error.address && (
            <Error style={{ marginTop: "-20px" }}>{error.address}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>
            Документы на залоговое имущество:
          </h2>
          <Form.Item
            name="files"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) => state.filesArray.push(e.target.files[0])}
            />
          </Form.Item>
          {[...Array(fileFiles)].map((item) => (
            <input
              className={cl.content__additionalFiles}
              type="file"
              onChange={(e) => {
                state.filesArray.push(e.target.files[0]);
              }}
            />
          ))}
          {fileFiles != 4 && (
            <div
              className={cl.content__addFiles}
              onClick={() => setFileFiles(fileFiles + 1)}
            >
              <BsPlusLg /> <span>Add another file</span>
            </div>
          )}
          {error && error.files && (
            <Error style={{ marginTop: "-20px" }}>{error.files}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>
            Фотографии залогового имущество:
          </h2>
          <Form.Item
            name="images"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) => {
                state.imagesArray.push(e.target.files[0]);
              }}
            />
          </Form.Item>
          {[...Array(imageFiles)].map((item) => (
            <input
              className={cl.content__additionalFiles}
              type="file"
              onChange={(e) => {
                state.imagesArray.push(e.target.files[0]);
              }}
            />
          ))}
          {imageFiles != 4 && (
            <div
              className={cl.content__addFiles}
              onClick={() => setImageFiles(imageFiles + 1)}
            >
              <BsPlusLg /> <span>Add another image</span>
            </div>
          )}
          {error && error.images && (
            <Error style={{ marginTop: "-20px" }}>{error.images}</Error>
          )}
        </div>
        {loading && <Loading>Отправка...</Loading>}
        {error && (
          <Error style={{ fontSize: "20px" }}>
            Данные не были отправлены. Проверьте корректность заполненых данных.
          </Error>
        )}
        {success && <Success>Данные успешно отправлены.</Success>}
        <Button disabled={loading}>Отправить</Button>
      </Form>
    </div>
  );
};

export default PropertyAddContent;
