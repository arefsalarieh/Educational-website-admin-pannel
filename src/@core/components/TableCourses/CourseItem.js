import React, { useState } from "react";
import { Edit, MoreVertical, Trash } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import http from "../../interceptor";
import { useQuery } from "react-query";
import { useFormikContext } from "formik";

function CourseItem({
  id,
  fullName,
  typeName,
  statusName,
  levelName,
  cost,
  title,
  refetch,
  isActive,
}) {
  const navigate = useNavigate();

  const handleDelete = async (values) => {
    const courseobjDel = {
      active: true,
      id: id,
    };
    const result = await http.delete(`/Course/DeleteCourse/`, {
      data: courseobjDel,
    });
    refetch();
    return result;
  };

  const handleActive = async (values) => {
    const courseobjAct = {
      active: isActive === true ? false : true,
      id: id,
    };
    const result = await http.put(
      `/Course/ActiveAndDeactiveCourse`,
      courseobjAct
    );
    refetch();
    return result;
  };

  return (
    <tr  style={{ width: "220px" }}>
      <td className="text-nowrap" style={{ width: "50px" }}>{fullName}</td>
      <td className="text-nowrap" style={{ width: "50px" }}>{title}</td>
      {/* <td className="text-nowrap ">{typeName}</td> */}
      <td className="text-nowrap" style={{ width: "50px" }}>{cost}</td>
      <td>
        <Badge
          pill
          color="light-primary"
          className="me-1 cursor-pointer"
          onClick={handleActive}
          style={{ width: "30px" }}
        >
          {isActive === true ? "فعال" : "غیرفعال"}
        </Badge>
      </td>

      <td>
        <Badge
          pill
          color="light-primary"
          className="me-1 cursor-pointer"
          onClick={() => {
            navigate("/DetailCourse/" + id);
          }}
          style={{ width: "40px" }}
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
              <span className="align-middle" onClick={handleDelete}>
                حذف
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
}

export default CourseItem;
