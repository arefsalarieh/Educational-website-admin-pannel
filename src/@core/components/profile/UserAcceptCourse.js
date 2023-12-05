import React from 'react'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import ReserveCourseItem from './ReserveCourseItem'
import AcceptCourseItem from './AcceptCourseItem'

const UserAcceptCourse = ({courses}) => {
    
  return (
<div>
    <h2>دوره های  کاربر</h2>
    <Table responsive>
        <thead>
            <tr>
                <th>نام دوره</th>
                <th>آخرین آپدیت :</th>
                <th>مشاهده جزئیات دوره</th>
                                  
            </tr>


        </thead>
        <tbody>
        {courses && (
            courses?.map((item , index) =>{
                        return(
                        <AcceptCourseItem key={index} id={item.courseId} title={item.title}  lastUpdate={item.lastUpdate} />         
                    )
                })         
            )
            } 





        </tbody>
    </Table> 
</div>
  )
}

export default UserAcceptCourse