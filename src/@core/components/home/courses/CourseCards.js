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
  Wifi,
} from "react-feather";
import { useForm, Controller } from "react-hook-form";
import Select, { components } from "react-select";
import { selectThemeColors } from "@utils";

// ** Custom Components
import instance from "../../../interceptor";
import Spinner from "../../common/Spinner";
import CourseModal from "./CourseModal";
import { PersianRolesMaker } from "../../../utils/persianRolesMaker";

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
import ProjSpinner from "../../common/Spinner";

const RoleCards = () => {
  // ** States
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState();
  const [role, setRole] = useState();
  // const [modalType, setModalType] = useState("Add New");

  // ** get datasets

  const { data: dataset, status } = useQuery("courseLevels", () =>
    instance.get("/CourseType/GetCourseTypes")
  );

  const { data: presentData } = useQuery("presentData", () =>
  instance.get("/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=100&SortingCol=Active&SortType=DESC&TechCount=0&CourseTypeId=1")
);

const { data: onlineData } = useQuery("onlineData", () =>
instance.get("/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=100&SortingCol=Active&SortType=DESC&TechCount=0&CourseTypeId=2")
);

const coursesData = [
  presentData,
  onlineData,
];
console.log(coursesData);

  const perCardIcon = [
    { feather: <Wifi className="text-warning" width={54} height={54} /> },
    { feather: <UserCheck className="text-primary" width={54} height={54} /> },
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
        {status === "loading" ? (
          <ProjSpinner />
        ) : (
          dataset?.map((item, index) => {
            return (
              <Col key={index} xl={6} md={6}>
                <Card>
                  <CardBody>
                    <Row className="d-flex justify-content-around">
                      <Col md="6">
                        <div className="d-flex justify-content-between ms-2">
                          <span>{` تعداد دوره‌ها ${coursesData[index]?.totalCount}`}</span>
                          {/* <AvatarGroup data={item.users} /> */}
                        </div>
                        <div className="d-flex justify-content-between align-items-end mt-1 pt-25 ms-2">
                          <div className="role-heading">
                            <h4 className="fw-bolder">{item.typeName}</h4>
                            <Button
                            color="info"
                              className="fw-bolder text-primary"
                              onClick={() => {
                                setShow(!show);
                                setModalData(coursesData[index]);
                                // setRole(item.roleName);
                                console.log(modalData);
                              }}>
                              مشاهده دوره‌ها
                            </Button>
                          </div>
                        </div>
                      </Col>
                      <Col
                        className="d-flex justify-content-end align-items-center pe-4"
                        md="6">
                        {perCardIcon[index].feather}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      {show && (
        <CourseModal
          show={show}
          setShow={setShow}
          modalData={modalData}
          // role={role}
        />
      )}
    </Fragment>
  );
};

export default RoleCards;
