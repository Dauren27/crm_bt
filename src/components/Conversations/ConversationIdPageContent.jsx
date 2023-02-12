import { Form, Input, Select, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

import cl from "../style.module.scss";
import { Loading, Button, Success, Error } from "../UI";
import {
  getConversations,
  patchConversation,
  getEntities,
  getEntity,
  getClient,
  getClients,
} from "../../redux/reducers";
import Individuals from "../Clients/ClientAddContent";
import Entities from "../Entities/EntityAddContent";
import ClientIdPageContent from "../../components/Clients/ClientIdPageContent";
import EntityIdPageContent from "../../components/Entities/EntityIdPageContent";

const ConversationIdPageContent = () => {
  //----API-----
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { patchLoading, patchSuccess, patchError, conversationInfo } =
    useSelector((state) => state.conversation);
  const { clients } = useSelector((state) => state.client);
  const { entities } = useSelector((state) => state.entity);
  const [state, setState] = useState({
    entity_id: conversationInfo && conversationInfo.entity_id,
    client_id: conversationInfo && conversationInfo.client_id,
  });

  const submitForm = () => {
    dispatch(patchConversation({ id: conversationInfo.id, obj: state })).then(
      () => dispatch(getConversations())
    );
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
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);

  useEffect(() => {
    if (!conversationInfo) navigate("/conversations");
  }, []);

  useEffect(() => {
    if (patchSuccess) navigate("/conversations");
  }, [patchSuccess]);

  //-------------------------------------------

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
      {conversationInfo && (
        <>
          <Form
            name="basic"
            autoComplete="off"
            onFinish={submitForm}
            onFinishFailed={() => alert("Заполните все поля")}
          >
            <h2 className={cl.title}>
              {conversationInfo.id}.{conversationInfo.client}
            </h2>
            <div className={cl.content__checkbox}>
              <h2 className={cl.content__title}>Личная встреча: </h2>
              <input
                type="checkbox"
                className={cl.content__checkox}
                defaultChecked={conversationInfo.is_meeting}
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
              <Input
                className={cl.content__input}
                name="client"
                defaultValue={conversationInfo.client}
                onChange={handleInput}
                maxLength="100"
              />
              {patchError && patchError.client && (
                <Error>{patchError.client}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Дата: </h2>
              <Input
                className={cl.content__input}
                name="date"
                disabled
                defaultValue={conversationInfo.created_date}
                onChange={handleInput}
                maxLength="30"
              />
              {patchError && patchError.created_date && (
                <Error>{patchError.created_date}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Номер телефона: </h2>
              <Input
                className={cl.content__input}
                name="phone"
                defaultValue={conversationInfo.phone}
                onChange={handleInput}
                maxLength="30"
              />
              {patchError && patchError.phone && (
                <Error>{patchError.phone}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Содержание: </h2>
              <textarea
                className={cl.content__textarea}
                name="desc"
                defaultValue={conversationInfo.desc}
                onChange={handleInput}
                maxLength="200"
              ></textarea>
              {patchError && patchError.desc && (
                <Error>{patchError.desc}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Отчёт по результатам: </h2>
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
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={conversationInfo.results_report}>
                  {conversationInfo.results_report}
                </a>
              </p>
              {patchError && patchError.results_report && (
                <Error>{patchError.results_report}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Физическое лицо:</h2>
              <div className={cl.content__select__container}>
                <Form.Item name="client_id">
                  <Select
                    showSearch
                    allowClear
                    onChange={(e) => {
                      setState({ ...state, client_id: e });
                    }}
                    defaultValue={{
                      label: conversationInfo.client_id,
                      value: conversationInfo.client_id,
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
                  className={`${cl.add__svg} ${
                    !state.client_id && cl.disabled
                  }`}
                  onClick={() => {
                    state.client_id && openClientModal(state.client_id);
                  }}
                />
              </div>
              {patchError && patchError.client_id && (
                <Error>{patchError.client_id}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Юридическое лицо:</h2>
              <div className={cl.content__select__container}>
                <Form.Item name="entity_id">
                  <Select
                    showSearch
                    allowClear
                    onChange={(e) => {
                      setState({ ...state, entity_id: e });
                    }}
                    defaultValue={{
                      label: conversationInfo.entity_id,
                      value: conversationInfo.entity_id,
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
                  className={`${cl.add__svg} ${
                    !state.entity_id && cl.disabled
                  }`}
                  onClick={() => {
                    state.entity_id && openEntityModal(state.entity_id);
                  }}
                />
              </div>
              {patchError && patchError.entity_id && (
                <Error>{patchError.entity_id}</Error>
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
          <Modal
            open={isModalOpenClientAddModal}
            onOk={handleOkClientAddModal}
            onCancel={handleCancelClientAddModal}
          >
            <Individuals
              isModal={true}
              handleCancel={handleCancelClientAddModal}
            />
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
        </>
      )}
    </div>
  );
};

export default ConversationIdPageContent;
