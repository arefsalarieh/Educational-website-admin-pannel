// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
// import Avatar from "@components/avatar";
import Avatar from "react-avatar"

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";
import { useQuery } from "react-query";
import http from "../../../../@core/interceptor";
import { getItem } from "../../../common/storage.services";

const UserDropdown = () => {

  const { data } = useQuery("getUserInfo", () =>
    http.get("/SharePanel/GetProfileInfo")
  );


  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}>
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">{data?.fName + " " + data?.lName }</span>
          <span className="user-status">{getItem("role")}</span>
        </div>
        {data?.currentPictureAddress === undefined || null ? <Avatar name={data?.fName + " " + data?.lName } size="40" round /> : 
          <img src={data?.currentPictureAddress} className="rounded-circle" style={{width: "40px", height: "40px"}} />
        }

      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <User size={14} className="me-75" />
          <span className="align-middle">پروفایل کاربری</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <Mail size={14} className="me-75" />
          <span className="align-middle">صندوق پیام</span>
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem> */}
        <DropdownItem divider />
        {/* <DropdownItem
          tag={Link}
          to="/pages/"
          onClick={(e) => e.preventDefault()}>
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <CreditCard size={14} className="me-75" />
          <span className="align-middle">Pricing</span>
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
          <HelpCircle size={14} className="me-75" />
          <span className="align-middle">FAQ</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to="/login">
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
