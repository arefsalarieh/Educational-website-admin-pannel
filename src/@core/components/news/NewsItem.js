import React from "react";
import {
  Activity,
  Edit,
  Eye,
  MoreVertical,
  Star,
  ThumbsUp,
  Trash,
} from "react-feather";
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
import { makeFormData } from "../../utils/makeFormData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function NewsItem({ data, apiParam, setApiParam, onClick, refetch }) {
  const navigate = useNavigate();

  const onNavigateDetailsPage = (e) => {
    e.preventDefault();
    navigate("/news/newsDetail/" + data?.id);
  }
  
  const onActiveDeactive = (e) => {
    e.preventDefault();
    const obj = {
      Id: data?.id,
      Active: !apiParam?.IsActive,
    };

    const newFormData = makeFormData(obj);

    activeDeactive.mutate(newFormData);
    refetch;
  };

  const onEdit = (e) => {
    e.preventDefault();
    navigate("/editNews/" + data?.id);
  };

  // ** set active or deactive
  const activeDeactive = useMutation((formData) =>
    instance.put("/News/ActiveDeactiveNews", formData).then((res) => {
      res.success === true && toast.success(res.message);
      res.error === true && toast.error(res.message);
    })
  );

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
        <span className="align-middle fw-bold text-nowrap">
          {data.title.length > 20
            ? data.title.slice(0, 20) + "..."
            : data.title}
        </span>
      </td>
      <td>
        {/* <img
          className="me-75 rounded-circle"
          src={data.addUserProfileImage}
          alt={logo}
          height="20"
          width="20"
        /> */}
        <span className="align-middle fw-bold text-nowrap">
          {data.addUserFullName.length > 15
            ? data.addUserFullName.slice(0, 15) + "..."
            : data.addUserFullName}
        </span>
      </td>
      <td>
        <span>{data.updateDate.slice(0, 10)}</span>
      </td>
      <td>
        {/* <RateStars rate={data.currentRate} /> */}
        <Badge pill color="light-primary" className="me-1">
          <ThumbsUp size={15} />
          <span className="px-1">{data.currentLikeCount}</span>
        </Badge>
      </td>
      <td>
        <Badge pill color="light-success" className="me-1">
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
            <DropdownItem href="/" onClick={(e) => onNavigateDetailsPage(e)}>
              <Eye className="me-50" size={15} />{" "}
              <span className="align-middle">مشاهده</span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => onActiveDeactive(e)}>
              <Activity className="me-50" size={15} />{" "}
              <span className="align-middle">
                {apiParam.IsActive ? "غیر فعال کردن" : "فعال کردن"}
              </span>
            </DropdownItem>
            <DropdownItem href="/" onClick={(e) => onEdit(e)}>
              <Edit className="me-50" size={15} />{" "}
              <span className="align-middle">تغییرات</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
}

export default NewsItem;
