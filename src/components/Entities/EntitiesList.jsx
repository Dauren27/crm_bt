import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BiSearch } from "react-icons/bi";

import cl from "../../pages/Documents/documentsList.module.scss";
import { deleteEntity, getEntities, getEntity } from "../../redux/reducers";
import { Loading, Success, Table } from "../UI";

const EntitiesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    entities,
    deleteSuccess,
    deleteLoading,
    successMessage,
    patchMessage,
    entity,
    patchEntity,
  } = useSelector((state) => state.entity);
  const [entitiesList, setEntitiesList] = useState(entities && entities);
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempEntities = entitiesList.map((entity) => {
        return { ...entity, isChecked: checked };
      });
      setEntitiesList(tempEntities);
    } else {
      let tempEntities = entitiesList.map((entity) =>
        entity.id == name ? { ...entity, isChecked: checked } : entity
      );
      setEntitiesList(tempEntities);
    }
  };
  const deleteDoc = () => {
    entitiesList.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteEntity({ id: doc.id })).then(() =>
          dispatch(getEntities())
        );
      }
    });
  };
  const navigateToEntity = (id) => {
    dispatch(getEntity({ id: id })).then(() =>
      navigate(`/counterparties/entity/${id}`)
    );
  };

  useEffect(() => {
    setEntitiesList(entities);
  }, [entities]);

  useEffect(() => {
    dispatch(getEntities());
  }, [dispatch]);
  
  return (
    <div className={cl.container}>
      <div className={cl.container__header}>
        <h2>Список Юридических лиц</h2>
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
          <Success>Документ {entity && entity.id} был успешно добавлен</Success>
        )}
        {patchMessage && (
          <Success>
            Документ {patchEntity && patchEntity.id} был успешно изменён
          </Success>
        )}
        <div className={cl.content__list}>
          {entitiesList ? (
            <Table>
              <tr className="header__tr">
                <th>
                  <input
                    type="checkbox"
                    name="allSelect"
                    checked={
                      !entitiesList.some((entity) => entity?.isChecked !== true)
                    }
                    onChange={handleChange}
                  />
                </th>
                <th>ID</th>
                <th>ФИО представителя</th>
                <th>Компания клиента</th>
              </tr>
              {entitiesList
                .filter((item) =>
                  item.full_name_director.toLowerCase().includes(searchValue)
                )
                .map((entity) => (
                  <tr
                    key={entity.id}
                    className="body__tr"
                    onClick={() => navigateToEntity(entity.id)}
                  >
                    <td>
                      <input
                        type="checkbox"
                        name={entity.id}
                        checked={entity?.isChecked || false}
                        onChange={handleChange}
                        onClick={(event) => event.stopPropagation()}
                      />
                    </td>
                    <td className="main_field">{entity.id}</td>
                    <td>{entity.full_name_director}</td>
                    <td>{entity.client_company}</td>
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

export default EntitiesList;
