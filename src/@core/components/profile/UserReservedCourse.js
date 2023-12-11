import React from 'react'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import ReserveCourseItem from './ReserveCourseItem'

const UserReservedCourse = ({coursesReseves , userId}) => {



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
            {coursesReseves && (
                coursesReseves?.map((item , index) =>{
                            return(
                            item.accept === false && <ReserveCourseItem key={index}  courseName={item.courseName} reserverDate={item.reserverDate} />         
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