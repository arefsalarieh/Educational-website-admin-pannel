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
} from "reactstrap";
import { Fragment } from "react";
import { useState } from "react";
import { QueryClient, useQuery } from "react-query";
import instance from "../../interceptor";
import NewsItem from "./NewsItem";
import ProjSpinner from "../common/Spinner";
import DbError from "../common/DbError";
import NoItemFromDb from "../common/NoItemFromDb";
import IconPagination from "../common/PaginationIconsAndText";
import AddNewModal from "../modal/AddNewModal";

const News = () => {
  // ** states
  const [modal, setModal] = useState(false);

  // ** Function to handle Modal toggle
  const handleModal = () => setModal(!modal);

  const [apiParam, setApiParam] = useState({
    PageNumber: 1,
    RowsOfPage: 10,
    SortingCol: "InsertDate",
    SortType: "DESC",
    Query: "",
    IsActive: true,
  });

  // ** call api news
  const { data, status } = useQuery({
    queryKey: "getAllNews",
    queryFn: () =>
      instance.get(
        `/News/AdminNewsFilterList?PageNumber=${apiParam.PageNumber}&RowsOfPage=${apiParam.RowsOfPage}&SortingCol=${apiParam.SortingCol}&SortType=${apiParam.SortType}&Query=${apiParam.Query}&IsActive=${apiParam.IsActive}`
      ),
  });

  const qClient = new QueryClient();

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
            <Button className="ms-2" color="primary" onClick={handleModal}>
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
                onClick={(e) => {
                  qClient.invalidateQueries("getAllNews");
                  setApiParam({ ...apiParam, IsActive: !apiParam.IsActive });
                  console.log(apiParam);
                }}
                type="switch"
                defaultChecked
                id="icon-primary"
                name="icon-primary"
              />
              <CustomLabel htmlFor="icon-primary" />
            </div>
          </div>
        </CardHeader>
        {status === "loading" ? (
          <ProjSpinner />
        ) : status === "error" ? (
          <DbError />
        ) : (
          <Card>
            {data?.totalCount > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th>عنوان خبر</th>
                    <th>نویسنده</th>
                    <th>تاریخ درج</th>
                    <th>امتیاز خبر</th>
                    <th>تعداد بازدید</th>
                    <th>عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.news.map((news, index) => {
                    return <NewsItem key={index} data={news} />;
                  })}
                </tbody>
              </Table>
            ) : (
              <NoItemFromDb title="عدم وجود داده" />
            )}
          </Card>
        )}
        <IconPagination
          total={data?.totalCount}
          apiParam={apiParam}
          setApiParam={() => setApiParam()}
        />
      </Card>
      <AddNewModal open={modal} handleModal={handleModal} />
    </Fragment>
  );
};

export default News;
