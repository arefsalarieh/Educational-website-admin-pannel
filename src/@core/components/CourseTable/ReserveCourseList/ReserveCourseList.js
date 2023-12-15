import React from 'react'
import MyNavbar from '../MyNavbar'
import ReserveCourseItem from '../../profile/ReserveCourseItem'
import ReserveItem from './ReserveItems'
import { Table, } from "reactstrap";
import http from '../../../../@core/interceptor'
import { useQuery } from "react-query";



const ReserveCourselist = () => {


const getReserveCourse =async () =>{
    const result = await http.get("/CourseReserve")
    return result
}

const {data , status , refetch} = useQuery('getReserve' , getReserveCourse)

// data && console.log(data);



  return (
    <div>
        <MyNavbar/>

        <h2>
            لیست رزرو :
        </h2>
        <Table responsive>
            <thead>
                <tr>
                    <th className="text-nowrap ">نام دوره</th>
                    <th className="text-nowrap ">نام دانشجو </th>
                    {/* <th  className='text-nowrap '>سطح دوره</th> */}
                    {/* <th  className='text-nowrap '>وضعیت دوره</th> */}
                    <th className="text-nowrap "> آیدی دانشجو</th>
                    <th className="text-nowrap ">زمان رزرو</th>
                    <th className="text-nowrap ">وضعیت</th>
                </tr>

                
            </thead>
            <tbody>
                {data && data.map((item , index)=>{
                    return(
                        
                        <ReserveItem courseName={item.courseName}   studentName={item.studentName}  studentId={item.studentId} 
                        reserverDate={item.reserverDate}  accept={item.accept}  courseId={item.courseId} refetch={refetch}/>                            
                    )
                })}
       
            </tbody>

        </Table>

    </div>
  )
}

export default ReserveCourselist