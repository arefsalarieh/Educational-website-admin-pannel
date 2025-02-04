import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col  } from 'reactstrap'
import DeleteRoleItem from './DeleteRoleItem';
import AddRoleItem from './AddRoleItem';

const ChangeRole = ({roles , refetch2}) => {
    //  console.log(roles);

    const allRoleArr = [
        {
            "id": 1,
            "parentId": null,
            "roleName": "Administrator",
            "roleNumber": 1,
            "roleDescribe": "Administrator"
        },
        {
            "id": 2,
            "parentId": null,
            "roleName": "Teacher",
            "roleNumber": 2,
            "roleDescribe": "Teacher"
        },
        {
            "id": 3,
            "parentId": null,
            "roleName": "Student",
            "roleNumber": 3,
            "roleDescribe": "Student"
        },
        {
            "id": 4,
            "parentId": null,
            "roleName": "CourseAssistance",
            "roleNumber": 4,
            "roleDescribe": "CourseAssistance"
        },
        {
            "id": 5,
            "parentId": null,
            "roleName": "Employee.Admin",
            "roleNumber": 5,
            "roleDescribe": "EmployeeAdmin"
        },
        {
            "id": 6,
            "parentId": 5,
            "roleName": "Employee.Writer",
            "roleNumber": 6,
            "roleDescribe": "Employee.Writer"
        },
        {
            "id": 7,
            "parentId": null,
            "roleName": "Referee",
            "roleNumber": 7,
            "roleDescribe": "Referee For Tounament"
        },
        {
            "id": 8,
            "parentId": null,
            "roleName": "TournamentAdmin",
            "roleNumber": 8,
            "roleDescribe": "Tournament Admin"
        },
        {
            "id": 9,
            "parentId": null,
            "roleName": "TournamentMentor",
            "roleNumber": 9,
            "roleDescribe": "Tournament Mentor"
        }
    ]


    var myRoleArr = [];
    var myRoleId = []
   

    for (let i = 0; i < allRoleArr.length; i++) {
        for (let j = 0; j < roles.length; j++) {
            if (allRoleArr[i].id === roles[j].id ) {
                myRoleArr.push(allRoleArr[i])
            }

        }
        
    }

    for (let i = 0; i < myRoleArr.length; i++) {
        myRoleId.push(myRoleArr[i].id)
        
    }

 const dontRoleArr = allRoleArr.filter((item)=>{
    return(!myRoleId.includes(item.id))
 })
 
 


   

  return (
    <div>
        <Row>
            <Col lg='6' md='6'>
                <h2> حذف دسترسی های کاربر</h2>
                {myRoleArr.map((item , index)=>{
                    return(
                        <DeleteRoleItem refetch2={refetch2} key={index} roleName={item.roleName} roleId={item.id}/>
                    )
                })}
            </Col>

            <Col lg='6' md='6'>
              <h2> افزودن دسترسی  کاربر</h2>
                {dontRoleArr.map((item , index)=>{
                    return(
                        <AddRoleItem refetch2={refetch2} key={index}  roleName={item.roleName} roleId={item.id}/>
                    )
                })}            
            </Col>


        </Row>
    </div>
  )
}

export default ChangeRole