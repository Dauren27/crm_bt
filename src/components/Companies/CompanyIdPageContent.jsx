import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BsPlusLg } from "react-icons/bs";
import { Select, Form, Input, Modal } from "antd";

import cl from "../style.module.scss";
import Activites from "../Actives/Actives";
import {
  getCompanies,
  patchCompany,
  getActivities,
} from "../../redux/reducers";
import { Loading, Button, Success, Error } from "../UI";

const CompanyIdPageContent = ({
  isModal = false,
  handleCancelCompany = false,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { patchError, patchLoading, patchSuccess, companyInfo } = useSelector(
    (state) => state.company
  );
  const { activities } = useSelector((state) => state.activity);
  const [state, setState] = useState({
    company_name: companyInfo && companyInfo.company_name,
    inn: companyInfo && companyInfo.inn,
    legal_address: companyInfo && companyInfo.legal_address,
    okpo: companyInfo && companyInfo.okpo,
    register_number: companyInfo && companyInfo.register_number,
    telephone: companyInfo && companyInfo.telephone,
    actual_address: companyInfo && companyInfo.actual_address,
    field_activity: companyInfo && companyInfo.field_activity,
  });

  const submitForm = () => {
    dispatch(patchCompany({ id: companyInfo.id, obj: state }));
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);
  useEffect(() => {
    if (!companyInfo) navigate("/companies");
  }, []);
  useEffect(() => {
    companyInfo &&
      setState({
        company_name: companyInfo.company_name,
        inn: companyInfo.inn,
        legal_address: companyInfo.legal_address,
        okpo: companyInfo.okpo,
        register_number: companyInfo.register_number,
        telephone: companyInfo.telephone,
        actual_address: companyInfo.actual_address,
        field_activity: companyInfo.field_activity,
      });
  }, [companyInfo]);
  useEffect(() => {
    if (!isModal && patchSuccess) navigate("/companies");
    if (isModal && patchSuccess) {
      dispatch(getCompanies());
      handleCancelCompany && handleCancelCompany();
    }
  }, [patchSuccess]);

  //-------------------------------------------

  //---Modals----------------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    companyInfo && (
      <div>
        <div className={cl.content}>
          <h2 className={cl.title}>
            {companyInfo.id}.{companyInfo.company_name}
          </h2>
          <Form
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Наименование компании:</h2>
              <Input
                className={cl.content__input}
                type="text"
                value={state.company_name}
                onChange={handleInput}
                name="company_name"
                maxLength="100"
              />
              {patchError && patchError.company_name && (
                <Error>{patchError.company_name}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>ИНН Компании:</h2>

              <Input
                className={cl.content__input}
                type="text"
                value={state.inn}
                onChange={handleInput}
                name="inn"
                maxLength="14"
              />
              {patchError && patchError.inn && <Error>{patchError.inn}</Error>}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Юридический адрес:</h2>
              <Input
                className={cl.content__input}
                type="text"
                onChange={handleInput}
                value={state.legal_address}
                name="legal_address"
                maxLength="100"
              />
              {patchError && patchError.legal_address && (
                <Error>{patchError.legal_address}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Фактический адрес:</h2>
              <Input
                className={cl.content__input}
                type="text"
                onChange={handleInput}
                value={state.actual_address}
                name="actual_address"
                maxLength="100"
              />
              {patchError && patchError.actual_address && (
                <Error>{patchError.actual_address}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Номер телефона:</h2>

              <Input
                className={cl.content__input}
                type="text"
                onChange={handleInput}
                value={state.telephone}
                name="telephone"
                maxLength="30"
              />
              {patchError && patchError.legal_address && (
                <Error>{patchError.legal_address}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Сфера деятельности:</h2>
              <div className={cl.content__select__container}>
                <Select
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, field_activity: e });
                  }}
                  value={
                    state.field_activity && {
                      label: state.field_activity,
                      value: state.field_activity,
                    }
                  }
                  className={cl.content__accor}
                  fieldNames={{ label: "activites_add", value: "id" }}
                  filterOption={(input, option) =>
                    (option?.activites_add.toLocaleLowerCase() ?? "").includes(
                      input.toLocaleLowerCase()
                    )
                  }
                  options={activities && activities}
                />
                {patchError && patchError.activites_add && (
                  <Error>{patchError.activites_add}</Error>
                )}
                <BsPlusLg className={cl.add__svg} onClick={showModal} />
              </div>
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Окпо:</h2>

              <Input
                className={cl.content__input}
                type="text"
                value={state.okpo}
                onChange={handleInput}
                name="okpo"
                maxLength="8"
              />
              {patchError && patchError.okpo && (
                <Error>{patchError.okpo}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Регистрационный номер:</h2>
              <Input
                className={cl.content__input}
                type="text"
                value={state.register_number}
                onChange={handleInput}
                name="register_number"
                maxLength="30"
              />
              {patchError && patchError.register_number && (
                <Error>{patchError.register_number}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Документ компании: </h2>

              <input
                type="file"
                className={cl.content__file}
                name="document"
                onChange={(e) => {
                  setState({
                    ...state,
                    document: e.target.files[0],
                  });
                }}
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={companyInfo.document}>{companyInfo.document}</a>
              </p>
              {patchError && patchError.document && (
                <Error>{patchError.document}</Error>
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

          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Activites />
          </Modal>
        </div>
      </div>
    )
  );
};

export default CompanyIdPageContent;
