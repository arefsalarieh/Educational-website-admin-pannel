import React from 'react'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import CourseItem from './CourseItem'

const UserReservedCourse = ({coursesReseves}) => {
   
  return (
    
    <div>
        <h2>دوره های رزرو شده</h2>
        <Table responsive>
            <thead>
                <tr>
                    <th>نام دوره</th>
                    <th>مشاهده جزئیات دوره</th>
                    <th>قبول / رد </th>                    
                </tr>


            </thead>
            <tbody>
            {coursesReseves && (
                coursesReseves?.map((item , index) =>{
                            return(
                            <CourseItem key={index} id={item.courseId} courseName={item.courseName}   />         
                        )
                    })         
                )
                } 





            </tbody>
        </Table> 
    </div>
  )
}

export default UserReservedCourse