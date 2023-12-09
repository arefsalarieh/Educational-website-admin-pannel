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




const ReserveItem = ({courseName , studentName , studentId , reserverDate , accept , courseId}) => {
  const navigate = useNavigate();
  const [courseInfo , setCourseInfo] = useState()
  const [courseGroup , setCourseGroup] = useState()
  const [rand , setRand] = useState(1)


  const getCourseInfo = async (courseId) =>{
    let result = await http.get(`/Course/${courseId}`)
    setCourseInfo(result)
    setTimeout(()=>{setRand(2)},1000) 
  }


  const getCourseGroup = async () =>{
    let result = await http.get(`CourseGroup/GetCourseGroup?TeacherId=${courseInfo.teacherId}&CourseId=${courseId}`)
    result && setCourseGroup(result)
    result && console.log(result);

    
  }


  useEffect(()=>{
     rand !==1 &&  getCourseGroup()
  } , [rand])




  
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

          <td>
            <Button onClick={() => {getCourseInfo(courseId)}} pill color="primary" className="me-1">تایید رزرو</Button>
          </td>
        </tr>
      
  )
}

export default ReserveItem