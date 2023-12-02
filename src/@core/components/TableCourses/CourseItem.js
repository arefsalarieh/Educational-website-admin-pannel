import React from "react";
import { Edit, MoreVertical, Trash } from "react-feather";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

function CourseItem({
  fullName,
  classRoomName,
  typeName,
  statusName,
  levelName,
  cost,
  title,
  describe,
//   tumbImageAddress,
//   lastUpdate,
//   courseId,
//   isActive,
//   isdelete,
//   isExpire,
}) {
  return (
    <tr>
      <td ><span className='white-space: nowrap;color:red'>{fullName}</span></td>
      <td className="white-space: nowrap;color:red;"> {title}</td>
      <td>{levelName}</td>
      <td>{classRoomName}</td>
      <td>{statusName}</td>
      <td>{typeName}</td>
      <td>{cost}</td>
      <td>{describe}</td>
      <td>
        <Badge pill color="light-primary" className="me-1">
          Active
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
  );
}

export default CourseItem;
