import React from "react";
import { Edit, MoreVertical, Trash } from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

function CourseItem({
  fullName,
  // classRoomName,
  typeName,
  statusName,
  levelName,
  cost,
  title,
  // describe,
}) {

  const navigate = useNavigate();

  return (
    <tr>
      <td className="text-nowrap ">{fullName}</td>
      <td className="text-nowrap "> {title}</td>
      <td className="text-nowrap ">{levelName}</td>
      {/* <td className='text-nowrap '>{classRoomName}</td> */}
      <td className="text-nowrap ">{statusName}</td>
      <td className="text-nowrap ">{typeName}</td>
      <td className="text-nowrap ">{cost}</td>
      {/* <td className='text-ellipsis'>{describe}</td> */}
      <td>
        <Badge pill color="light-primary" className="me-1">
          فعال
        </Badge>
      </td>

      <td>
        <Badge
          pill
          color="light-primary"
          className="me-1"
          onClick={() => {
            navigate("/DetailCourse");
          }}
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
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">جزییات</span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Trash className="me-50" size={15} />{" "}
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
}

export default CourseItem;
