import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BiSearch } from "react-icons/bi";
import { Select } from "antd";
import { TfiBarChart } from "react-icons/tfi";

import Layout from "../../Layout/Layout";
import cl from "../Documents/documentsList.module.scss";
import {
  deleteConversation,
  getConversation,
  getConversations,
  getEntities,
  getClients,
} from "../../redux/reducers";
import { Loading, Success, Table, Error } from "../../components/UI";
import Chart from "../../components/UI/Chart/Chart";

const ConversationsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { clients } = useSelector((state) => state.client);
  const { entities } = useSelector((state) => state.entity);
  const [filtredConversation, setFiltredConversation] = useState(null);
  const {
    conversations,
    deleteLoading,
    deleteSuccess,
    deleteError,
    successMessage,
    patchMessage,
    conversation,
    patchConversation,
  } = useSelector((state) => state.conversation);

  const [selectedOption, setSelectedOption] = useState(null);
  const [conversationsList, setConversationsList] = useState(
    conversations && conversations
  );
  const [searchValue, setSearchValue] = useState("");
  const [chartToggle, setChartToggle] = useState(false);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempConversations = conversationsList.map((conversation) => {
        return { ...conversation, isChecked: checked };
      });
      setConversationsList(tempConversations);
    } else {
      let tempConversations = conversationsList.map((conversation) =>
        conversation.id == name
          ? { ...conversation, isChecked: checked }
          : conversation
      );
      setConversationsList(tempConversations);
    }
  };
  const deleteDoc = () => {
    conversationsList.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteConversation({ id: doc.id })).then(() =>
          dispatch(getConversations())
        );
      }
    });
  };
  const navigateToConversation = (id) => {
    dispatch(getConversation({ id: id })).then(() =>
      navigate(`/conversations/${id}`)
    );
  };

  useEffect(() => {
    setConversationsList(conversations);
  }, [conversations]);

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getClients());
    dispatch(getEntities());
  }, [dispatch]);

  return (
    <Layout>
      <div className={cl.container}>
        <div className={cl.container__header}>
          <h2>Список Переговоров</h2>
          <button onClick={() => navigate("/conversations/add")}>
            Добавить
          </button>
        </div>
        <div className={cl.content}>
          <div className={cl.content__search}>
            <input
              type="text"
              disabled={
                filtredConversation &&
                filtredConversation.id &&
                filtredConversation.id
              }
              onChange={(e) => {
                setSearchValue(e.target.value.toLocaleLowerCase());
              }}
              placeholder="Поиск"
            />
            <BiSearch />
          </div>
          <div className={cl.content__filter}>
            <Select
              className={cl.content__select}
              onChange={(e) => setSelectedOption(e)}
            >
              <Select.Option value="client">Физические лица</Select.Option>
              <Select.Option value="entity">Юридические лица</Select.Option>
            </Select>
            {selectedOption === "client" ? (
              <Select
                showSearch
                allowClear
                onChange={(e) => {
                  setFiltredConversation({ id: e, label: "client" });
                }}
                className={`${cl.content__select} ${cl.right__select}`}
                fieldNames={{
                  label: "full_name",
                  value: "id",
                }}
                filterOption={(input, option) =>
                  (option?.full_name.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={clients && clients}
              />
            ) : selectedOption === "entity" ? (
              <Select
                showSearch
                allowClear
                onChange={(e) => {
                  setFiltredConversation({ id: e, label: "entity" });
                }}
                className={`${cl.content__select} ${cl.right__select}`}
                fieldNames={{
                  label: "full_name_director",
                  value: "id",
                }}
                filterOption={(input, option) =>
                  (option?.full_name.toLocaleLowerCase() ?? "").includes(
                    input.toLocaleLowerCase()
                  )
                }
                options={entities && entities}
              />
            ) : null}
          </div>
          <div className={cl.content__deleteDiv}>
            <button className={cl.content__delete} onClick={deleteDoc}>
              Удалить
            </button>
            <div
              className={cl.chart__toggle}
              onClick={() => setChartToggle(!chartToggle)}
            >
              {chartToggle ? <a>Скрыть График</a> : <a>Показать график</a>}
              <TfiBarChart />
            </div>
          </div>
          {chartToggle && <Chart title="Переговоры" />}
          {deleteSuccess && <Success>Документ был успешно удален</Success>}
          {deleteLoading && <Loading>Удаление...</Loading>}
          {deleteError && <Error>Произошла ошибка при удалении...</Error>}
          {successMessage && (
            <Success>
              Документ {conversation && conversation.id} был успешно добавлен
            </Success>
          )}
          {patchMessage && (
            <Success>
              Документ {patchConversation && patchConversation.id} был успешно
              изменён
            </Success>
          )}
          <div className={cl.content__list}>
            {conversationsList ? (
              <Table>
                <tr className="header__tr">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !conversationsList.some(
                          (conversation) => conversation?.isChecked !== true
                        )
                      }
                      onChange={handleChange}
                    />
                  </th>
                  <th>ID</th>
                  <th>Название</th>
                  <th>Дата</th>
                </tr>
                {filtredConversation && filtredConversation.id
                  ? conversationsList
                      .filter((item) =>
                        filtredConversation.label === "client"
                          ? item.client_id == filtredConversation.id
                          : item.entity_id == filtredConversation.id
                      )
                      .map((conversation) => (
                        <tr
                          key={conversation.id}
                          className="body__tr"
                          onClick={() =>
                            navigateToConversation(conversation.id)
                          }
                        >
                          <td>
                            <input
                              type="checkbox"
                              name={conversation.id}
                              checked={conversation?.isChecked || false}
                              onChange={handleChange}
                              onClick={(event) => event.stopPropagation()}
                            />
                          </td>
                          <td className="main_field">{conversation.id}</td>
                          <td>{conversation.client}</td>
                          <td>{conversation.date}</td>
                        </tr>
                      ))
                  : conversationsList
                      .filter((item) =>
                        item.client.toLowerCase().includes(searchValue)
                      )
                      .map((conversation) => (
                        <tr
                          key={conversation.id}
                          className="body__tr"
                          onClick={() =>
                            navigateToConversation(conversation.id)
                          }
                        >
                          <td>
                            <input
                              type="checkbox"
                              name={conversation.id}
                              checked={conversation?.isChecked || false}
                              onChange={handleChange}
                              onClick={(event) => event.stopPropagation()}
                            />
                          </td>
                          <td className="main_field">{conversation.id}</td>
                          <td>{conversation.client}</td>
                          <td>{conversation.date}</td>
                        </tr>
                      ))}
              </Table>
            ) : (
              <h1 className={cl.documents__loading}>Загрузка...</h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ConversationsList;
