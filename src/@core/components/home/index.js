// ** React Imports
import { useContext } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Demo Components
import CompanyTable from "./CompanyTable";
import Earnings from "./Earnings";
import CardMedal from "./CardMedal";
import CardMeetup from "./CardMeetup";
import StatsCard from "./StatsCard";
import GoalOverview from "./GoalOverview";
import RevenueReport from "./RevenueReport";
import OrdersBarChart from "./OrdersBarChart";
import CardTransactions from "./CardTransactions";
import ProfitLineChart from "./ProfitLineChart";
import CardBrowserStates from "./CardBrowserState";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { getItem } from "../../common/storage.services";
import instance from "../../interceptor";

const EcommerceDashboard = () => {
  // ** Context
  const { colors } = useContext(ThemeColors);

  // ** get datasets
  const { data: userDetails } = useQuery("userData", () => {
    return instance.get(`/User/UserDetails/${getItem("userId")}`);
  });
  const { data: currentUser } = useQuery("currentUser", () => {
    return instance.get(`/SharePanel/GetProfileInfo`);
  });

  console.log("currentUser",currentUser);
  console.log("userDetails",userDetails);
  // ** vars
  const trackBgColor = "#e9ecef";
  const dispatch = useDispatch();

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal userDetails={userDetails} currentUser={currentUser} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="12">
          <Row className="match-height">
            <Col lg="6" md="3" xs="6">
              <OrdersBarChart warning={colors.warning.main} />
            </Col>
            <Col lg="6" md="3" xs="6">
              <ProfitLineChart info={colors.info.main} />
            </Col>
            <Col lg="12" md="6" xs="12">
              <Earnings success={colors.success.main} />
            </Col>
          </Row>
        </Col>
        <Col lg="8" md="12">
          <RevenueReport
            primary={colors.primary.main}
            warning={colors.warning.main}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="8" xs="12">
          <CompanyTable />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardMeetup />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardBrowserStates colors={colors} trackBgColor={trackBgColor} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <GoalOverview success={colors.success.main} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardTransactions />
        </Col>
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
