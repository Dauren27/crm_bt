import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";

import cl from "../Documents/documentsList.module.scss";
import Layout from "../../Layout/Layout";
import {
  deleteProperty,
  getProperties,
  getProperty,
} from "../../redux/reducers";
import { Loading, Success, Table, Error } from "../../components/UI";

const PropertyList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    properties,
    deleteLoading,
    deleteSuccess,
    successMessage,
    patchMessage,
    property,
    patchProperty,
  } = useSelector((state) => state.property);
  const [propertiesList, setPropertiesList] = useState(
    properties && properties
  );
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempProperties = propertiesList.map((property) => {
        return { ...property, isChecked: checked };
      });
      setPropertiesList(tempProperties);
    } else {
      let tempProperties = propertiesList.map((property) =>
        property.id == name ? { ...property, isChecked: checked } : property
      );
      setPropertiesList(tempProperties);
    }
  };
  const deleteDoc = () => {
    propertiesList.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteProperty({ id: doc.id })).then(() =>
          dispatch(getProperties())
        );
      }
    });
  };
  const navigateToProperty = (id) => {
    dispatch(getProperty({ id: id })).then(() => navigate(`/properties/${id}`));
  };


  useEffect(() => {
    setPropertiesList(properties);
  }, [properties]);
  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);
  
  return (
    <Layout>
      <div className={cl.container}>
        <div className={cl.container__header}>
          <h2>Список Залоговых имуществ</h2>
          <button onClick={() => navigate("/properties/add")}>Добавить</button>
        </div>
        <div className={cl.content}>
          <div className={cl.content__search}>
            <input
              type="text"
              onChange={(e) => {
                setSearchValue(e.target.value.toLocaleLowerCase());
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
            <Success>
              Документ {property && property.id} был успешно добавлен
            </Success>
          )}
          {patchMessage && (
            <Success>
              Документ {patchProperty && patchProperty.id} был успешно изменён
            </Success>
          )}
          <div className={cl.content__list}>
            {propertiesList ? (
              <Table>
                <tr className="header__tr">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !propertiesList.some(
                          (property) => property?.isChecked !== true
                        )
                      }
                      onChange={handleChange}
                    />
                  </th>
                  <th>ID</th>
                  <th>Залоговое имущество</th>
                  <th>Местонахождение залога</th>
                </tr>
                {propertiesList
                  .filter((item) =>
                    item.type.toLowerCase().includes(searchValue)
                  )
                  .map((property) => (
                    <tr
                      key={property.id}
                      className="body__tr"
                      onClick={() => navigateToProperty(property.id)}
                    >
                      <td>
                        <input
                          type="checkbox"
                          name={property.id}
                          checked={property?.isChecked || false}
                          onChange={handleChange}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </td>
                      <td className="main_field">{property.id}</td>
                      <td>{property.type}</td>
                      <td>{property.address}</td>
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

export default PropertyList;
