import React from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import UserItem from './UserItem'
import {useQuery} from 'react-query'
import http from '../../../@core/interceptor'


const StudentTable = () => {

    const getStudents =async () =>{
        const result = await http.get("/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=3")
        return result
      }
    
      const {data , Status} = useQuery('getStudent' , getStudents)

      data && console.log(data.listUser);


  return (
    <Table responsive>
        <thead>
        <tr>
            <th>نام</th>
            <th>نوع کاربر</th>
            <th>جنسیت</th>
            <th>درصد تلمیل اطلاعات</th>
            <th>ایمیل</th>              
            <th>شماره تماس</th>
        </tr>
        </thead>
        <tbody>
        {data && (
            data.listUser?.map((item , index) =>{
                        return(
                        <UserItem key={index} id={item.id}  fName={item.fname} lNmae={item.lname} role='دانش جو' gender={item.gender}
                        profileCompletionPercentage={item.profileCompletionPercentage} gmail={item.gmail} phoneNumber={item.phoneNumber}/>         
                    )
                })         
            )
            } 





        </tbody>
    </Table>
  )
}

export default StudentTable