import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BiSearch } from "react-icons/bi";

import cl from "../../pages/Documents/documentsList.module.scss";
import { Loading, Success, Table } from "../UI";
import { deleteClient, getClient, getClients } from "../../redux/reducers";

const ClientsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    clients,
    deleteSuccess,
    deleteLoading,
    successMessage,
    patchMessage,
    client,
    patchClient,
  } = useSelector((state) => state.client);
  const [clientsList, setClientsList] = useState(clients && clients);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempClients = clientsList.map((client) => {
        return { ...client, isChecked: checked };
      });
      setClientsList(tempClients);
    } else {
      let tempClients = clientsList.map((client) =>
        client.id == name ? { ...client, isChecked: checked } : client
      );
      setClientsList(tempClients);
    }
  };
  const deleteDoc = () => {
    clientsList.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteClient({ id: doc.id })).then(() =>
          dispatch(getClients())
        );
      }
    });
  };
  const navigateToClient = (id) => {
    dispatch(getClient({ id: id })).then(() =>
      navigate(`/counterparties/client/${id}`)
    );
  };

  useEffect(() => {
    dispatch(getClients());
  }, [dispatch]);

  useEffect(() => {
    setClientsList(clients);
  }, [clients]);
  
  return (
    <div className={cl.container}>
      <div className={cl.container__header}>
        <h2>Список Физических лиц</h2>
        <button onClick={() => navigate("/counterparties/add")}>
          Добавить
        </button>
      </div>
      <div className={cl.content}>
        <div className={cl.content__search}>
          <input
            type="text"
            onChange={(e) => {
              setSearchValue(e.target.value.toLowerCase());
            }}
            placeholder="Поиск"
          />
          <BiSearch />
        </div>
        <div className={cl.content__deleteDiv}>
          <button className={cl.content__delete} onClick={deleteDoc}>
            Удалить
          </button>
        </div>
        {deleteSuccess && <Success>Документ был успешно удален</Success>}
        {deleteLoading && <Loading>Удаление...</Loading>}
        {successMessage && (
          <Success>Документ {client && client.id} был успешно добавлен</Success>
        )}
        {patchMessage && (
          <Success>
            Документ {patchClient && patchClient.id} был успешно изменён
          </Success>
        )}
        <div className={cl.content__list}>
          {clientsList ? (
            <Table>
              <tr className="header__tr">
                <th>
                  <input
                    type="checkbox"
                    name="allSelect"
                    checked={
                      !clientsList.some((client) => client?.isChecked !== true)
                    }
                    onChange={handleChange}
                  />
                </th>
                <th>ID</th>
                <th>ФИО клиента</th>
                <th>Тип кредита</th>
              </tr>
              {clientsList
                .filter((item) =>
                  item.full_name.toLowerCase().includes(searchValue)
                )
                .map((client) => (
                  <tr
                    key={client.id}
                    className="body__tr"
                    onClick={() => navigateToClient(client.id)}
                  >
                    <td>
                      <input
                        type="checkbox"
                        name={client.id}
                        checked={client?.isChecked || false}
                        onChange={handleChange}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </td>
                    <td className="main_field">{client.id}</td>
                    <td>{client.full_name}</td>
                    {client.credit_type == "CR" ? (
                      <td>Кредит</td>
                    ) : (
                      <td>Лизинг</td>
                    )}
                    <td>{document.created_date}</td>
                  </tr>
                ))}
            </Table>
          ) : (
            <h1 className={cl.documents__loading}>Загрузка...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsList;
