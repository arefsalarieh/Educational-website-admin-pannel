import React from 'react'
import { useParams } from "react-router-dom";
import http from '../../interceptor'
import {useQuery} from 'react-query'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { Formik } from 'formik'
import UpdadeUsreRoles from './UpdadeUsreRoles';



const UpdadeUsre = () => {
    const {id} = useParams();

    const getUsersProf =async () =>{
        const result = await http.get(`/User/UserDetails/${id}`)
        return result;
      }
    
      const {data , status} = useQuery(['userProf' , id] , getUsersProf )

      // data && console.log(data);


const show =async (values) =>{
  //  const result =await http.put('/User/UpdateUser' , values)
    values.courses = [...values.courses]
    console.log(values)
}

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>بروز رسانی کاربر </CardTitle>
      </CardHeader>

      {data &&       <CardBody>
        <Formik onSubmit={show} initialValues={{id:data.id , fName : data.fName , lName : data.lName , userName : data.userName , gmail : data.gmail ,
           phoneNumber : data.phoneNumber , active : data.active , isDelete : data.isDelete , isTecher : data.isTecher , isStudent : data.isStudent , 
           recoveryEmail : data.recoveryEmail , twoStepAuth : data.twoStepAuth , userAbout : data.userAbout , currentPictureAddress : data.currentPictureAddress ,
           linkdinProfile : data.linkdinProfile , telegramLink : data.telegramLink , receiveMessageEvent : data.receiveMessageEvent , homeAdderess:data.homeAdderess,
           nationalCode : data.nationalCode , gender:data.gender , latitude : data.latitude , longitude : data.longitude , insertDate:data.insertDate ,
           birthDay :data.birthDay , roles : data.roles , courses : data.courses , coursesReseves:data.coursesReseves , userProfileId:data.id}}>

          {({values , handleSubmit, handleChange , setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Row>

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='fName'>
                      fname
                  </Label>
                  <Input onChange={handleChange} value={values.fName} type='text' name='fName' id='fName' />
                </Col>

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='lName'>
                      lname
                  </Label>
                  <Input onChange={handleChange} value={values.lName} type='text' name='lName' id='lName'  />
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
                  <Input onChange={handleChange} value={values.gmail} type='email' name='gmail' id='gmail'  />
                </Col> 
                

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='phoneNumber'>
                  phoneNumber
                  </Label>
                  <Input onChange={handleChange} value={values.phoneNumber} type='text' name='phoneNumber' id='phoneNumber'  />
                </Col>   
                
                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='recoveryEmail'>
                  recoveryEmail
                  </Label>
                  <Input onChange={handleChange} value={values.recoveryEmail} type='text' name='recoveryEmail' id='recoveryEmail'  />
                </Col>  

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='linkdinProfile'>
                  linkdinProfile
                  </Label>
                  <Input onChange={handleChange} value={values.linkdinProfile} type='text' name='linkdinProfile' id='linkdinProfile' />
                </Col>  

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='telegramLink'>
                  telegramLink
                  </Label>
                  <Input onChange={handleChange} value={values.telegramLink} type='text' name='telegramLink' id='telegramLink' />
                </Col>                  
                                                   
                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='nationalCode'>
                  nationalCode
                  </Label>
                  <Input onChange={handleChange} value={values.nationalCode} type='text' name='nationalCode' id='nationalCode' />
                </Col>  

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='userProfileId'>
                  userProfileId
                  </Label>
                  <Input onChange={handleChange} value={values.userProfileId} type='text' name='userProfileId' id='userProfileId' />
                </Col> 
                
                <Col md='6' sm='12' className='mb-1'>
                  <div className='form-floating mt-2'>
                    <Input onChange={handleChange} value={values.userAbout} type='textarea'  name='userAbout' id='userAbout' placeholder='Floating Label' style={{ minHeight: '100px' }}
                    />
                    <Label className='form-label' for='userAbout'>
                        userAbout
                    </Label>
                  </div>
                </Col>  
                
                <Col md='6' sm='12' className='mb-1'>
                  <div className='form-floating mt-2'>
                    <Input onChange={handleChange} value={values.homeAdderess} type='textarea'  name='homeAdderess' id='homeAdderess' placeholder='Floating Label' style={{ minHeight: '100px' }}
                    />
                    <Label className='form-label' for='homeAdderess'>
                        homeAdderess
                    </Label>
                  </div>
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
                
                <Col md='2' sm='12' className='mb-1'>
                  <Label className='form-label' for='receiveMessageEvent'>
                  receiveMessageEvent
                  </Label>
                  <Input onChange={handleChange} value={values.receiveMessageEvent} type='checkbox' defaultChecked id='receiveMessageEvent' />
                </Col>  
                
                <Col md='3' sm='12' className='mb-1'>
                  <Label className='form-label' >
                      gender
                  </Label>

                  <label className='inline text-center lg:text-right lg:pr-4' htmlFor='man'>  مرد </label>
                  <Input onChange={handleChange} name='gender' value='true' type='radio'  id='man' />

                  <label className='inline text-center lg:text-right lg:pr-4' htmlFor='woman'>  زن </label>
                  <Input onChange={handleChange} name='gender' value='false' type='radio'  id='woman' />                  
                </Col>                                                             
                         
              </Row>

              <Row>

                <Col md='3'>
                  <UpdadeUsreRoles roles={data.roles}/>
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