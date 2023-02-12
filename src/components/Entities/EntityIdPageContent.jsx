import React, { useEffect, useState } from "react";
import { Select, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

import cl from "../style.module.scss";
import {
  getEntities,
  patchEntity,
  getCompanies,
  getCompany,
  getActivities,
  getProperties,
  getProperty,
} from "../../redux/reducers";
import PropertyContent from "../Properties/PropertyAddContent";
import CompaniesContent from "../Companies/CompanyAddContent";
import PropertyIdPageContent from "../Properties/PropertyIdPageContent";
import CompanyIdPageContent from "../Companies/CompanyIdPageContent";
import { Loading, Button, Success, Error } from "../UI";

const EntityIdPageContent = ({
  isModal = false,
  handleCancelEntityModal = false,
}) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { properties } = useSelector((state) => state.property);
  const { companies } = useSelector((state) => state.company);
  const { entityInfo, patchLoading, patchSuccess, patchError } = useSelector(
    (state) => state.entity
  );

  const [state, setState] = useState({
    address: entityInfo && entityInfo.address,
    assets: entityInfo && entityInfo.assets,
    average_salary: entityInfo && entityInfo.average_salary,
    client_actual_address: entityInfo && entityInfo.client_actual_address,
    client_company: entityInfo && entityInfo.client_company,
    credit_sum: entityInfo && entityInfo.credit_sum,
    credit_type: entityInfo && entityInfo.credit_type,
    current_loan: entityInfo && entityInfo.current_loan,
    full_name_director: entityInfo && entityInfo.full_name_director,
    id_company: entityInfo && entityInfo.id_company,
    id_property: entityInfo && entityInfo.id_property,
    inn: entityInfo && entityInfo.inn,
    own_contribution: entityInfo && entityInfo.own_contribution,
    phone: entityInfo && entityInfo.phone,
    status: entityInfo && entityInfo.status,
  });

  const submitForm = () => {
    dispatch(patchEntity({ id: entityInfo.id, obj: state }));
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const openPropertyModal = (id) => {
    dispatch(getProperty({ id: id })).then(() => showModalProperty());
  };
  const openCompanyModal = (id) => {
    dispatch(getCompany({ id: id })).then(() => showModalCompany());
  };

  useEffect(() => {
    dispatch(getCompanies());
    dispatch(getActivities());
    dispatch(getProperties());
  }, [dispatch]);
  useEffect(() => {
    if (!entityInfo) navigate("/counterparties");
  }, []);
  useEffect(() => {
    entityInfo &&
      setState({
        address: entityInfo.address,
        assets: entityInfo.assets,
        average_salary: entityInfo.average_salary,
        client_actual_address: entityInfo.client_actual_address,
        client_company: entityInfo.client_company,
        credit_sum: entityInfo.credit_sum,
        credit_type: entityInfo.credit_type,
        current_loan: entityInfo.current_loan,
        full_name_director: entityInfo.full_name_director,
        id_company: entityInfo.id_company,
        id_property: entityInfo.id_property,
        inn: entityInfo.inn,
        own_contribution: entityInfo.own_contribution,
        phone: entityInfo.phone,
        status: entityInfo.status,
      });
  }, [entityInfo]);
  useEffect(() => {
    if (!isModal && patchSuccess) navigate("/counterparties");
    if (isModal && patchSuccess) {
      dispatch(getEntities());
      handleCancelEntityModal && handleCancelEntityModal();
    }
  }, [patchSuccess]);

  //-------------------------------------------

  //---Modals----------------------------------
  const [isModalOpenPropertyAdd, setIsModalOpenPropertyAdd] = useState(false);
  const showModalPropertyAdd = () => {
    setIsModalOpenPropertyAdd(true);
  };
  const handleOkPropertyAdd = () => {
    setIsModalOpenPropertyAdd(false);
  };
  const handleCancelPropertyAdd = () => {
    setIsModalOpenPropertyAdd(false);
  };
  const [isModalOpenCompanyAdd, setIsModalOpenCompanyAdd] = useState(false);
  const showModalCompanyAdd = () => {
    setIsModalOpenCompanyAdd(true);
  };
  const handleOkCompanyAdd = () => {
    setIsModalOpenCompanyAdd(false);
  };
  const handleCancelCompanyAdd = () => {
    setIsModalOpenCompanyAdd(false);
  };
  const [isModalOpenProperty, setIsModalOpenProperty] = useState(false);
  const showModalProperty = () => {
    setIsModalOpenProperty(true);
  };
  const handleOkProperty = () => {
    setIsModalOpenProperty(false);
  };
  const handleCancelProperty = () => {
    setIsModalOpenProperty(false);
  };

  const [isModalOpenCompany, setIsModalOpenCompany] = useState(false);
  const showModalCompany = () => {
    setIsModalOpenCompany(true);
  };
  const handleOkCompany = () => {
    setIsModalOpenCompany(false);
  };
  const handleCancelCompany = () => {
    setIsModalOpenCompany(false);
  };
  return (
    <div>
      {entityInfo && (
        <div className={cl.content}>
          <Form
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <h2 className={cl.title}>
              {entityInfo.id}.{entityInfo.full_name_director}
            </h2>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>ФИО представителя:</h2>
              <Input
                className={cl.content__input}
                type="text"
                name="full_name_director"
                value={state.full_name_director}
                onChange={handleInput}
                maxLength="100"
              />
              {patchError && patchError.full_name_director && (
                <Error>{patchError.full_name_director}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Компания клиента:</h2>
              <Input
                className={cl.content__input}
                type="text"
                name="client_company"
                value={state.client_company}
                onChange={handleInput}
                maxLength="50"
              />
              {patchError && patchError.client_company && (
                <Error>{patchError.client_company}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Компания:</h2>
              <div className={cl.content__select__container}>
                <Select
                  className={cl.content__accor}
                  showSearch
                  allowClear
                  value={{
                    label: state.id_company,
                    value: state.id_company,
                  }}
                  onChange={(e) => {
                    setState({ ...state, id_company: e });
                  }}
                  fieldNames={{ label: "company_name", value: "id" }}
                  filterOption={(input, option) =>
                    (option?.company_name.toLocaleLowerCase() ?? "").includes(
                      input.toLocaleLowerCase()
                    )
                  }
                  options={companies && companies}
                />
                <BsPlusLg
                  className={cl.add__svg}
                  onClick={showModalCompanyAdd}
                />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_company && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_company && openCompanyModal(state.id_company);
                  }}
                />
              </div>
              {patchError && patchError.company_name && (
                <Error>{patchError.company_name}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>ИНН:</h2>
              <Input
                className={cl.content__input}
                type="text"
                value={state.inn}
                name="inn"
                onChange={handleInput}
                maxLength="20"
              />
              {patchError && patchError.inn && <Error>{patchError.inn}</Error>}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Тип кредита:</h2>
              <Select
                id="credit_type"
                className={cl.content__accor}
                value={state.credit_type}
                onChange={(e) => setState({ ...state, credit_type: e })}
              >
                <Select.Option value="LS">Лизинг</Select.Option>
                <Select.Option value="CR">Кредит</Select.Option>
              </Select>
              {patchError && patchError.credit_type && (
                <Error>{patchError.credit_type}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Статус клиента:</h2>

              <Select
                className={cl.content__accor}
                onChange={(e) => setState({ ...state, status: e })}
                value={state.status}
              >
                <Select.Option value="success">Выдан</Select.Option>
                <Select.Option value="processing">Обработка</Select.Option>
                <Select.Option value="discussion">
                  На рассмотрении
                </Select.Option>
                <Select.Option value="denied">Отказано</Select.Option>
                <Select.Option value="payback">
                  Погашен за счёт отступных
                </Select.Option>
                <Select.Option value="judicial">Судебный</Select.Option>
              </Select>
              {patchError && patchError.status && (
                <Error>{patchError.status}</Error>
              )}
            </div>
            {(entityInfo.status == "payback" || state.status == "payback") && (
              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Отступные документы:</h2>
                <input
                  type="file"
                  onChange={(e) =>
                    setState({
                      ...state,
                      repaid_by_redemption: e.target.files[0],
                    })
                  }
                />
                {entityInfo.repaid_by_redemption && (
                  <p className={cl.file__name}>
                    Текущий файл :{" "}
                    <a href={entityInfo.repaid_by_redemption}>
                      {entityInfo.repaid_by_redemption}
                    </a>
                  </p>
                )}
                {patchError && patchError.repaid_by_redemption && (
                  <Error>{patchError.repaid_by_redemption}</Error>
                )}
              </div>
            )}
            {(entityInfo.status == "judicial" ||
              state.status == "judicial") && (
              <div className={cl.content__category}>
                <h2 className={cl.content__title}>Судебные документы:</h2>

                <input
                  type="file"
                  onChange={(e) =>
                    setState({
                      ...state,
                      court_documents: e.target.files[0],
                    })
                  }
                />
                {entityInfo.court_documents && (
                  <p className={cl.file__name}>
                    Текущий файл :{" "}
                    <a href={entityInfo.court_documents}>
                      {entityInfo.court_documents}
                    </a>
                  </p>
                )}
                {patchError && patchError.court_documents && (
                  <Error>{patchError.court_documents}</Error>
                )}
              </div>
            )}
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Сумма кредита:</h2>
              <Input
                className={cl.content__input}
                type="text"
                value={state.credit_sum}
                name="credit_sum"
                onChange={handleInput}
                maxLength="30"
              />
              {patchError && patchError.credit_sum && (
                <Error>{patchError.credit_sum}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Кредитная история:</h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    credit_history: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={entityInfo.credit_history}>
                  {entityInfo.credit_history}
                </a>
              </p>
              {patchError && patchError.credit_history && (
                <Error>{patchError.credit_history}</Error>
              )}{" "}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Телефон компании:</h2>
              <Input
                className={cl.content__input}
                type="text"
                value={state.phone}
                onChange={handleInput}
                name="phone"
                maxLength="100"
              />
              {patchError && patchError.phone && (
                <Error>{patchError.phone}</Error>
              )}{" "}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Юридическии адрес:</h2>
              <Input
                className={cl.content__input}
                type="text"
                onChange={handleInput}
                value={state.address}
                name="address"
                maxLength="100"
              />
              {patchError && patchError.address && (
                <Error>{patchError.address}</Error>
              )}{" "}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Адрес фактический</h2>
              <Input
                className={cl.content__input}
                type="text"
                placeholder="Тот же что и по прописке"
                value={state.client_actual_address}
                onChange={handleInput}
                name="client_actual_address"
                maxLength="100"
              />
              {patchError && patchError.client_actual_address && (
                <Error>{patchError.client_actual_address}</Error>
              )}{" "}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>
                Договора с подрядчиками и поставщиками:
              </h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    contracts: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={entityInfo.contracts}>{entityInfo.contracts}</a>
              </p>
              {patchError && patchError.contracts && (
                <Error>{patchError.contracts}</Error>
              )}{" "}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>
                Отчёт подрядчиков и поставщиков об оказанной услуге:
              </h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    report: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={entityInfo.report}>{entityInfo.report}</a>
              </p>
              {patchError && patchError.report && (
                <Error>{patchError.report}</Error>
              )}{" "}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Отчёт по мониторингу:</h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    monitoring_report: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={entityInfo.monitoring_report}>
                  {entityInfo.monitoring_report}
                </a>
              </p>
              {patchError && patchError.monitoring_report && (
                <Error>{patchError.monitoring_report}</Error>
              )}{" "}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Средний доход в месяц:</h2>
              <Input
                className={cl.content__input}
                type="number"
                onChange={handleInput}
                value={state.average_salary}
                name="average_salary"
              />
              {patchError && patchError.average_salary && (
                <Error>{patchError.average_salary}</Error>
              )}{" "}
            </div>

            {(entityInfo.credit_type == "LS" || state.credit_type == "LS") && (
              <div className={cl.content__category}>
                <h2 className={cl.content__title}>
                  Размер собственного взноса:
                </h2>
                <Input
                  className={cl.content__input}
                  type="number"
                  onChange={handleInput}
                  value={state.own_contribution}
                  name="own_contribution"
                />
                {patchError && patchError.own_contribution && (
                  <Error>{patchError.own_contribution}</Error>
                )}
              </div>
            )}
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Активы на момент анализа:</h2>
              <Input
                className={cl.content__input}
                type="text"
                onChange={handleInput}
                value={state.assets}
                name="assets"
              />
              {patchError && patchError.assets && (
                <Error>{patchError.assets}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Текущие кредиты:</h2>

              <Input
                className={cl.content__input}
                type="text"
                onChange={handleInput}
                value={state.current_loan}
                name="current_loan"
                maxLength="200"
              />
              {patchError && patchError.current_loan && (
                <Error>{patchError.current_loan}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Залогове имущество:</h2>
              <div className={cl.content__select__container}>
                <Select
                  className={cl.content__accor}
                  showSearch
                  allowClear
                  value={{
                    label: state.id_property,
                    value: state.id_property,
                  }}
                  onChange={(e) => {
                    setState({ ...state, id_property: e });
                  }}
                  fieldNames={{ label: "type", value: "id" }}
                  filterOption={(input, option) =>
                    (option?.type.toLocaleLowerCase() ?? "").includes(
                      input.toLocaleLowerCase()
                    )
                  }
                  options={properties && properties}
                />
                <BsPlusLg
                  className={cl.add__svg}
                  onClick={showModalPropertyAdd}
                />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_property && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_property && openPropertyModal(state.id_property);
                  }}
                />
              </div>
              {patchError && patchError.id_property && (
                <Error>{patchError.id_property}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Кредитный специалсит</h2>
              <input
                className={cl.content__input}
                type="text"
                disabled
                value={entityInfo.id_credit_spec}
                name="client_actual_address"
                maxLength="100"
              />
            </div>
            {patchLoading && <Loading>Отправка...</Loading>}
            {patchError && (
              <Error style={{ fontSize: "20px" }}>
                Данные не были изменены. Проверьте корректность заполненых
                данных.
              </Error>
            )}
            {patchSuccess && <Success>Данные успешно отправлены.</Success>}
            <Button disabled={patchLoading}>Сохранить</Button>
          </Form>
          <Modal
            open={isModalOpenPropertyAdd}
            onOk={handleOkPropertyAdd}
            onCancel={handleCancelPropertyAdd}
          >
            <PropertyContent
              isModal={true}
              handleCancelPropertyAdd={handleCancelPropertyAdd}
            />
          </Modal>
          <Modal
            open={isModalOpenCompanyAdd}
            onOk={handleOkCompanyAdd}
            onCancel={handleCancelCompanyAdd}
          >
            <CompaniesContent
              isModal={true}
              handleCancelCompanyAdd={handleCancelCompanyAdd}
            />
          </Modal>
          <Modal
            open={isModalOpenProperty}
            onOk={handleOkProperty}
            onCancel={handleCancelProperty}
          >
            <PropertyIdPageContent
              isModal
              handleCancelProperty={handleCancelProperty}
            />
          </Modal>
          <Modal
            open={isModalOpenCompany}
            onOk={handleOkCompany}
            onCancel={handleCancelCompany}
          >
            <CompanyIdPageContent
              isModal
              handleCancelCompany={handleCancelCompany}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default EntityIdPageContent;
