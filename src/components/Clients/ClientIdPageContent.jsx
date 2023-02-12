import React, { useEffect, useState } from "react";
import { Select, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

import cl from "../style.module.scss";
import RecipientIdPageContent from "../Recipients/RecipientIdPageContent";
import PropertyIdPageContent from "../Properties/PropertyIdPageContent";
import { Loading, Button, Success, Error } from "../UI";
import {
  getClients,
  getConversations,
  getGuarantor,
  getGuarantors,
  getProperties,
  getProperty,
  patchClient,
} from "../../redux/reducers";
import RecipientAddContent from "../Recipients/RecipientAddContent";
import PropertyAddContent from "../Properties/PropertyAddContent";
const ClientIdPageContent = ({ isModal = false, handleCancelClientModal }) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { guarantors } = useSelector((state) => state.guarantor);
  const { properties } = useSelector((state) => state.property);
  const { patchLoading, patchError, patchSuccess, clientInfo } = useSelector(
    (state) => state.client
  );
  const [state, setState] = useState(
    clientInfo && {
      address: clientInfo.address,
      client_actual_address: clientInfo.client_actual_address,
      credit_sum: clientInfo.credit_sum,
      credit_type: clientInfo.credit_type,
      full_name: clientInfo.full_name,
      id_guarantor: clientInfo.id_guarantor,
      id_property: clientInfo.id_property,
      marital_status: clientInfo.marital_status,
      phone: clientInfo.phone,
      status: clientInfo.status,
    }
  );

  const submitForm = async (e) => {
    dispatch(patchClient({ id: clientInfo.id, obj: state }));
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const openRecipientModal = (id) => {
    dispatch(getGuarantor({ id: id })).then(() => showModalRecipientModal());
  };
  const openPropertyModal = (id) => {
    dispatch(getProperty({ id: id })).then(() => showModalProperty());
  };
  useEffect(() => {
    dispatch(getGuarantors());
    dispatch(getProperties());
    dispatch(getConversations());
  }, [dispatch]);
  useEffect(() => {
    if (!clientInfo) navigate("/counterparties");
  }, []);
  useEffect(() => {
    clientInfo &&
      setState({
        address: clientInfo.address,
        client_actual_address: clientInfo.client_actual_address,
        credit_sum: clientInfo.credit_sum,
        credit_type: clientInfo.credit_type,
        full_name: clientInfo.full_name,
        id_guarantor: clientInfo.id_guarantor,
        id_property: clientInfo.id_property,
        marital_status: clientInfo.marital_status,
        phone: clientInfo.phone,
        status: clientInfo.status,
      });
  }, [clientInfo]);
  useEffect(() => {
    if (!isModal && patchSuccess) navigate("/counterparties");
    if (isModal && patchSuccess) {
      dispatch(getClients());
      handleCancelClientModal && handleCancelClientModal();
    }
  }, [patchSuccess]);

  //---Modals----------------------------------
  const [isModalOpenRecipientAdd, setIsModalOpenRecipientAdd] = useState(false);
  const showModalRecipientAdd = () => {
    setIsModalOpenRecipientAdd(true);
  };
  const handleOkRecipientAdd = () => {
    setIsModalOpenRecipientAdd(false);
  };
  const handleCancelRecipientAdd = () => {
    setIsModalOpenRecipientAdd(false);
  };

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

  const [isModalOpenRecipientModal, setIsModalOpenRecipientModal] =
    useState(false);
  const showModalRecipientModal = () => {
    setIsModalOpenRecipientModal(true);
  };
  const handleOkRecipientModal = () => {
    setIsModalOpenRecipientModal(false);
  };
  const handleCancelRecipientModal = () => {
    setIsModalOpenRecipientModal(false);
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
  //-------------------------------------------
  return (
    <div>
      {clientInfo && (
        <div className={cl.content}>
          <Form
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <h2 className={cl.title}>
              {clientInfo.id}.{clientInfo.full_name}
            </h2>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>ФИО клиента:</h2>
              <Input
                className={cl.content__input}
                type="text"
                name="full_name"
                onChange={handleInput}
                value={state.full_name}
                maxLength="100"
              />
              {patchError && patchError.full_name && (
                <Error>{patchError.full_name}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Тип кредита:</h2>
              <Select
                id="credit_type"
                className={cl.content__accor}
                onChange={(e) => setState({ ...state, credit_type: e })}
                value={state.credit_type}
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
            {(clientInfo.status == "payback" || state.status == "payback") && (
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
                {clientInfo.repaid_by_redemption && (
                  <p className={cl.file__name}>
                    Текущий файл :{" "}
                    <a href={clientInfo.repaid_by_redemption}>
                      {clientInfo.repaid_by_redemption}
                    </a>
                  </p>
                )}
                {patchError && patchError.repaid_by_redemption && (
                  <Error>{patchError.repaid_by_redemption}</Error>
                )}
              </div>
            )}
            {(clientInfo.status == "judicial" ||
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
                {clientInfo.court_documents && (
                  <p className={cl.file__name}>
                    Текущий файл :{" "}
                    <a href={clientInfo.court_documents}>
                      {clientInfo.court_documents}
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
                name="credit_sum"
                placeholder="Введите нужную сумму"
                onChange={handleInput}
                maxLength="30"
                value={state.credit_sum}
              />
              {patchError && patchError.credit_sum && (
                <Error>{patchError.credit_sum}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Семейное положение:</h2>

              <Select
                className={cl.content__accor}
                onChange={(e) => setState({ ...state, marital_status: e })}
                value={state.marital_status}
              >
                <Select.Option value="married">Женат/Замужем</Select.Option>
                <Select.Option value="divorced">Разведен</Select.Option>
                <Select.Option value="widow/widower">
                  Вдова/Вдовец
                </Select.Option>
                <Select.Option value="single">Холост/Незамужем</Select.Option>
              </Select>
              {patchError && patchError.marital_status && (
                <Error>{patchError.marital_status}</Error>
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
                <a href={clientInfo.credit_history}>
                  {clientInfo.credit_history}
                </a>
              </p>
              {patchError && patchError.credit_history && (
                <Error>{patchError.credit_history}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Номер телефона:</h2>
              <Input
                className={cl.content__input}
                type="text"
                onChange={handleInput}
                name="phone"
                value={state.phone}
                maxLength="100"
              />
              {patchError && patchError.phone && (
                <Error>{patchError.phone}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Адрес прописки:</h2>
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
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Адрес фактический</h2>

              <Input
                className={cl.content__input}
                type="text"
                placeholder="Тот же что и по прописке"
                onChange={handleInput}
                value={state.client_actual_address}
                name="client_actual_address"
                maxLength="100"
              />
              {patchError && patchError.client_actual_address && (
                <Error>{patchError.client_actual_address}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Справка о доходах:</h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    income_statement: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={clientInfo.income_statement}>
                  {clientInfo.income_statement}
                </a>
              </p>
              {patchError && patchError.income_statement && (
                <Error>{patchError.income_statement}</Error>
              )}
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
                <a href={clientInfo.contracts}>{clientInfo.contracts}</a>
              </p>
              {patchError && patchError.contracts && (
                <Error>{patchError.contracts}</Error>
              )}
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
                <a href={clientInfo.report}>{clientInfo.report}</a>
              </p>
              {patchError && patchError.report && (
                <Error>{patchError.report}</Error>
              )}
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
                <a href={clientInfo.monitoring_report}>
                  {clientInfo.monitoring_report}
                </a>
              </p>
              {patchError && patchError.monitoring_report && (
                <Error>{patchError.monitoring_report}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Поручитель:</h2>
              <div className={cl.content__select__container}>
                <Select
                  className={cl.content__accor}
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, id_guarantor: e });
                  }}
                  value={{
                    label: state.id_guarantor.full_name
                      ? state.id_guarantor.full_name
                      : null,
                    value: state.id_guarantor.id ? state.id_guarantor.id : null,
                  }}
                  fieldNames={{ label: "full_name", value: "id" }}
                  filterOption={(input, option) =>
                    (option?.full_name.toLocaleLowerCase() ?? "").includes(
                      input.toLocaleLowerCase()
                    )
                  }
                  options={guarantors && guarantors}
                />
                <BsPlusLg
                  className={cl.add__svg}
                  onClick={showModalRecipientAdd}
                />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_guarantor && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_guarantor &&
                      state.id_guarantor.id &&
                      openRecipientModal(state.id_guarantor.id);
                  }}
                />
              </div>
              {patchError && patchError.guarantor && (
                <Error>{patchError.guarantor}</Error>
              )}
            </div>

            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Залоговое имущество:</h2>
              <div className={cl.content__select__container}>
                <Select
                  className={cl.content__accor}
                  showSearch
                  allowClear
                  value={{
                    label: state.id_property,
                    value: state.id_property,
                  }}
                  fieldNames={{ label: "type", value: "id" }}
                  onChange={(e) => {
                    setState({ ...state, id_property: e });
                  }}
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
                defaultValue={clientInfo.id_credit_spec}
                name="client_actual_address"
                maxLength="100"
              />
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
          <Modal
            open={isModalOpenRecipientAdd}
            onOk={handleOkRecipientAdd}
            onCancel={handleCancelRecipientAdd}
          >
            <RecipientAddContent
              isModal={true}
              handleCancelRecipientAdd={handleCancelRecipientAdd}
            />
          </Modal>
          <Modal
            open={isModalOpenPropertyAdd}
            onOk={handleOkPropertyAdd}
            onCancel={handleCancelPropertyAdd}
          >
            <PropertyAddContent
              isModal={true}
              handleCancelPropertyAdd={handleCancelPropertyAdd}
            />
          </Modal>
          <Modal
            open={isModalOpenRecipientModal}
            onOk={handleOkRecipientModal}
            onCancel={handleCancelRecipientModal}
          >
            <RecipientIdPageContent
              isModal
              handleCancelRecipientModal={handleCancelRecipientModal}
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
        </div>
      )}
    </div>
  );
};

export default ClientIdPageContent;
