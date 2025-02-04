import React, { useState } from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import http from '../../../@core/interceptor'
import {useQuery} from 'react-query'
import HandleReserve from './HandleReserve';
import AcceptReserveCourseInProfile from './AcceptReserveCourseInProfile';


const ReserveCourseItem = ({ courseName , reserverDate , coursesReseves , refetch2 }) => {

  const navigate = useNavigate()
  const [courseGroup , setCourseGroup] = useState(0)
  const [show, setShow] = useState(false)
  // courseGroup && console.log(courseGroup);


  const goDetail = (id) =>{
      navigate('/DetailCourse/' + id)
  }



 

  const getCourseInfoX = async (courseId) =>{
    let result = await http.get(`/Course/${courseId}`)
    let result2 = await http.get(`CourseGroup/GetCourseGroup?TeacherId=${result.teacherId}&CourseId=${courseId}`)

      setCourseGroup(result2)
      setShow(true)
    // setShow(true)
    // console.log(result2);
  }


  return (
    <>
      {coursesReseves && coursesReseves.map((item , index)=>{
        return(
          item.accept===false && (
              <tr key={index}>
                <td>
                    {/* <div className='align-middle fw-bold'> {courseName}</div> */}
                    <div className='align-middle fw-bold'>{item.courseName} </div>
                </td>

                <td>
                    {/* <div style={{border:'1px solid red' , width:'100px' , overflow:'hidden'}} className='align-middle fw-bold'> {reserverDate}</div> */}
                    <div style={{width:'100px' , overflow:'hidden'}} className='align-middle fw-bold'> {item.reserverDate}</div>
                </td>    

                <td onClick={()=>getCourseInfoX(item.courseId )}>
                    <AcceptReserveCourseInProfile getCourseInfoX={getCourseInfoX} courseId={item.courseId} courseGroup={ courseGroup} studentId={item.studentId}  show={show} setShow={setShow} refetch2={refetch2}/>
                </td>  

                <td>
                    <Button onClick={()=>goDetail(item.courseId)} color='primary'>  جزئیات</Button>
                </td>  



            

            </tr>    
          )
        )
      })}
  
    </>

  )
}

export default ReserveCourseItem