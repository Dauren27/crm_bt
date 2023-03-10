import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BiSearch } from "react-icons/bi";
import { TfiBarChart } from "react-icons/tfi";

import cl from "../Documents/documentsList.module.scss";
import Layout from "../../Layout/Layout";
import { deleteCompany, getCompanies, getCompany } from "../../redux/reducers";
import { Loading, Success, Table } from "../../components/UI";
import Chart from "../../components/UI/Chart/Chart";

const CompaniesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    companies,
    deleteSuccess,
    deleteLoading,
    successMessage,
    patchMessage,
    company,
    patchCompany,
    deletedCompany,
  } = useSelector((state) => state.company);
  const [companiesList, setCompaniesList] = useState(companies && companies);
  const [searchValue, setSearchValue] = useState("");
  const [chartToggle, setChartToggle] = useState(false);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempCompanies = companiesList.map((company) => {
        return { ...company, isChecked: checked };
      });
      setCompaniesList(tempCompanies);
    } else {
      let tempCompanies = companiesList.map((company) =>
        company.company_name == name
          ? { ...company, isChecked: checked }
          : company
      );
      setCompaniesList(tempCompanies);
    }
  };
  const deleteDoc = () => {
    companiesList.map((doc) => {
      if (doc?.isChecked) {
        dispatch(deleteCompany({ id: doc.id })).then(() =>
          dispatch(getCompanies())
        );
      }
    });
  };

  const navigateToCompany = (id) => {
    dispatch(getCompany({ id: id })).then(() => navigate(`/companies/${id}`));
  };

  useEffect(() => {
    setCompaniesList(companies);
  }, [companies, dispatch]);
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (
    <Layout>
      <div className={cl.container}>
        <div className={cl.container__header}>
          <h2>???????????? ????????????????</h2>
          <button onClick={() => navigate("/companies/add")}>????????????????</button>
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
          {chartToggle && <Chart title="????????????????" item="Company" />}
          {deleteSuccess && (
            <Success>
              ???????????????? {deletedCompany && deletedCompany.id} ?????? ?????????????? ????????????
            </Success>
          )}
          {deleteLoading && <Loading>????????????????...</Loading>}
          {successMessage && (
            <Success>
              ???????????????? {company && company.id} ?????? ?????????????? ????????????????
            </Success>
          )}
          {patchMessage && (
            <Success>
              ???????????????? {patchCompany && patchCompany.id} ?????? ?????????????? ??????????????
            </Success>
          )}
          <div className={cl.content__list}>
            {companiesList ? (
              <Table>
                <tr className="header__tr">
                  <th>
                    <input
                      type="checkbox"
                      name="allSelect"
                      checked={
                        !companiesList.some(
                          (company) => company?.isChecked !== true
                        )
                      }
                      onChange={handleChange}
                    />
                  </th>
                  <th>ID</th>
                  <th>???????????????????????? ????????????????</th>
                  <th>?????????????????????? ??????????</th>
                </tr>
                {companiesList
                  .filter((item) =>
                    item.company_name.toLowerCase().includes(searchValue)
                  )
                  .map((company) => (
                    <tr
                      key={company.id}
                      className="body__tr"
                      onClick={() => navigateToCompany(company.id)}
                    >
                      <td>
                        <input
                          type="checkbox"
                          name={company.company_name}
                          checked={company?.isChecked || false}
                          onChange={handleChange}
                          onClick={(event) => event.stopPropagation()}
                        />
                      </td>
                      <td className="main_field">
                        <span>{company.id}</span>
                      </td>
                      <td>{company.company_name}</td>
                      <td>{company.legal_address}</td>
                    </tr>
                  ))}
              </Table>
            ) : (
              <h1 className={cl.documents__loading}>????????????????...</h1>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompaniesList;
