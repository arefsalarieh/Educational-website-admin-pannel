import React from 'react'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import ReserveCourseItem from './ReserveCourseItem'

const UserReservedCourse = ({refetch2 , coursesReseves , userId}) => {



  return (
    
    <div>
        <h2>دوره های رزرو شده</h2>
        <Table responsive>
            <thead>
                <tr>
                    <th>نام دوره</th>
                    <th>زمان رزرو دوره</th>
                    <th>مشاهده جزئیات دوره</th>
                                    
                </tr>


            </thead>
            <tbody>
            {coursesReseves && ( <ReserveCourseItem refetch2={refetch2} coursesReseves={coursesReseves} />)} 





            </tbody>
        </Table> 
    </div>
  )
}

export default UserReservedCourse