import React, { useState , useEffect } from "react";
import { Edit, MoreVertical, Trash } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import http from "../../../interceptor";
import { useQuery } from "react-query";
import { useFormikContext } from "formik";
import { Button  } from 'reactstrap'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import ShareProjectExample from "./ShareProject";
import { Row, Col } from 'reactstrap'



const ReserveItem = ({courseName , studentName , studentId , reserverDate , accept , courseId , refetch}) => {
  const navigate = useNavigate();
  const [courseGroup , setCourseGroup] = useState(0)
  const [show, setShow] = useState(false)
  // courseGroup && console.log(setCourseGroup);


  const getCourseInfo = async (courseId) =>{
    let result = await http.get(`/Course/${courseId}`)
    let result2 = await http.get(`CourseGroup/GetCourseGroup?TeacherId=${result.teacherId}&CourseId=${courseId}`)
    //  console.log(result2);
     setCourseGroup(result2)
    setShow(true)
    console.log(result2);
  }




 




  
  return (
        
        <tr>
          <td className="text-nowrap ">
            <Button className="text-nowrap"onClick={() => {navigate("/DetailCourse/" + courseId);}}>{courseName}</Button>  
          </td>
          <td className="text-nowrap ">
            <div onClick={() => {navigate("/pages/profile/" + studentId);}} style={{overflow:'hidden' , width:'150px'}}>
              <Button>{studentName}</Button>
            </div>
          </td>
          <td className="text-nowrap ">{studentId}</td>
          <td className="text-nowrap ">{reserverDate}</td>
          <td className="text-nowrap ">
            {accept === true ?<Badge color='success'>تایید شده</Badge> : <Badge color='danger'>در انتظار تایید </Badge> }
          
          </td>
          <td>
                <Button
                  pill
                  color="primary"
                  className="me-1"
                  onClick={() => {
                    navigate("/DetailCourse/" + courseId);
                  }}
                >
                  جزییات
                </Button>
          </td>



          <td onClick={() => getCourseInfo(courseId)}>
            <ShareProjectExample getCourseInfo={getCourseInfo} courseId={courseId} courseGroup={ courseGroup} studentId={studentId} show={show} setShow={setShow} refetch={refetch}/>
          </td>        
        </tr>
      
  )
}

export default ReserveItem