import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import cl from "./documentsList.module.scss";
import {
  deleteDocument,
  getDocument,
  getDocuments,
} from "../../redux/reducers";
import Layout from "../../Layout/Layout";
import { Loading, Success, Table, Error } from "../../components/UI";

const DocumentsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    documentsList,
    deleteSuccess,
    deleteLoading,
    patchMessage,
    successMessage,
    document,
    patchDocument,
  } = useSelector((state) => state.document);
  const [searchValue, setSearchValue] = useState("");
  const [documents, setDocuments] = useState(
    documentsList && documentsList.results
  );

  const deleteDoc = () => {
    documents.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteDocument({ id: doc.id })).then(() =>
          dispatch(getDocuments())
        );
      }
    });
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempDocuments = documents.map((document) => {
        return { ...document, isChecked: checked };
      });
      setDocuments(tempDocuments);
    } else {
      let tempDocuments = documents.map((document) =>
        document.id == name ? { ...document, isChecked: checked } : document
      );
      setDocuments(tempDocuments);
    }
  };
  const navigateToDocument = (id) => {
    dispatch(getDocument({ id: id })).then(() => navigate(`/documents/${id}`));
  };

  useEffect(() => {
    documentsList && setDocuments(documentsList.results);
  }, [documentsList]);
  
  useEffect(() => {
    dispatch(getDocuments());
  }, [dispatch]);

  return (
    <Layout>
      <div className={cl.container}>
        <div className={cl.container__header}>
          <h2>Список Докуметов на КК</h2>
          <button onClick={() => navigate("/documents/add")}>Добавить</button>
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
            <Success>
              Документ {document && document.id} был успешно добавлен
            </Success>
          )}
          {patchMessage && (
            <Success>
              Документ {patchDocument && patchDocument.id} был успешно изменён
            </Success>
          )}
          <div className={cl.content__list}>
            {documents ? (
              <Table>
                <tr className="header__tr">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !documents.some(
                          (document) => document?.isChecked !== true
                        )
                      }
                      onChange={handleChange}
                    />
                  </th>
                  <th>ID</th>
                  <th>Скоринг</th>
                  <th>Дата создания</th>
                </tr>
                {documents
                  .filter((item) =>
                    item.id.toString().toLowerCase().includes(searchValue)
                  )
                  .map((document) => (
                    <tr
                      key={document.id}
                      className="body__tr"
                      onClick={() => navigateToDocument(document.id)}
                    >
                      <td>
                        <input
                          type="checkbox"
                          name={document.id}
                          checked={document?.isChecked || false}
                          onChange={handleChange}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </td>
                      <td className="main_field">{document.id}</td>
                      <td>{document.scoring}</td>
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
    </Layout>
  );
};

export default DocumentsList;
