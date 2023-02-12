import React, { useEffect, useState } from "react";
import { Select, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

import cl from "../style.module.scss";
import { Loading, Button, Success, Error } from "../UI";
import {
  fetchClient,
  getClients,
  getGuarantor,
  getGuarantors,
  getProperties,
  getProperty,
} from "../../redux/reducers";
import RecipientAddContent from "../Recipients/RecipientAddContent";
import PropertyAddContent from "../Properties/PropertyAddContent";
import RecipientIdPageContent from "../Recipients/RecipientIdPageContent";
import PropertyIdPageContent from "../Properties/PropertyIdPageContent";

const ClientAddContent = ({ isModal = false, handleCancelClientAddModal }) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    full_name: "",
    credit_type: "",
    status: "",
    repaid_by_redemption: null,
    court_documents: null,
    credit_sum: "",
    marital_status: "",
    credit_history: null,
    phone: "",
    address: "",
    client_actual_address: "",
    income_statement: null,
    contracts: null,
    report: null,
    monitoring_report: null,
    id_guarantor: null,
    id_property: null,
  });

  const { guarantors } = useSelector((state) => state.guarantor);
  const { properties } = useSelector((state) => state.property);
  const { loading, error, success } = useSelector((state) => state.client);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = async (e) => {
    dispatch(fetchClient(state));
  };
  const openRecipientModal = (id) => {
    dispatch(getGuarantor({ id: id })).then(() => showModalRecipientModal());
  };
  const openPropertyModal = (id) => {
    dispatch(getProperty({ id: id })).then(() => showModalProperty());
  };

  useEffect(() => {
    if (!isModal && success) navigate("/counterparties");
    if (isModal && success) {
      dispatch(getClients());
      handleCancelClientAddModal && handleCancelClientAddModal();
    }
  }, [success]);

  useEffect(() => {
    dispatch(getGuarantors());
    dispatch(getProperties());
  }, [dispatch]);
  //-------------------------------------------

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
    <div className={cl.content}>
      <Form
        name="basic"
        autoComplete="off"
        onFinish={submitForm}
        onFinishFailed={() => alert("Заполните все поля")}
      >
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>ФИО клиента:</h2>
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
          {error && error.full_name && <Error>{error.full_name}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Тип кредита:</h2>
          <Form.Item
            name="credit_type"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              id="credit_type"
              className={cl.content__accor}
              onChange={(e) => setState({ ...state, credit_type: e })}
            >
              <Select.Option value="LS">Лизинг</Select.Option>
              <Select.Option value="CR">Кредит</Select.Option>
            </Select>
          </Form.Item>
          {error && error.credit_type && <Error>{error.credit_type}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Статус клиента:</h2>
          <Form.Item
            name="status"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              className={cl.content__accor}
              onChange={(e) => setState({ ...state, status: e })}
            >
              <Select.Option value="success">Выдан</Select.Option>
              <Select.Option value="processing">Обработка</Select.Option>
              <Select.Option value="discussion">На рассмотрении</Select.Option>
              <Select.Option value="denied">Отказано</Select.Option>
              <Select.Option value="payback">
                Погашен за счёт отступных
              </Select.Option>
              <Select.Option value="judicial">Судебный</Select.Option>
            </Select>
          </Form.Item>
          {error && error.status && <Error>{error.status}</Error>}
        </div>

        {state.status == "payback" && (
          <>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Отступные документы:</h2>
              <Form.Item
                name="repaid_by_redemption"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <input
                  type="file"
                  onChange={(e) =>
                    setState({
                      ...state,
                      repaid_by_redemption: e.target.files[0],
                    })
                  }
                />
              </Form.Item>
              {error && error.repaid_by_redemption && (
                <Error>{error.repaid_by_redemption}</Error>
              )}
            </div>
          </>
        )}
        {state.status == "judicial" && (
          <>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Судебные документы:</h2>
              <Form.Item
                name="court_documents"
                rules={[{ required: true, message: "Заполните это поле" }]}
              >
                <input
                  type="file"
                  onChange={(e) =>
                    setState({
                      ...state,
                      court_documents: e.target.files[0],
                    })
                  }
                />
              </Form.Item>
            </div>
          </>
        )}

        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Сумма кредита:</h2>
          <Form.Item
            name="credit_sum"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              placeholder="Введите нужную сумму"
              name="credit_sum"
              onChange={handleInput}
              maxLength="30"
            />
          </Form.Item>
          {error && error.status && <Error>{error.status}</Error>}
        </div>

        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Семейное положение:</h2>
          <Form.Item
            name="marital_status"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Select
              className={cl.content__accor}
              onChange={(e) => setState({ ...state, marital_status: e })}
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
              onChange={(e) =>
                setState({
                  ...state,
                  credit_history: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.status && <Error>{error.status}</Error>}
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
              onChange={handleInput}
              defaultValue="+996"
              name="phone"
              maxLength="100"
            />
          </Form.Item>
          {error && error.phone && <Error>{error.phone}</Error>}
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
              onChange={handleInput}
              name="address"
              maxLength="100"
            />
          </Form.Item>
          {error && error.status && <Error>{error.status}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Адрес фактический</h2>
          <Form.Item
            name="client_actual_address"
            //rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              type="text"
              placeholder="Тот же что и по прописке"
              onChange={handleInput}
              name="client_actual_address"
              maxLength="100"
            />
          </Form.Item>
          {error && error.status && <Error>{error.status}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Справка о доходах:</h2>
          <Form.Item
            name="income_statement"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  income_statement: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.income_statement && (
            <Error>{error.income_statement}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>
            Договора с подрядчиками и поставщиками:
          </h2>
          <Form.Item name="contracts">
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  contracts: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.contracts && <Error>{error.contracts}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>
            Отчёт подрядчиков и поставщиков об оказанной услуге:
          </h2>
          <Form.Item name="report">
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  report: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.report && <Error>{error.report}</Error>}
        </div>

        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Отчёт по мониторингу:</h2>
          <Form.Item
            name="monitoring_report"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  monitoring_report: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.monitoring_report && (
            <Error>{error.monitoring_report}</Error>
          )}
        </div>

        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Поручитель:</h2>
          <div className={cl.content__select__container}>
            <Form.Item
              name="guarantor"
              //rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                className={cl.content__accor}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, id_guarantor: e });
                }}
                fieldNames={{ label: "full_name", value: "id" }}
                filterOption={(input, option) =>
                  (option?.full_name.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={guarantors && guarantors}
              />
            </Form.Item>
            <BsPlusLg className={cl.add__svg} onClick={showModalRecipientAdd} />
            <RiPencilFill
              className={`${cl.add__svg} ${!state.id_guarantor && cl.disabled}`}
              onClick={() => {
                state.id_guarantor && openRecipientModal(state.id_guarantor);
              }}
            />
          </div>
          {error && error.id_guarantor && <Error>{error.id_guarantor}</Error>}
        </div>

        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Залоговое имущество:</h2>
          <div className={cl.content__select__container}>
            <Form.Item
              name="id_property"
              //rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                className={cl.content__accor}
                showSearch
                allowClear
                fieldNames={{ label: "type", value: "id" }}
                //value={state.id_property}
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
            </Form.Item>
            <BsPlusLg className={cl.add__svg} onClick={showModalPropertyAdd} />
            <RiPencilFill
              className={`${cl.add__svg} ${!state.id_property && cl.disabled}`}
              onClick={() => {
                state.id_property && openPropertyModal(state.id_property);
              }}
            />
          </div>
          {error && error.id_property && <Error>{error.id_property}</Error>}
        </div>

        {loading && <Loading>Отправка...</Loading>}
        {error && (
          <Error style={{ fontSize: "20px" }}>
            Данные не были отправлены. Проверьте корректность заполненых данных.
          </Error>
        )}
        {isModal && success && <Success>Данные успешно отправлены.</Success>}
        <Button disabled={loading}>Отправить</Button>
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
  );
};

export default ClientAddContent;
