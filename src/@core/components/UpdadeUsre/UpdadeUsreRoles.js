import React from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { Formik } from 'formik'

const UpdadeUsreRoles = ({rolesList , setRolesList}) => {

    // rolesList && console.log(rolesList);

    const handleClick = (x) =>{
       const newRolesList = rolesList.filter(item => item.id !=x)
       setRolesList(newRolesList)
    }
    
  return (
    <div style={{ marginTop:'20px' , border:'1px solid #ccc'}}>
        <h2>دسترسی های کاربر</h2>
        {rolesList.map((item , index)=>{
            return(
                <div key={index} id={item.id} roleParentName={item.roleParentName}
                 style={{margin:'5px' , backgroundColor:'#ccc ' , width:'80%' , display:'flex' , color:'black'}}>
                    <div>
                         {item.roleName}                        
                    </div>
                
                    <Button.Ripple onClick={()=>handleClick(item.id)} color='danger' outline style={{marginRight:'auto'}}>
                        Delete
                    </Button.Ripple>
                </div>
            )
        })}
    </div>
  )
}

export default UpdadeUsreRoles