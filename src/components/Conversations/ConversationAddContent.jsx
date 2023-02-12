import { Form, Input, Select, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

import cl from "../style.module.scss";
import { Loading, Button, Success, Error } from "../UI";
import {
  fetchConversation,
  getConversations,
  getClient,
  getClients,
  getEntities,
  getEntity,
} from "../../redux/reducers";
import Individuals from "../Clients/ClientAddContent";
import Entities from "../Entities/EntityAddContent";
import ClientIdPageContent from "../Clients/ClientIdPageContent";
import EntityIdPageContent from "../Entities/EntityIdPageContent";

const ConversationAddContent = ({ isModal = false }) => {
  //-----------API---------------------
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState(false);
  const [state, setState] = useState({
    is_meeting: value,
    client: "",
    desc: "",
    phone: "",
    results_report: null,
    statistics: null,
    client_id: null,
    entity_id: null,
  });
  const { loading, success, error, successModal } = useSelector(
    (state) => state.conversation
  );
  const { clients } = useSelector((state) => state.client);
  const { entities } = useSelector((state) => state.entity);

  const submitForm = () => {
    if (isModal) {
      dispatch(fetchConversation(state)).then(() =>
        dispatch(getConversations())
      );
    } else {
      dispatch(fetchConversation(state));
    }
  };
  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const openClientModal = (id) => {
    dispatch(getClient({ id: id })).then(() => showModalClientModal());
  };
  const openEntityModal = (id) => {
    dispatch(getEntity({ id: id })).then(() => showModalEntityModal());
  };

  useEffect(() => {
    if (!isModal) if (success) navigate("/conversations");
  }, [success]);
  useEffect(() => {
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);

  //---Modals----------------------------------
  const [isModalOpenClientAddModal, setIsModalOpenClientAddModal] =
    useState(false);
  const showModalClientAddModal = () => {
    setIsModalOpenClientAddModal(true);
  };
  const handleOkClientAddModal = () => {
    setIsModalOpenClientAddModal(false);
  };
  const handleCancelClientAddModal = () => {
    setIsModalOpenClientAddModal(false);
  };

  const [isModalOpenEntityAddModal, setIsModalOpenEntityAddModal] =
    useState(false);
  const showModalEntityAddModal = () => {
    setIsModalOpenEntityAddModal(true);
  };
  const handleOkEntityAddModal = () => {
    setIsModalOpenEntityAddModal(false);
  };
  const handleCancelEntityAddModal = () => {
    setIsModalOpenEntityAddModal(false);
  };

  const [isModalOpenClientModal, setIsModalOpenClientModal] = useState(false);
  const showModalClientModal = () => {
    setIsModalOpenClientModal(true);
  };
  const handleOkClientModal = () => {
    setIsModalOpenClientModal(false);
  };
  const handleCancelClientModal = () => {
    setIsModalOpenClientModal(false);
  };

  const [isModalOpenEntityModal, setIsModalOpenEntityModal] = useState(false);
  const showModalEntityModal = () => {
    setIsModalOpenEntityModal(true);
  };
  const handleOkEntityModal = () => {
    setIsModalOpenEntityModal(false);
  };
  const handleCancelEntityModal = () => {
    setIsModalOpenEntityModal(false);
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
        <div className={cl.content__checkbox}>
          <h2 className={cl.content__title}>Личная встреча: </h2>
          <input
            type="checkbox"
            className={cl.content__checkox}
            onChange={async (e) => {
              setState({
                ...state,
                is_meeting: e.target.checked,
              });
            }}
          />
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Клиент: </h2>
          <Form.Item
            name="client"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              name="client"
              onChange={handleInput}
              maxLength="100"
            />
          </Form.Item>
          {error && error.client && <Error>{error.client}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Номер телефона: </h2>
          <Form.Item
            name="phone"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              name="phone"
              onChange={handleInput}
              defaultValue="+996"
              maxLength="30"
            />
          </Form.Item>
          {error && error.phone && <Error>{error.phone}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Содержание: </h2>
          <Form.Item
            name="desc"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <textarea
              className={cl.content__textarea}
              name="desc"
              onChange={handleInput}
              maxLength="200"
            ></textarea>
          </Form.Item>
          {error && error.desc && <Error>{error.desc}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Отчёт по результатам: </h2>
          <Form.Item
            name="results_report"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              className={cl.content__file}
              type="file"
              name="results_report"
              onChange={async (e) => {
                setState({
                  ...state,
                  results_report: e.target.files[0],
                });
              }}
            />
          </Form.Item>
          {error && error.results_report && (
            <Error>{error.results_report}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Физическое лицо:</h2>
          <div className={cl.content__select__container}>
            <Form.Item name="client_id">
              <Select
                disabled={state.entity_id}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, client_id: e });
                }}
                className={cl.content__accor}
                fieldNames={{ label: "full_name", value: "id" }}
                filterOption={(input, option) =>
                  (option?.full_name.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={clients && clients}
              />
            </Form.Item>
            <BsPlusLg
              className={cl.add__svg}
              onClick={showModalClientAddModal}
            />
            <RiPencilFill
              className={`${cl.add__svg} ${!state.client_id && cl.disabled}`}
              onClick={() => {
                state.client_id && openClientModal(state.client_id);
              }}
            />
          </div>
          {error && error.client_id && <Error>{error.client_id}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Юридическое лицо:</h2>
          <div className={cl.content__select__container}>
            <Form.Item name="entity_id">
              <Select
                disabled={state.client_id}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, entity_id: e });
                }}
                className={cl.content__accor}
                fieldNames={{ label: "full_name_director", value: "id" }}
                filterOption={(input, option) =>
                  (
                    option?.full_name_director.toLocaleLowerCase() ?? ""
                  ).includes(input.toLocaleLowerCase())
                }
                options={entities && entities}
              />
            </Form.Item>
            <BsPlusLg
              className={cl.add__svg}
              onClick={showModalEntityAddModal}
            />
            <RiPencilFill
              className={`${cl.add__svg} ${!state.entity_id && cl.disabled}`}
              onClick={() => {
                state.entity_id && openEntityModal(state.entity_id);
              }}
            />
          </div>
          {error && error.entity_id && <Error>{error.entity_id}</Error>}
        </div>
        {loading && <Loading>Отправка...</Loading>}
        {error && (
          <Error style={{ fontSize: "20px" }}>
            Данные не были отправлены. Проверьте корректность заполненых данных.
          </Error>
        )}
        {isModal && successModal && (
          <Success>Данные успешно отправлены.</Success>
        )}
        <Button disabled={loading}>Отправить</Button>
      </Form>
      <Modal
        open={isModalOpenClientAddModal}
        onOk={handleOkClientAddModal}
        onCancel={handleCancelClientAddModal}
      >
        <Individuals isModal={true} handleCancel={handleCancelClientAddModal} />
      </Modal>
      <Modal
        open={isModalOpenEntityAddModal}
        onOk={handleOkEntityAddModal}
        onCancel={handleCancelEntityAddModal}
      >
        <Entities
          isModal={true}
          handleCancelEntityAddModal={handleCancelEntityAddModal}
        />
      </Modal>
      <Modal
        open={isModalOpenClientModal}
        onOk={handleOkClientModal}
        onCancel={handleCancelClientModal}
      >
        <ClientIdPageContent
          isModal
          handleCancelClientModal={handleCancelClientModal}
        />
      </Modal>
      <Modal
        open={isModalOpenEntityModal}
        onOk={handleOkEntityModal}
        onCancel={handleCancelEntityModal}
      >
        <EntityIdPageContent
          isModal
          handleCancelEntityModal={handleCancelEntityModal}
        />
      </Modal>
    </div>
  );
};

export default ConversationAddContent;
