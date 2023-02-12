import { Form, Select, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

import cl from "../style.module.scss";
import { Loading, Button, Success, Error } from "../UI";
import {
  getClient,
  getClients,
  fetchDocument,
  getEntities,
  getEntity,
} from "../../redux/reducers";
import Individuals from "../Clients/ClientAddContent";
import Entities from "../Entities/EntityAddContent";
import ClientIdPageContent from "../../components/Clients/ClientIdPageContent";
import EntityIdPageContent from "../../components/Entities/EntityIdPageContent";

const DocumentAddContent = () => {
  //----API-----
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState({
    committee_decision: null,
    all_contracts: null,
    scoring: null,
    id_client: null,
    id_entity: null,
    id_spec: null,
  });
  const { loading, error, success } = useSelector((state) => state.document);
  const { clients } = useSelector((state) => state.client);
  const { entities } = useSelector((state) => state.entity);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = () => {
    dispatch(fetchDocument(state));
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
    if (success) navigate("/documents");
  }, [success]);
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
      <Form
        name="basic"
        autoComplete="off"
        onFinish={submitForm}
        onFinishFailed={() => alert("Заполните все поля")}
      >
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>
            Заключение кредитного эксперта (скан):
          </h2>
          <Form.Item
            name="credit_spec_report"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  credit_spec_report: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.credit_spec_report && (
            <Error>{error.credit_spec_report}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Решение КК (скан):</h2>
          <Form.Item
            name="committee_decision"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  committee_decision: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.committee_decision && (
            <Error>{error.committee_decision}</Error>
          )}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>
            Все заключенные договора, перечень и сканы:
          </h2>
          <Form.Item
            name="all_contracts"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <input
              type="file"
              onChange={(e) =>
                setState({
                  ...state,
                  all_contracts: e.target.files[0],
                })
              }
            />
          </Form.Item>
          {error && error.all_contracts && <Error>{error.all_contracts}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Скоринг:</h2>
          <Form.Item
            name="scoring"
            rules={[{ required: true, message: "Заполните это поле" }]}
          >
            <Input
              className={cl.content__input}
              onChange={handleInput}
              name="scoring"
            />
          </Form.Item>
          {error && error.scoring && <Error>{error.scoring}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Физическое лицо:</h2>
          <div className={cl.content__select__container}>
            <Form.Item
              name="id_client"
              //rules={[{ required: true, message: "Заполните это поле" }]}
            >
              <Select
                showSearch
                allowClear
                disabled={state.id_entity}
                onChange={(e) => {
                  setState({ ...state, id_client: e });
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
              className={`${cl.add__svg} ${!state.id_client && cl.disabled}`}
              onClick={() => {
                state.id_client && openClientModal(state.id_client);
              }}
            />
          </div>
          {error && error.id_client && <Error>{error.id_client}</Error>}
        </div>
        <div className={cl.content__category}>
          <h2 className={cl.content__title}>Юридическое лицо:</h2>
          <div className={cl.content__select__container}>
            <Form.Item name="id_entity">
              <Select
                disabled={state.id_client}
                showSearch
                allowClear
                onChange={(e) => {
                  setState({ ...state, id_entity: e });
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
              className={`${cl.add__svg} ${!state.id_entity && cl.disabled}`}
              onClick={() => {
                state.id_entity && openEntityModal(state.id_entity);
              }}
            />
          </div>
          {error && error.id_entity && <Error>{error.id_entity}</Error>}
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

export default DocumentAddContent;
