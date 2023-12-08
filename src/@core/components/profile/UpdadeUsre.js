import React from 'react'
import { useParams } from "react-router-dom";
import http from '../../../@core/interceptor'
import {useQuery} from 'react-query'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { Formik } from 'formik'


const UpdadeUsre = () => {
    const {id} = useParams();

    const getUsersProf =async () =>{
        const result = await http.get(`/User/UserDetails/${id}`)
        return result;
      }
    
      const {data , status} = useQuery(['userProf' , id] , getUsersProf )

      // data && console.log(data);


const show = (values) =>{
  console.log(values);
}

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>بروز رسانی کاربر </CardTitle>
      </CardHeader>

      {data &&       <CardBody>
        <Formik onSubmit={show} initialValues={{firstName : data.fName , lastName : data.lName , userName : data.userName , gmail : data.gmail ,
           phoneNumber : data.phoneNumber , isStudent : true , isTeacher : false}}>

          {({values , handleSubmit, handleChange , setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Row>

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='firstName'>
                      fname
                  </Label>
                  <Input onChange={handleChange} value={values.firstName} type='text' name='firstName' id='firstName' placeholder={data.fName}/>
                </Col>

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='lastName'>
                      lname
                  </Label>
                  <Input onChange={handleChange} value={values.lastName} type='text' name='lastName' id='lastName' placeholder='نام خانوادگی' />
                </Col>

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='userName'>
                    userName
                  </Label>
                  <Input onChange={handleChange} value={values.userName} type='text' name='userName' id='userName' />
                </Col>                

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='gmail'>
                  gmail
                  </Label>
                  <Input onChange={handleChange} value={values.gmail} type='email' name='gmail' id='gmail' placeholder='ایمیل' />
                </Col> 
                

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='phoneNumber'>
                  phoneNumber
                  </Label>
                  <Input onChange={handleChange} value={values.phoneNumber} type='text' name='phoneNumber' id='phoneNumber' placeholder='شماره تماس' />
                </Col>







                

                <Col md='3' sm='12' className='mb-1'>
                  <Label className='form-label' for='isStudent'>
                    دانش آموز
                  </Label>
                  <Input onChange={handleChange} value={values.isStudent} type='checkbox' defaultChecked id='isStudent' />
                </Col>   
                
                <Col md='3' sm='12' className='mb-1'>
                  <Label className='form-label' for='isTeacher'>
                     مدرس
                  </Label>
                  <Input onChange={handleChange} value={values.isTeacher} type='checkbox'  id='isTeacher' />
                </Col>                              
                                              

              </Row>

                <Button className='me-1' color='primary' type='submit' >
                  Submit
                </Button>

            </form>             
          )}
         
        </Formik>

      </CardBody>
      }

    </Card>
  )
}

export default UpdadeUsre