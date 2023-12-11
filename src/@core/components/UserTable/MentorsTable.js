import React from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import UserItem from './UserItem'
import {useQuery} from 'react-query'
import http from '../../../@core/interceptor'
import { Row, Col } from 'reactstrap'
import StatsVertical from '../StatsVertical/StatsVertical'
import Earnings from '../Earnings/Earnings'
import MyNavbar from './MyNavbar'


const MentorsTable = () => {

    const getMentors =async () =>{
        const result = await http.get("/User/UserMannage?PageNumber=1&RowsOfPage=100&SortingCol=DESC&SortType=InsertDate&Query=&IsActiveUser=true&IsDeletedUser=true&roleId=9")
        return result
    }

    const {data , Status} = useQuery('getMentor' , getMentors)

    var completeProfile = 0;

    for(let i=0 ; i<data?.listUser.length ; i++){
    // console.log(data.listUser[i].profileCompletionPercentage);
         completeProfile = completeProfile + Number(data.listUser[i].profileCompletionPercentage);
    }

    var Percent = Math.round(completeProfile/data?.listUser.length) 

    var mens = data?.listUser.filter((item)=>{
        return item.gender === true;
    })

    const mensCount =(mens && mens.length/data.listUser.length)*100;
    const wemenCount = (mens && (data.listUser.length - mens.length)/data.listUser.length)*100;




  return (
    <div>
    <Row>
    <MyNavbar/>
        {/* <Col xl='3' md='4' sm='6'>
        <StatsVertical stats={data && Percent} statTitle='درصد تکمیل اطلاعات منتورها '/>
        </Col>
        <Col lg='4' md='6' xs='12'>
            {data && <Earnings all={ data?.listUser.length} mensCount={mensCount} wemenCount={wemenCount}/>}
        </Col> */}
                
    </Row>


    <Table responsive>
        <thead>
        <tr>
            <th>نام</th>
            <th>نوع کاربر</th>
            <th> id</th>
            <th>جنسیت</th>
            <th>درصد تکمیل اطلاعات</th>
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
</div>
  )
}

export default MentorsTable