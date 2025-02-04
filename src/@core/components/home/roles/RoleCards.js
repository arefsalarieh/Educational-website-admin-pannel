// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
} from "reactstrap";

// ** Third Party Components
import {
  Book,
  BookOpen,
  Feather,
  GitHub,
  Layers,
  Loader,
  Paperclip,
  UserCheck,
  Users,
} from "react-feather";

// ** Custom Components
import instance from "../../../interceptor";
import Spinner from "../../common/Spinner";
import UsersModal from "./UsersModal";
import {PersianRolesMaker} from '../../../utils/persianRolesMaker'

// ** FAQ Illustrations
import { useQuery } from "react-query";


const RoleCards = () => {
  // ** States
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [role, setRole] = useState()
  // const [modalType, setModalType] = useState("Add New");

  // ** get datasets

  const { data: dataset, refetch } = useQuery("dataset", () =>
    instance.get(
      "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&Query="
    )
  );

  const { data: adminCount, } = useQuery(
    "adminCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=1"
      )
  );
  const { data: teacherCount } = useQuery(
    "teacherCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=2"
      )
  );
  const { data: studentCount } = useQuery(
    "studentCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=3"
      )
  );
  const { data: courseAssistanceCount } = useQuery(
    "courseAssistanceCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=4"
      )
  );
  const { data: employeeAdminCount } = useQuery(
    "employeeAdminCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=5"
      )
  );
  const { data: employeeWriterCount } = useQuery(
    "employeeWriterCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=6"
      )
  );
  const { data: refereeCount } = useQuery(
    "refereeCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=7"
      )
  );
  const { data: tournamentAdminCount } = useQuery(
    "tournamentAdminCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=8"
      )
  );
  const { data: tournamentMentorCount, status } = useQuery(
    "tournamentMentorCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&roleId=9"
      )
  );

  const personCount = [
    adminCount,
    teacherCount,
    studentCount,
    courseAssistanceCount,
    employeeAdminCount,
    employeeWriterCount,
    refereeCount,
    tournamentAdminCount,
    tournamentMentorCount,
  ];

  const perCardIcon = [
    { feather: <UserCheck className="text-primary" width={54} height={54} /> },
    { feather: <Book className="text-success" width={54} height={54} /> },
    { feather: <Users className="text-secondary" width={54} height={54} /> },
    { feather: <BookOpen className="text-warning" width={54} height={54} /> },
    { feather: <Paperclip className="text-muted" width={54} height={54} /> },
    { feather: <Feather className="text-info" width={54} height={54} /> },
    { feather: <GitHub className="text-dark" width={54} height={54} /> },
    { feather: <Loader className="text-primary" width={54} height={54} /> },
    { feather: <Layers className="text-danger" width={54} height={54} /> },
  ];


  return (
    <Fragment>
      <Row>
      {status === "loading" && <Spinner />}
      {status === "error" && <Spinner />}
        {status === "success" &&
          dataset?.roles.map((item, index) => {
            return (
              <Col key={index} xl={4} md={6}>
                <Card>
                  <CardBody>
                    <Row className="d-flex justify-content-between">
                      <Col md="6">
                        <div className="d-flex justify-content-between">
                          <span>{` تعداد کاربران ${personCount[index]?.totalCount} نفر`}</span>
                          {/* <AvatarGroup data={item.users} /> */}
                        </div>
                        <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                          <div className="role-heading">
                            <h4 className="fw-bolder">
                              {PersianRolesMaker(item.roleName)}
                            </h4>
                            <Button
                            color="primary"
                              className="fw-bolder"
                              onClick={() => {
                                setShow(!show);
                                setModalData(personCount[index]);
                                setRole(item.roleName);
                              }}>
                              مشاهده اعضا
                            </Button>
                          </div>
                          {/* <Link
                      to=""
                      className="text-body"
                      onClick={(e) => e.preventDefault()}>
                      <Copy className="font-medium-5" />
                    </Link> */}
                        </div>
                      </Col>
                      <Col
                        className="d-flex justify-content-end align-items-center pe-3"
                        md="6">
                        {perCardIcon[index].feather}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        {/* <Col xl={4} md={6}>
          <Card>
            <Row>
              <Col sm={5}>
                <div className="d-flex align-items-end justify-content-center h-100">
                  <img
                    className="img-fluid mt-2"
                    src={illustration}
                    alt="Image"
                    width={85}
                  />
                </div>
              </Col>
              <Col sm={7}>
                <CardBody className="text-sm-end text-center ps-sm-0">
                  <Button
                    color="primary"
                    className="text-nowrap mb-1"
                    onClick={() => {
                      setModalType("Add New");
                      setShow(true);
                    }}>
                    Add New Role
                  </Button>
                  <p className="mb-0">Add a new role, if it does not exist</p>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col> */}
      </Row>

      {show && <UsersModal show={show} setShow={setShow} modalData={modalData} role={role} dataset={dataset} refetch={refetch} />}
    </Fragment>
  );
};

export default RoleCards;
