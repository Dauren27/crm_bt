import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BiSearch } from "react-icons/bi";
import { TfiBarChart } from "react-icons/tfi";

import cl from "../../pages/Documents/documentsList.module.scss";
import { deleteEntity, getEntities, getEntity } from "../../redux/reducers";
import { Loading, Success, Table } from "../UI";
import Chart from "../../components/UI/Chart/Chart";

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
  const [chartToggle, setChartToggle] = useState(false);

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
        <h2>???????????? ?????????????????????? ??????</h2>
        <button onClick={() => navigate("/counterparties/add")}>
          ????????????????
        </button>
      </div>
      <div className={cl.content}>
        <div className={cl.content__search}>
          <input
            type="text"
            onChange={(e) => {
              setSearchValue(e.target.value.toLowerCase());
            }}
            placeholder="??????????"
          />
          <BiSearch />
        </div>
        <div className={cl.content__deleteDiv}>
          <button className={cl.content__delete} onClick={deleteDoc}>
            ??????????????
          </button>
          <div
            className={cl.chart__toggle}
            onClick={() => setChartToggle(!chartToggle)}
          >
            {chartToggle ? <a>???????????? ????????????</a> : <a>???????????????? ????????????</a>}
            <TfiBarChart />
          </div>
        </div>
        {chartToggle && <Chart title="?????????????????????? ????????" item="Entity" />}
        {deleteSuccess && <Success>???????????????? ?????? ?????????????? ????????????</Success>}
        {deleteLoading && <Loading>????????????????...</Loading>}
        {successMessage && (
          <Success>???????????????? {entity && entity.id} ?????? ?????????????? ????????????????</Success>
        )}
        {patchMessage && (
          <Success>
            ???????????????? {patchEntity && patchEntity.id} ?????? ?????????????? ??????????????
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
                <th>?????? ??????????????????????????</th>
                <th>???????????????? ??????????????</th>
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
            <h1 className={cl.documents__loading}>????????????????...</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntitiesList;
