import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";

import cl from "../style.module.scss";
import { getProperties, patchProperty } from "../../redux/reducers";
import { Loading, Button, Success, Error } from "../UI";

const PropertyIdPageContent = ({ isModal = false, handleCancelProperty }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { patchLoading, patchSuccess, patchError, propertyInfo } = useSelector(
    (state) => state.property
  );

  const [state, setState] = useState(
    propertyInfo && {
      type: propertyInfo.type,
      address: propertyInfo.address,
      imagesArray: [...propertyInfo.images],
      filesArray: [...propertyInfo.files],
    }
  );
  const [imageFiles, setImageFiles] = useState(
    propertyInfo && propertyInfo.images.length
  );
  const [fileFiles, setFileFiles] = useState(
    propertyInfo && propertyInfo.files.length
  );

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = () => {
    dispatch(patchProperty({ id: propertyInfo.id, obj: state }));
  };

  useEffect(() => {
    if (!propertyInfo) navigate("/properties");
  }, []);
  useEffect(() => {
    propertyInfo &&
      setState({
        ...state,
        type: propertyInfo && propertyInfo.type,
        address: propertyInfo && propertyInfo.address,
      });
  }, [propertyInfo]);
  useEffect(() => {
    if (!isModal && patchSuccess) navigate("/properties");
    if (isModal && patchSuccess) {
      dispatch(getProperties());
      handleCancelProperty && handleCancelProperty();
    }
  }, [patchSuccess]);
  return (
    <div className={cl.content}>
      {propertyInfo && (
        <Form
          name="basic"
          autoComplete="off"
          onFinish={submitForm}
          onFinishFailed={() => alert("Заполните все поля")}
        >
          <h2 className={cl.title}>
            {propertyInfo.id}.{propertyInfo.type}
          </h2>
          <div className={cl.content__category}>
            <h2 className={cl.content__title}>Залоговое имущество:</h2>
            <Input
              type="text"
              className={cl.content__input}
              name="type"
              value={state.type}
              onChange={handleInput}
            />
            {patchError && patchError.type && <Error>{patchError.type}</Error>}
          </div>
          <div className={cl.content__category}>
            <h2 className={cl.content__title}>Местонахождение залога:</h2>
            <Input
              type="text"
              className={cl.content__input}
              name="address"
              value={state.address}
              onChange={handleInput}
            />
            {patchError && patchError.address && (
              <Error>{patchError.address}</Error>
            )}
          </div>
          <div className={cl.content__category}>
            <h2 className={cl.content__title}>
              Документы на залоговое имущество:
            </h2>
            {propertyInfo.files.map((item, index) => (
              <>
                <input
                  type="file"
                  onChange={(e) => {
                    state.filesArray[index] = e.target.files[0];
                  }}
                />
                <p className={cl.file__name}>
                  Текущий файл :{" "}
                  <a href={propertyInfo.files[index].file}>
                    {propertyInfo.files[index].file}
                  </a>
                </p>
              </>
            ))}
            {[...Array(fileFiles - propertyInfo.files.length)].map((item) => (
              <input
                className={cl.content__additionalFiles}
                type="file"
                onChange={(e) => {
                  state.filesArray.push(e.target.files[0]);
                }}
              />
            ))}
            {fileFiles != 5 && (
              <div
                className={cl.content__addFiles}
                onClick={() => setFileFiles(fileFiles + 1)}
              >
                <BsPlusLg /> <span>Add another file</span>
              </div>
            )}
            {patchError && patchError.files && (
              <Error>{patchError.files}</Error>
            )}
          </div>
          <div className={cl.content__category}>
            <h2 className={cl.content__title}>
              Фотографии залогового имущество:
            </h2>
            {propertyInfo.images.map((item, index) => (
              <>
                <input
                  type="file"
                  key={item}
                  onChange={(e) => {
                    state.imagesArray[index] = e.target.files[0];
                  }}
                />
                <p className={cl.file__name}>
                  Текущий файл :{" "}
                  <a href={propertyInfo.images[index].image}>
                    {propertyInfo.images[index].image}
                  </a>
                </p>
              </>
            ))}
            {[...Array(imageFiles - propertyInfo.images.length)].map((item) => (
              <input
                className={cl.content__additionalFiles}
                type="file"
                onChange={(e) => {
                  state.imagesArray.push(e.target.files[0]);
                }}
              />
            ))}
            {imageFiles != 5 && (
              <div
                className={cl.content__addFiles}
                onClick={() => setImageFiles(imageFiles + 1)}
              >
                <BsPlusLg /> <span>Add another image</span>
              </div>
            )}
            {patchError && patchError.images && (
              <Error>{patchError.images}</Error>
            )}
          </div>
          {patchLoading && <Loading>Отправка...</Loading>}
          {patchError && (
            <Error style={{ fontSize: "20px" }}>
              Данные не были отправлены. Проверьте корректность заполненых
              данных.
            </Error>
          )}
          {patchSuccess && <Success>Данные успешно изменены.</Success>}
          <Button disabled={patchLoading}>Сохранить</Button>
        </Form>
      )}
    </div>
  );
};

export default PropertyIdPageContent;
