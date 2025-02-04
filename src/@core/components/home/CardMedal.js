// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from "reactstrap";

// ** Images
import medal from "../../../assets/images/illustration/badge.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getItem } from "../../common/storage.services";
import { useQuery } from "react-query";
import instance from "../../interceptor";

const CardMedal = ({userDetails, currentUser}) => {

  const user = useSelector((state) => state.user);
  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5>تبریک {currentUser?.fname ? currentUser?.fname : "کاربر"} {currentUser?.lname ? currentUser?.lname : "گرامی"} 🎉 !</h5>
        <CardText className="font-small-3">
          شما با رول {userDetails?.roles[0].roleName ? userDetails?.roles[0].roleName : "ادمین"} وارد شده اید
        </CardText>
        <h3 className="mb-75 mt-2 pt-50">
          <a href="/" onClick={(e) => e.preventDefault()}>
            درصد تکمیل پروفایل: {currentUser?.profileCompletionPercentage}  %
          </a>
        </h3>
        <Link color="primary" to={"/pages/profile/" + userDetails?.id}>
          <Button color="primary">پروفایل کاربری</Button>
        </Link>
        <img className="congratulation-medal" src={medal} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default CardMedal;
