import React from 'react'
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col  } from 'reactstrap'

const ChangeRole = ({roles}) => {
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


    const allRoleTitle = [];
    const allRoleNum = [];


    for (let i = 0; i < allRoleArr.length; i++) {
        // console.log(allRoleArr[i].roleName);
        allRoleTitle.push(allRoleArr[i].roleName)
        allRoleNum.push(allRoleArr[i].roleNumber)
    }


    const myRoleTitle = [];
    const myRoleNum = [];

    for (let i = 0; i < roles.length; i++) {
        // console.log(roles[i].roleName);
        myRoleTitle.push(roles[i].roleName)
        myRoleNum.push(roles[i].id) 
    }

    const dontRoleTitle = allRoleTitle.filter((item)=>{
        return(
            !myRoleTitle.includes(item)
        )
    })

    const dontRoleNum = allRoleNum.filter((item)=>{
        return(
            !myRoleNum.includes(item)
        )
    })    

    console.log(dontRoleTitle);
    console.log(dontRoleNum);



   

  return (
    <div>
        <Row>
            <Col lg='3' md='6'>
                <h2>دسترسی های کاربر</h2>
                {roles.map((item , index)=>{
                    return(
                        <div key={index}>{item.roleName}</div>
                    )
                })}
            </Col>
        </Row>
    </div>
  )
}

export default ChangeRole