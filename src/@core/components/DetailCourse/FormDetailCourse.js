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
import AddTechModal from "../FormCreatCourse/AddTechModal";
import { useState , useEffect } from "react";
import AddGroupModal from "./AddGroupModal";



const FormDetailCourse = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [data, setData] = useState()
  const [courseGroup, setCourseGroup] = useState()
  const { id } = useParams();





  const getCourseInfo = async () => {
    const result = await http.get(`/Course/${id}`);
    const result2 = await http.get(`/CourseGroup/GetCourseGroup?TeacherId=${result.teacherId}&CourseId=${id}`);
    setData(result)
    setCourseGroup(result2)

  };

  // const { data, status } = useQuery(["courseInfo", id], getCourseInfo);




  useEffect(() => {
    getCourseInfo()
  },[]);

  return (
    <>


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

                <div  onClick={()=>setShow(true)} className="mt-2">
                  <h5  className="mb-75"> Add Group :</h5>
                  <AddGroupModal  courseGroup={courseGroup} show={show} setShow={setShow} courseId={id}  />


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
                  <div onClick={()=>setShow2(true)}>
                     <AddTechModal  show2={show2} setShow2={setShow2} haveTechs={data.courseTeches && data.courseTeches} />                    
                  </div>

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
