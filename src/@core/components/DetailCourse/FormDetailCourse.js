import { useNavigate, useParams } from "react-router-dom";
import http from "../../interceptor";
import { useQuery } from "react-query";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
} from "reactstrap";
import { Row, Col } from 'reactstrap'



const FormDetailCourse = () => {
  const { id } = useParams();

  console.log(id);

  const getCourseInfo = async () => {
    const result = await http.get(`/Course/${id}`);
    return result;
  };

  const { data, status } = useQuery(["courseInfo", id], getCourseInfo);

  data && console.log(data);

  const navigate = useNavigate();

  return (
    <>
      {/* <Button
        className="me-1 mb-4 mt-2"
        color="primary"
        type="submit"
        onClick={() => {
          navigate("/ReserveCourse");
        }}
      >
         رزرو دوره برای دانشجو  
      </Button> */}



      <Card>
        <CardHeader>
          <CardTitle tag="h4"> مشخصات کامل دوره </CardTitle>
        </CardHeader>
        {data && (
          <CardBody>

            <Row>
              <Col lg='6'>
                <h5 className="mb-75">نام مدرس :</h5>
                <CardText>{data.teacherName}</CardText>
                <div className="mt-2">
                  <h5 className="mb-75"> شروع دوره:</h5>
                  <CardText>{data.startTime}</CardText>
                </div>
                <div className="mt-2">
                  <h5 className="mb-75">پایان دوره :</h5>
                  <CardText>{data.endTime}</CardText>
                </div>
                <div className="mt-2">
                  <h5 className="mb-75"> تاریخ ثبت دوره :</h5>
                  <CardText>{data.insertDate}</CardText>
                </div>
                <div className="mt-2">
                  <h5 className="mb-75"> قیمت دوره :</h5>
                  <CardText>{data.cost}</CardText>
                </div>
                <div className="mt-2">
                  <h5 className="mb-75"> توضیحات :</h5>
                  <CardText>{data.describe}</CardText>
                </div>             
              </Col>

              <Col lg='6'>
                <div className="mt-2">
                  <h5 className="mb-75"> سطح دوره :</h5>
                  <CardText>{data.courseLevelName}</CardText>
                </div>
                <div className="mt-2">
                  <h5 className="mb-75"> وضعیت دوره :</h5>
                  <CardText>{data.courseStatusName}</CardText>
                </div>
                <div className="mt-2">
                  <h5 className="mb-75"> نوع کلاس :</h5>
                  <CardText>{data.courseTypeName}</CardText>
                </div>
                <div className="mt-2">
                  <h5 className="mb-75"> شماره کلاس :</h5>
                  <CardText>{data.courseClassRoomName}</CardText>
                </div>
                <div className="mt-2">
                  <h5 className="mb-75"> تکنولوژی برای آموزش :</h5>
                  <CardText>{data.courseTeches}</CardText>
                </div>  


              </Col>
            </Row> 




          </CardBody>
        )}
      </Card>
    </>
  );
};

export default FormDetailCourse;
