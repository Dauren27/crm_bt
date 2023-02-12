import { Form, Select, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BsPlusLg } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";

import cl from "../style.module.scss";
import { Loading, Button, Success, Error } from "../UI";
import Individuals from "../Clients/ClientAddContent";
import Entities from "../Entities/EntityAddContent";
import {
  getClient,
  getClients,
  getDocuments,
  patchDocument,
  getEntities,
  getEntity,
} from "../../redux/reducers";
import ClientIdPageContent from "../../components/Clients/ClientIdPageContent";
import EntityIdPageContent from "../../components/Entities/EntityIdPageContent";

const DocumentIdPageContent = () => {
  //----API-----
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { patchLoading, patchError, patchSuccess, documentInfo } = useSelector(
    (state) => state.document
  );
  const { clients } = useSelector((state) => state.client);
  const { entities } = useSelector((state) => state.entity);
  const [state, setState] = useState({
    scoring: documentInfo && documentInfo.scoring,
    id_client: documentInfo && documentInfo.id_client,
    id_entity: documentInfo && documentInfo.id_entity,
  });

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const submitForm = () => {
    dispatch(patchDocument({ id: documentInfo.id, obj: state })).then(() =>
      dispatch(getDocuments())
    );
  };

  const openClientModal = (id) => {
    dispatch(getClient({ id: id })).then(() => showModalClientModal());
  };
  const openEntityModal = (id) => {
    dispatch(getEntity({ id: id })).then(() => showModalEntityModal());
  };

  useEffect(() => {
    if (!documentInfo) navigate("/documents");
  }, []);
  useEffect(() => {
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);
  useEffect(() => {
    if (patchSuccess) navigate("/documents");
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
      {documentInfo && (
        <>
          <h2 className={cl.title}>{documentInfo.id}</h2>
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
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    credit_spec_report: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={documentInfo.credit_spec_report}>
                  {documentInfo.credit_spec_report}
                </a>
              </p>
              {patchError && patchError.credit_spec_report && (
                <Error>{patchError.credit_spec_report}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Решение КК (скан):</h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    committee_decision: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={documentInfo.committee_decision}>
                  {documentInfo.committee_decision}
                </a>
              </p>
              {patchError && patchError.committee_decision && (
                <Error>{patchError.committee_decision}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>
                Все заключенные договора, перечень и сканы:
              </h2>
              <input
                type="file"
                onChange={(e) =>
                  setState({
                    ...state,
                    all_contracts: e.target.files[0],
                  })
                }
              />
              <p className={cl.file__name}>
                Текущий файл :{" "}
                <a href={documentInfo.all_contracts}>
                  {documentInfo.all_contracts}
                </a>
              </p>
              {patchError && patchError.all_contracts && (
                <Error>{patchError.all_contracts}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Скоринг:</h2>
              <Input
                className={cl.content__input}
                defaultValue={documentInfo.scoring}
                onChange={handleInput}
                name="scoring"
              />
              {patchError && patchError.scoring && (
                <Error>{patchError.scoring}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Физическое лицо:</h2>
              <div className={cl.content__select__container}>
                <Select
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, id_client: e });
                  }}
                  defaultValue={{
                    label: documentInfo.id_client,
                    value: documentInfo.id_client,
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
                <BsPlusLg
                  className={cl.add__svg}
                  onClick={showModalClientAddModal}
                />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_client && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_client && openClientModal(state.id_client);
                  }}
                />
              </div>
              {patchError && patchError.id_client && (
                <Error>{patchError.id_client}</Error>
              )}
            </div>
            <div className={cl.content__category}>
              <h2 className={cl.content__title}>Юридическое лицо:</h2>
              <div className={cl.content__select__container}>
                <Select
                  showSearch
                  allowClear
                  onChange={(e) => {
                    setState({ ...state, id_entity: e });
                  }}
                  defaultValue={{
                    label: documentInfo.id_entity,
                    value: documentInfo.id_entity,
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
                <BsPlusLg
                  className={cl.add__svg}
                  onClick={showModalEntityAddModal}
                />
                <RiPencilFill
                  className={`${cl.add__svg} ${
                    !state.id_entity && cl.disabled
                  }`}
                  onClick={() => {
                    state.id_entity && openEntityModal(state.id_entity);
                  }}
                />
              </div>
              {patchError && patchError.id_entity && (
                <Error>{patchError.id_entity}</Error>
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

export default DocumentIdPageContent;
