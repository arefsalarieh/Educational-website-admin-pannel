// ** React Imports
import { Fragment } from "react";

// ** Third Party Components
import * as yup from "yup";
import toast from "react-hot-toast";
import { Check, Edit, MoreVertical, Table, Trash } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Col,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useQuery } from "react-query";
import http from "../../interceptor";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useParams } from "react-router-dom";

const FormGetCourseReserve = () => {
  // ** Hooks
  const { reset } = useForm({ mode: "onChange" });

//   const { id } = useParams();

//   console.log(id);

//   const getCourseReseve = async () => {
//     const result = await http.get(`/CourseReserve/${id}`);
//     return result;
//   };

//   const { data, status } = useQuery(["getCourseReseve", id], getCourseReseve);

  return (
    <Table responsive>
      <thead className="table-dark">
        <tr>
          <th>Project</th>
          <th>Client</th>
          <th>Users</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img
              className="me-75"
              alt="angular"
              height="20"
              width="20"
            />
   
          </td>
          <td>Peter Charles</td>
          <td>
            xhshfsghgfh
          </td>
          <td>
            <Badge pill color="light-primary" className="me-1">
              Active
            </Badge>
          </td>
        </tr>
        <tr>
          <td>
            <img
              className="me-75"            
              alt="react"
              height="20"
              width="20"
            />
            <span className="align-middle fw-bold">React Project</span>
          </td>
          <td>Ronald Frest</td>
          <td>
          </td>
          <td>
            <Badge pill color="light-success" className="me-1">
              Completed
            </Badge>
          </td>
          <td>
            <UncontrolledDropdown>
              <DropdownToggle
                className="icon-btn hide-arrow"
                color="transparent"
                size="sm"
                caret
              >
                <MoreVertical size={15} />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                  <Edit className="me-50" size={15} />{" "}
                  <span className="align-middle">Edit</span>
                </DropdownItem>
                <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                  <Trash className="me-50" size={15} />{" "}
                  <span className="align-middle">Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
        <tr>
      <td className="text-nowrap "></td>
      <td className="text-nowrap "></td>
      <td className="text-nowrap "></td>
      <td className="text-nowrap "></td>
      <td>
        <Badge
          pill
          color="light-primary"
          className="me-1"
        //   onClick={handleActive}
        >
          {/* {isActive === true ? "فعال" : "غیرفعال"} */}
        </Badge>
      </td>

      <td>
        <Badge
          pill
          color="light-primary"
          className="me-1"
  
        >
          جزییات
        </Badge>
      </td>
      <td>
        <UncontrolledDropdown>
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Edit className="me-50" size={15} />
              <span
                className="align-middle"
                onClick={() => {
                  navigate("/EditCourse/"+ id);
                }}
              >
                ویرایش
              </span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Trash className="me-50" size={15} />
              <span className="align-middle" >
                حذف
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
        <tr>
      {/* <td className="text-nowrap ">{fullName}</td>
      <td className="text-nowrap ">{title}</td>
      <td className="text-nowrap ">{typeName}</td>
      <td className="text-nowrap ">{cost}</td> */}
      <td>
        <Badge
          pill
          color="light-primary"
          className="me-1"
        //   onClick={handleActive}
        >
          {/* {isActive === true ? "فعال" : "غیرفعال"} */}
        </Badge>
      </td>

      <td>
        <Badge
          pill
          color="light-primary"
          className="me-1"
          onClick={() => {
            navigate("/DetailCourse/" + id);
          }}
        >
          
        </Badge>
      </td>
      <td>
        <UncontrolledDropdown>
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret
          >
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Edit className="me-50" size={15} />
              <span
                className="align-middle"
                onClick={() => {
                  navigate("/EditCourse/"+ id);
                }}
              >
                ویرایش
              </span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Trash className="me-50" size={15} />
              <span className="align-middle" >
                حذف
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
      </tbody>
    </Table>
  );
};

export default FormGetCourseReserve;
