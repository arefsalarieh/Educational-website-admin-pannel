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
           phoneNumber : data.phoneNumber , active : data.active , isDelete : data.isDelete , isTecher : data.isTecher , isStudent : data.isStudent , 
           recoveryEmail : data.recoveryEmail , twoStepAuth : data.twoStepAuth , userAbout : data.userAbout , currentPictureAddress : data.currentPictureAddress ,
           linkdinProfile : data.linkdinProfile , telegramLink : data.telegramLink , receiveMessageEvent : data.receiveMessageEvent , homeAdderess:data.homeAdderess,
           nationalCode : data.nationalCode , gender:data.gender , latitude : data.latitude , longitude : data.longitude , insertDate:data.insertDate ,
           birthDay :data.birthDay , roles : data.roles , courses : data.courses , coursesReseves:data.coursesReseves , userProfileId:data.id}}>

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

              </Row>


              <Row>
                
                <Col md='1' sm='12' className='mb-1'>
                  <Label className='form-label' for='active'>
                     فعال
                  </Label>
                  <Input onChange={handleChange} value={values.active} type='checkbox' defaultChecked id='active' />
                </Col>  

                <Col md='1' sm='12' className='mb-1'>
                  <Label className='form-label' for='isDelete'>
                  isDelete
                  </Label>
                  <Input onChange={handleChange} value={values.isDelete} type='checkbox' id='isDelete' />
                </Col>  

                <Col md='1' sm='12' className='mb-1'>
                  <Label className='form-label' for='isTecher'>
                     مدرس
                  </Label>
                  <Input onChange={handleChange} value={values.isTecher} type='checkbox'  id='isTecher' />
                </Col>    


                <Col md='1' sm='12' className='mb-1'>
                  <Label className='form-label' for='isStudent'>
                    دانش آموز
                  </Label>
                  <Input onChange={handleChange} value={values.isStudent} type='checkbox' defaultChecked id='isStudent' />
                </Col>   
                
                <Col md='2' sm='12' className='mb-1'>
                  <Label className='form-label' for='twoStepAuth'>
                  twoStepAuth
                  </Label>
                  <Input onChange={handleChange} value={values.twoStepAuth} type='checkbox' defaultChecked id='twoStepAuth' />
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