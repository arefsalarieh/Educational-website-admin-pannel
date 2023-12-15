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
  Badge
} from "reactstrap";
import { Row, Col } from 'reactstrap'
import AddTechModal from "../FormCreatCourse/AddTechModal";
import { useState , useEffect } from "react";
import AddGroupModal from "./AddGroupModal";
import CommentModal from "./CommentModal/CommentModal";



const FormDetailCourse = () => {
  const navigate = useNavigate();
  const [rand, setRand] = useState()  
  const [data, setData] = useState()
  const [courseGroup, setCourseGroup] = useState()
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const { id } = useParams();





  const getCourseInfoForDetail = async () => {
    const result = await http.get(`/Course/${id}`);
    const result2 = await http.get(`/CourseGroup/GetCourseGroup?TeacherId=${result.teacherId}&CourseId=${id}`);
    setData(result)
    setCourseGroup(result2)
    // console.log(result2);

  };






  useEffect(() => {
    getCourseInfoForDetail()

  },[]);

  return (
    <>



      <Card>
        <CardHeader>
          <Badge> <div style={{fontSize:'25px'}}>مشخصات کامل دوره </div></Badge>
        </CardHeader>
        {data && (
          <CardBody>
            
              <img src={data.imageAddress} alt="" style={{display:'block' , margin:'auto', height:'200px' , overflow:'hidden'}}/>
            

            <Row >
              <Col lg='6'>
                
                <div className="mt-2" style={{fontSize:'20px'}}>
                <Badge color='success'>  title دوره:</Badge>
                  
                  <CardText>{data.title}</CardText>
                </div>
                
                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='success'>  teacherName :</Badge>
                  <CardText>{data.teacherName}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='success'>  courseId :</Badge>
                  <CardText>{data.courseId}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='success'>  شروع دوره: :</Badge>                  
                  <CardText>{data.startTime}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='success'>  پایان دوره:</Badge>  
                  <CardText>{data.endTime}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='success'>  تاریخ ثبت دوره  :</Badge>  
                  <CardText>{data.insertDate}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='success'>  قیمت  دوره  :</Badge>  
                  <CardText>{data.cost} تومان</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='success'>  توضیحات    :</Badge>                    
                  <CardText>{data.describe}</CardText>
                </div> 

                <div className="mt-2" style={{fontSize:'16px'}}>
                  <Badge color='success'>  courseCommentTotal    :</Badge>     
                  <CardText>{data.courseCommentTotal}</CardText>

                  <div onClick={()=>setShow3(true)}>
                  <CommentModal   show3={show3} setShow3={setShow3} courseId={id}  />                    
                  </div>
                </div>

                

                            
              </Col>

              <Col lg='6'>
                <div className="mt-2">
                  <Badge color='success'>   سطح دوره     :</Badge>    
                  <CardText>{data.courseLevelName}</CardText>
                </div>

                <div className="mt-2">
                  <Badge color='success'>   وضعیت دوره     :</Badge>    
                  <h5 className="mb-75"> وضعیت دوره :</h5>
                  <CardText>{data.courseStatusName}</CardText>
                </div>

                <div className="mt-2">
                  <Badge color='success'>   نوع کلاس :</Badge>                    
                  <CardText>{data.courseTypeName}</CardText>
                </div>

                <div className="mt-2">
                  <Badge color='success'>   شماره کلاس :</Badge>  
                  <h5 className="mb-75"> شماره کلاس :</h5>
                  <CardText>{data.courseClassRoomName}</CardText>
                </div>

                <div className="mt-2">
                  <Badge color='success'>  تکنولوژی های آموزش :</Badge>  
                  {data.courseTeches.map((item , index)=>{
                    return(
                      <div key={index}>{item}</div>
                    )
                  })}                    
                  <div onClick={()=>setShow2(true)}>
                     <AddTechModal rand={rand} setRand={setRand} getCourseInfoForDetail={getCourseInfoForDetail} show2={show2} setShow2={setShow2} haveTechs={data.courseTeches && data.courseTeches} />                    
                  </div>
                </div>  

                <div  onClick={()=>setShow(true)} className="mt-2">
                  <Badge color='success'> group :</Badge>   
                  {courseGroup && courseGroup.map((item , index)=>{
                    return(<div key={index}>
                      <CardText>{item.groupName}</CardText>                         
                    </div>)
                  })}
               
                  <div onClick={()=>setShow(true)}>
                  <AddGroupModal getCourseInfoForDetail={getCourseInfoForDetail}  courseGroup={courseGroup} show={show} setShow={setShow} courseId={id}  />                    
                  </div>
                </div>   


              </Col>
            </Row> 




          </CardBody>
        )}
      </Card>


      <Button onClick={()=>navigate(`/UpdateCourse/${id}`)} color='info'>ادیت دوره</Button>
    </>
  );
};

export default FormDetailCourse;
