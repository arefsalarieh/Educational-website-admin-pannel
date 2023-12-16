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
  const [ThisCourseData, setThisCourseData] = useState()
  const [courseGroup, setCourseGroup] = useState()
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const { id } = useParams();

  ThisCourseData && console.log(ThisCourseData);



  const getCourseInfoForDetail = async () => {
    const result = await http.get(`/Course/${id}`);
    const result2 = await http.get(`/CourseGroup/GetCourseGroup?TeacherId=${result.teacherId}&CourseId=${id}`);
    setData(result)
    setCourseGroup(result2)
    // console.log(result2);

  };



  const getCourseListInDetail =async () =>{
    const result = await http.get(`/Course/CourseList?PageNumber=1&RowsOfPage=1000&SortingCol=DESC&SortType=Expire&Query`);   
    const thisCourse =  result.courseDtos.find((item)=>item.courseId === id)
    setThisCourseData(thisCourse)
  
  }


  const handleDelete = async (x) => {
    const obj = {
      active: ThisCourseData.isdelete === true ? false : true,
      id: id,   
    }

 
    const result = await http.delete(`/Course/DeleteCourse/`, {
      data: obj,
    });
    getCourseInfoForDetail()
    getCourseListInDetail()
      //  console.log(result); 
  };



  const handleActive = async (values) => {
    const courseobjAct = {
      active: data.isActive === true ? false : true,
      id: id,
    };
    const result = await http.put(
      `/Course/ActiveAndDeactiveCourse`,
      courseobjAct
    );
    getCourseInfoForDetail()
    return result;
  };



  useEffect(() => {
    getCourseInfoForDetail()
    getCourseListInDetail()
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
                <Badge color='info'>  title دوره:</Badge>
                  
                  <CardText>{data.title}</CardText>
                </div>
                
                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>  teacherName :</Badge>
                  <CardText>{data.teacherName}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>  courseId :</Badge>
                  <CardText>{data.courseId}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>  شروع دوره: :</Badge>                  
                  <CardText>{data.startTime}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>  پایان دوره:</Badge>  
                  <CardText>{data.endTime}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>  تاریخ ثبت دوره  :</Badge>  
                  <CardText>{data.insertDate}</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>  قیمت  دوره  :</Badge>  
                  <CardText>{data.cost} تومان</CardText>
                </div>

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>   وضعیت حذف :</Badge>  
                  <div>
                    <Button onClick={()=>handleDelete(ThisCourseData.isdelete)} color={ThisCourseData.isdelete === false ? "success" : 'danger'}>{ThisCourseData.isdelete === false ? "سالمه" : "حذف شده"}</Button>                    
                  </div>
                </div>  

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>    وضعیت فعال بودن  :</Badge>  
                  <div>
                    <Button onClick={handleActive} color={data.isActive === true ? "success" : 'danger'}>{data.isActive === true ? "فعاله" : "غیرفعاله"}</Button>                    
                  </div>
                </div>                

                <div className="mt-2" style={{fontSize:'20px'}}>
                  <Badge color='info'>  توضیحات    :</Badge>                    
                  <CardText>{data.describe}</CardText>
                </div> 

                <div className="mt-2" style={{fontSize:'16px'}}>
                  <Badge color='info'>  courseCommentTotal    :</Badge>     
                  <CardText>{data.courseCommentTotal}</CardText>

                  <div onClick={()=>setShow3(true)}>
                  <CommentModal   show3={show3} setShow3={setShow3} courseId={id}  />                    
                  </div>
                </div>

                

                            
              </Col>

              <Col lg='6'>
                <div className="mt-2">
                  <Badge color='info'>   سطح دوره     :</Badge>    
                  <CardText>{data.courseLevelName}</CardText>
                </div>

                <div className="mt-2">
                  <Badge color='info'>   وضعیت دوره     :</Badge>    
                  <CardText>{data.courseStatusName}</CardText>
                </div>

                <div className="mt-2">
                  <Badge color='info'>   نوع کلاس :</Badge>                    
                  <CardText>{data.courseTypeName}</CardText>
                </div>

                <div className="mt-2">
                  <Badge color='info'>   شماره کلاس :</Badge>  
                  <CardText>{data.courseClassRoomName}</CardText>
                </div>

                <div className="mt-2">
                  <Badge color='info'>  تکنولوژی های آموزش :</Badge>  
                  {data.courseTeches.map((item , index)=>{
                    return(
                      <div key={index}>{index+1 + '-'}{item}</div>
                    )
                  })}                    
                  <div onClick={()=>setShow2(true)}>
                     <AddTechModal rand={rand} setRand={setRand} getCourseInfoForDetail={getCourseInfoForDetail} show2={show2} setShow2={setShow2} haveTechs={data.courseTeches && data.courseTeches} />                    
                  </div>
                </div>  

                <div  onClick={()=>setShow(true)} className="mt-2">
                  <Badge color='info'> group :</Badge>   
                  {courseGroup && courseGroup.map((item , index)=>{
                    return(<div key={index}>
                      <CardText>{index+1 + '-'}{item.groupName}</CardText>                         
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


      <Button onClick={()=>navigate(`/UpdateCourse/${id}`)} color='warning'>ادیت دوره</Button>
    </>
  );
};

export default FormDetailCourse;
