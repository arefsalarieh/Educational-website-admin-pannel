import React from "react";
import { Edit, Eye, MoreVertical, Star, Trash } from "react-feather";
import logo from "../../../assets/images/logo/logo-academy.png";
import Rating from "react-rating";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import RateStars from "../common/RateStars";
import { useMutation } from "react-query";
import instance from "../../interceptor";

function NewsItem({ data }) {

  // ** set active or deactive
  const mutate = useMutation(() => instance.put("/News/ActiveDeactiveNews"))

  return (
    <tr>
      <td>
        <img
          className="me-75 rounded-circle"
          src={
            data.currentImageAddressTumb
              ? data.currentImageAddressTumb
              : data.addUserProfileImage
          }
          alt={logo}
          height="20"
          width="20"
        />
        <span className="align-middle fw-bold text-nowrap">{data.title}</span>
      </td>
      <td>
        <img
          className="me-75 rounded-circle"
          src={data.addUserProfileImage}
          alt={logo}
          height="20"
          width="20"
        />
        <span className="align-middle fw-bold text-nowrap">
          {data.addUserFullName}
        </span>
      </td>
      <td>
        <span>{data.updateDate.slice(0, 10)}</span>
      </td>
      <td>
        <RateStars rate={data.currentRate} />
      </td>
      <td>
        <Badge pill color="light-warning" className="me-1">
          <Eye size={15} />
          <span className="px-1">{data.currentView}</span>
        </Badge>
      </td>
      <td>
        <UncontrolledDropdown>
          <DropdownToggle
            className="icon-btn hide-arrow"
            color="transparent"
            size="sm"
            caret>
            <MoreVertical size={15} />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">Hide / Unhide</span>
            </DropdownItem>
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

export default NewsItem;
