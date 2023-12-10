import { Check, Plus, X } from "react-feather";
import {
  Table,
  CardHeader,
  CardTitle,
  UncontrolledButtonDropdown,
  Button,
  Card,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { Fragment, useEffect } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import instance from "../../interceptor";
import NewsItem from "./NewsItem";
import ProjSpinner from "../common/Spinner";
import DbError from "../common/DbError";
import NoItemFromDb from "../common/NoItemFromDb";
import IconPagination from "../common/PaginationIconsAndText";
import { inputTimeout } from "../../utils/inputTimeOut";
import { useNavigate } from "react-router-dom";

const News = () => {
  // ** states
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);

  const [apiParam, setApiParam] = useState({
    PageNumber: 1,
    RowsOfPage: 6,
    SortingCol: "InsertDate",
    SortType: "DESC",
    Query: "",
    IsActive: true,
  });

  // useEffect(() => {
  //   console.log("refetch", apiParam.PageNumber);
  //   refetch();
  // }, [apiParam.PageNumber]);

  // ** call api news
  const { data, status, refetch } = useQuery({
    queryKey: [
      "getAllNews",
      apiParam.PageNumber,
      apiParam.Query,
      apiParam.IsActive,
    ],
    queryFn: () =>
      instance.get(
        `/News/AdminNewsFilterList?PageNumber=${apiParam.PageNumber}&RowsOfPage=${apiParam.RowsOfPage}&SortingCol=${apiParam.SortingCol}&SortType=${apiParam.SortType}&Query=${apiParam.Query}&IsActive=${apiParam.IsActive}`
      ),
  });

  const handleFilter = (e) => {
    // inputTimeout(
    // () => setApiParam({ ...apiParam, Query: e.target.value }),
    setApiParam({ ...apiParam, Query: e.target.value });

    // 500
    // );
  };

  const CustomLabel = ({ htmlFor }) => {
    return (
      <Label className="form-check-label" htmlFor={htmlFor}>
        <span className="switch-icon-left">
          <Check size={14} />
        </span>
        <span className="switch-icon-right">
          <X size={14} />
        </span>
      </Label>
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
          <CardTitle tag="h4">لیست اخبار</CardTitle>
          <div className="d-flex mt-md-0 mt-1">
            <Button
              className="ms-2"
              color="primary"
              onClick={() => navigate("/addNews")}>
              <span className="align-middle me-50">درج خبر جدید</span>
              <Plus size={15} />
            </Button>
          </div>
          <div className="d-flex">
            <Label for="icon-primary" className="form-check-label me-50 mt-45">
              اخبار قابل مشاهده
            </Label>
            <div className="form-switch form-check-primary">
              <Input
                onChange={(e) => {
                  // qClient.invalidateQueries("getAllNews");
                  setApiParam({ ...apiParam, IsActive: e.target.checked });
                  refetch();
                  console.log(apiParam);
                }}
                type="switch"
                // defaultChecked
                checked={apiParam.IsActive}
                id="icon-primary"
                name="icon-primary"
              />
              <CustomLabel htmlFor="icon-primary" />
            </div>
          </div>
        </CardHeader>
        <Row className="justify-content-end mx-0">
          <Col
            className="d-flex align-items-center justify-content-end mt-1"
            md="6"
            sm="12">
            <Label className="me-1" for="search-input">
              جستجو
            </Label>
            <Input
              className="dataTable-filter mb-50"
              type="text"
              bsSize="sm"
              id="search-input"
              onChange={(e) => handleFilter(e)}
              // onChange={handleFilter}
            />
          </Col>
        </Row>
        {status === "loading" ? (
          <ProjSpinner />
        ) : status === "error" ? (
          <DbError />
        ) : (
          <>
            {data?.totalCount > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>عنوان خبر</th>
                    <th>نویسنده</th>
                    <th>تاریخ درج</th>
                    <th>تعداد لایک</th>
                    <th>تعداد بازدید</th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.news.map((news, index) => {
                    return (
                      <NewsItem
                        key={index}
                        data={news}
                        setApiParam={setApiParam}
                        apiParam={apiParam}
                        refetch={() => refetch()}
                      />
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <NoItemFromDb title="عدم وجود داده" />
            )}
          </>
        )}
        <IconPagination
          total={data?.totalCount}
          apiParam={apiParam}
          setApiParam={setApiParam}
        />
      </Card>
    </Fragment>
  );
};

export default News;
