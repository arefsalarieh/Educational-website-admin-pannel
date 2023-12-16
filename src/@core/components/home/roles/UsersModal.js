// ** React Imports
import { Fragment, useState } from "react";

// ** Custom Components
// import Avatar from '@components/avatar'
import Avatar from "react-avatar";
import { PersianRolesMaker } from "../../../utils/persianRolesMaker";

// ** Reactstrap Imports
import {
  Card,
  Button,
  Label,
  Modal,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  ListGroupItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

// ** Third Party Components
import Select, { components } from "react-select";
import { FileText, Users, Link } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";
import { getItem } from "../../../common/storage.services";
import { useMutation } from "react-query";
import instance from "../../../interceptor";
import toast from "react-hot-toast";

const roleParser = (role) => {
  if (role === "Administrator") return 1;
  else if (role === "Teacher") return 2;
  else if (role === "Student") return 3;
  else if (role === "CourseAssistance") return 4;
  else if (role === "Employee.Admin") return 5;
  else if (role === "Employee.Writer") return 6;
  else if (role === "Referee") return 7;
  else if (role === "TournamentAdmin") return 8;
  else if (role === "Administrator") return 9;
};

const ShareProjectExample = ({ show, setShow, modalData, role, dataset, refetch }) => {
  const navigate = useNavigate();

  // console.log(modalData);

  const newList = dataset?.listUser.filter((obj1) => {
    return !modalData?.listUser.some((obj2) => obj1.id === obj2.id);
  });

  const setAccess = useMutation((setRoleObj) =>
    instance
      .post("/User/AddUserAccess?Enable=true", setRoleObj)
      .then(
        (res) =>
          {res.success == true &&
          toast.success(
            `کاربر با موفقیت در لیست ${PersianRolesMaker(role)} اضافه شد`
          );
          res.errors == true && toast.error("عملیات با خطا مواجه شد")
        }
      )
  );

  const onAddRole = (e, id) => {
    e.preventDefault();
    const obj = { roleId: roleParser(role), userId: id };
    setAccess.mutate(obj);
    refetch
  };

  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div
          className="d-flex flex-wrap align-items-center"
          onClick={(e) => onAddRole(e, data.id)}>
          <Avatar round size="20px" name={data.fname + " " + data.lname} />
          <div className="d-flex">
            <span className="mx-1">
              {data.fname == null && data.lname == null
                ? "اطلاعات ناقص است"
                : data.fname + " " + data.lname}
            </span>
            <span>{data.gmail}</span>
          </div>
        </div>
      </components.Option>
    );
  };

  return (
    <Fragment>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg">
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-4">
          <h1 className="text-center mb-1">لیست {PersianRolesMaker(role)}</h1>
          <p className="text-center">
            مشاهده سریع لیست {PersianRolesMaker(role)}‌ها‌
          </p>
          {getItem("role") === "Administrator" && (
            <>
              <Label
                for="addMemberSelect"
                className="form-label fw-bolder font-size font-small-4 mb-50">
                اضافه کاربر به لیست {PersianRolesMaker(role)}‌ها
              </Label>
              <Select
                options={newList}
                isClearable={false}
                id="addMemberSelect"
                theme={selectThemeColors}
                className="react-select"
                classNamePrefix="select"
                components={{
                  Option: OptionComponent,
                }}
              />
            </>
          )}

          <p className="fw-bolder pt-50 mt-2">{modalData.totalCount} Members</p>
          <ListGroup flush className="mb-2">
            {modalData?.listUser.map((item, index) => {
              return (
                <ListGroupItem
                  key={index}
                  className="d-flex align-items-start border-0 px-0">
                  <Avatar
                    round
                    size="35px"
                    name={item.fname + " " + item.lname}
                  />
                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="me-1 ms-1">
                      <h5 className="mb-25">{item.fname + " " + item.lname}</h5>
                      <span>{item.gmail}</span>
                    </div>
                    {/* <UncontrolledDropdown>
                      <DropdownToggle color='flat-secondary' caret>
                        <span className='d-lg-inline-block d-none'>{item.type}</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className='w-100'>Owner</DropdownItem>
                        <DropdownItem className='w-100'>Can Edit</DropdownItem>
                        <DropdownItem className='w-100'>Can Comment</DropdownItem>
                        <DropdownItem className='w-100'>Can View</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown> */}

                    <Button
                      color="primary"
                      onClick={() => navigate(`/pages/profile/${item.id}`)}>
                      مشاهده اطلاعات کاربر
                    </Button>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
          {/* <div className='d-flex align-content-center justify-content-between flex-wrap'>
            <div className='d-flex align-items-center me-2'>
              <Users className='font-medium-2 me-50' />
              <p className='fw-bolder mb-0'>Public to Vuexy - Pixinvent</p>
            </div>
            <a className='fw-bolder' href='#' onClick={e => e.preventDefault()}>
              <Link className='font-medium-2 me-50' />
              <span>Copy project link</span>
            </a>
          </div> */}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ShareProjectExample;
