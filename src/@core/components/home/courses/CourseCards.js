// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Table,
  Modal,
  Button,
  CardBody,
  ModalBody,
  ModalHeader,
  FormFeedback,
  UncontrolledTooltip,
  ListGroup,
  ListGroupItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

// ** Third Party Components
import {
  Book,
  BookOpen,
  Copy,
  Feather,
  GitHub,
  Info,
  Layers,
  Loader,
  Paperclip,
  UserCheck,
  Users,
} from "react-feather";
import { useForm, Controller } from "react-hook-form";
import Select, { components } from "react-select";
import { selectThemeColors } from "@utils";

// ** Custom Components
import instance from "../../../interceptor";
import Spinner from "../../common/Spinner";
import CourseModal from "./CourseModal";
import {PersianRolesMaker} from '../../../utils/persianRolesMaker'

// ** FAQ Illustrations
import { useMutation, useQueries, useQuery } from "react-query";

const persianRole = (string) => {
  if (string === "Administrator") return "ادمین";
  else if (string === "Teacher") return "استاد";
  else if (string === "Student") return "دانشجو";
  else if (string === "CourseAssistance") return "دستیار آموزش";
  else if (string === "Employee.Admin") return "دستیار ادمین";
  else if (string === "Employee.Writer") return "دستیار نویسنده";
  else if (string === "Referee") return "داور";
  else if (string === "TournamentAdmin") return "ادمین دوره";
  else if (string === "TournamentMentor") return "منتور";
};


import Avatar from "react-avatar";


// ** Portraits
import portrait1 from "@src/assets/images/portrait/small/avatar-s-9.jpg";
import portrait2 from "@src/assets/images/portrait/small/avatar-s-3.jpg";
import portrait3 from "@src/assets/images/portrait/small/avatar-s-5.jpg";
import portrait4 from "@src/assets/images/portrait/small/avatar-s-7.jpg";
import portrait5 from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import portrait6 from "@src/assets/images/portrait/small/avatar-s-10.jpg";
import portrait7 from "@src/assets/images/portrait/small/avatar-s-8.jpg";
import portrait8 from "@src/assets/images/portrait/small/avatar-s-6.jpg";


const RoleCards = () => {
  // ** States
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [role, setRole] = useState()
  // const [modalType, setModalType] = useState("Add New");

  // ** get datasets

  const { data: dataset } = useQuery("dataset", () =>
    instance.get(
      "/User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true"
    )
  );

  const { data: adminCount } = useQuery(
    "adminCount",
    () =>
      instance.get(
        "/User/UserMannage?RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&IsActiveUser=true&IsDeletedUser=true&roleId=1"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
  );
  const { data: teacherCount } = useQuery(
    "teacherCount",
    () =>
      instance.get(
        "/User/UserMannage?RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&IsActiveUser=true&IsDeletedUser=true&roleId=2"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
  );
  const { data: studentCount } = useQuery(
    "studentCount",
    () =>
      instance.get(
        "/User/UserMannage?RowsOfPage=100&SortingCol=0DESC&SortType=InsertDate&IsActiveUser=true&IsDeletedUser=true&roleId=3"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
  );
  const { data: courseAssistanceCount } = useQuery(
    "courseAssistanceCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=4"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
  );
  const { data: employeeAdminCount } = useQuery(
    "employeeAdminCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=5"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
  );
  const { data: employeeWriterCount } = useQuery(
    "employeeWriterCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=6"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
  );
  const { data: refereeCount } = useQuery(
    "refereeCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=7"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
  );
  const { data: tournamentAdminCount } = useQuery(
    "tournamentAdminCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=8"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
  );
  const { data: tournamentMentorCount, status } = useQuery(
    "tournamentMentorCount",
    () =>
      instance.get(
        "/User/UserMannage?PageNumber=0&RowsOfPage=0&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=9"
      )
    // .then((res) => {
    //   return res.totalCount;
    // })
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
  const data = [
    {
      img: portrait1,
      type: "Can Edit",
      name: "Lester Palmer",
      username: "pe@vogeiz.net",
    },
    {
      img: portrait2,
      type: "Owner",
      name: "Mittie Blair",
      username: "peromak@zukedohik.gov",
    },
    {
      img: portrait3,
      type: "Can Comment",
      name: "Marvin Wheeler",
      username: "rumet@jujpejah.net",
    },
    {
      img: portrait4,
      type: "Can View",
      name: "Nannie Ford",
      username: "negza@nuv.io",
    },
    {
      img: portrait5,
      type: "Can Edit",
      name: "Julian Murphy",
      username: "lunebame@umdomgu.net",
    },
    {
      img: portrait6,
      type: "Can View",
      name: "Sophie Gilbert",
      username: "ha@sugit.gov",
    },
    {
      img: portrait7,
      type: "Can Comment",
      name: "Chris Watkins",
      username: "zokap@mak.org",
    },
    {
      img: portrait8,
      type: "Can Edit",
      name: "Adelaide Nichols",
      username: "ujinomu@jigo.com",
    },
  ];

  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { roleName: "" } });

  const onSubmit = (data) => {
    if (data.roleName.length) {
      setShow(false);
    } else {
      setError("roleName", {
        type: "manual",
      });
    }
  };

  const onReset = () => {
    setShow(false);
    reset({ roleName: "" });
  };

  const handleModalClosed = () => {
    setModalType("Add New");
    setValue("roleName");
  };

  return (
    <Fragment>
      <Row>
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
                            <small
                              className="fw-bolder text-primary"
                              onClick={() => {
                                setShow(!show);
                                setModalData(personCount[index]);
                                setRole(item.roleName);
                                console.log(modalData);
                              }}>
                              مشاهده اعضا
                            </small>
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
        {status === "Loading" && <Spinner />}
      </Row>

      {show && <CourseModal show={show} setShow={setShow} modalData={modalData} role={role} />}
    </Fragment>
  );
};

export default RoleCards;
