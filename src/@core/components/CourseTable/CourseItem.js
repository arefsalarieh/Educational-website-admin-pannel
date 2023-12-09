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
import { Button } from 'reactstrap'




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
    <tr>
      <td className="text-nowrap ">{fullName}</td>
      <td className="text-nowrap ">{title}</td>
      <td className="text-nowrap ">{typeName}</td>
      <td className="text-nowrap ">{cost}</td>
      <td>
        <Button
          pill
          color='primary'
          className="me-1"
          onClick={handleActive}
        >
          {isActive === true ? "فعال" : "غیرفعال"}
        </Button>
      </td>

      <td>
        <Button
          pill
          color="primary"
          className="me-1"
          onClick={() => {
            navigate("/DetailCourse/" + id);
          }}
        >
          جزییات
        </Button>
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
