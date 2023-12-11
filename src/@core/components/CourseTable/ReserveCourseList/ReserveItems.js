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
import { Button } from 'reactstrap'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import ShareProjectExample from "./ShareProject";
import { Row, Col } from 'reactstrap'



const ReserveItem = ({courseName , studentName , studentId , reserverDate , accept , courseId}) => {
  const navigate = useNavigate();
  const [courseGroup , setCourseGroup] = useState(0)
  const [show, setShow] = useState(false)



  const getCourseInfo = async (courseId) =>{
    let result = await http.get(`/Course/${courseId}`)
    let result2 = await http.get(`CourseGroup/GetCourseGroup?TeacherId=${result.teacherId}&CourseId=${courseId}`)

    setCourseGroup(result2)
    setTimeout(setShow(true) , 1000)
  }




 




  
  return (
        
        <tr>
          <td className="text-nowrap ">{courseName}</td>
          <td className="text-nowrap ">{studentName}</td>
          <td className="text-nowrap ">{studentId}</td>
          <td className="text-nowrap ">{reserverDate}</td>
          <td className="text-nowrap ">{accept === true ? 'قبول شده' : "در انتظار تایید"}</td>
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
            <ShareProjectExample courseId={courseId} courseGroup={ courseGroup} studentId={studentId} show={show} setShow={setShow}/>
          </td>        
        </tr>
      
  )
}

export default ReserveItem