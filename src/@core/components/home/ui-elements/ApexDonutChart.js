// ** Third Party Components
import Chart from "react-apexcharts";
import { useQuery } from "react-query";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";
import instance from "../../../interceptor";
import ProjSpinner from "../../common/Spinner";
import DbError from "../../common/DbError";

const ApexRadiarChart = () => {
  const donutColors = [
    "#ffe700",
    "#00d4bd",
    "#826bf8",
    "#2b9bf4",
    "#FFA1A1",
    "#229954",
    "#3498DB",
    "#FF5733",
  ];

  // ** get data
  const { data: techData, status } = useQuery("techData", () => {
    return instance.get(
      "https://acadapi.etacorealtime.ir/api/Report/DashboardTechnologyReport"
    );
  });

  let label = [];
  let serie = [];

  techData?.map((data, i) => {
    label.push(data.techName);
    serie.push(data.countUsed);
  });

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: "bottom",
    },
    labels: label,

    colors: donutColors,
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${parseInt(val)}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "2rem",
              fontFamily: "Montserrat",
            },
            value: {
              fontSize: "1rem",
              fontFamily: "Montserrat",
              formatter(val) {
                return `${parseInt(val)}%`;
              },
            },
            total: {
              show: true,
              fontSize: "1.5rem",
              label: "ReactJS",
              formatter() {
                return "22%";
              },
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: "1.5rem",
                  },
                  value: {
                    fontSize: "1rem",
                  },
                  total: {
                    fontSize: "1.5rem",
                  },
                },
              },
            },
          },
        },
      },
    ],
  };

  // ** Chart Series
  const series = serie;

  if (status === "loading") return <ProjSpinner />;
  else if (status === "error") return <DbError />;

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="mb-75" tag="h4">
            دوره‌های ارائه شده
          </CardTitle>
          <CardSubtitle className="text-muted">
            نمایش دوره‌های ارائه شده در آکادمی
          </CardSubtitle>
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type="donut" height={310} />
      </CardBody>
    </Card>
  );
};

export default ApexRadiarChart;
