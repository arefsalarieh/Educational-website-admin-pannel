// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label } from 'reactstrap'
import { Formik } from 'formik'
import http from '../../../@core/interceptor'

const MultipleColumnForm = () => {

  const onSubmit = (values) =>{
    console.log(values);
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Multiple Column</CardTitle>
      </CardHeader>

      <CardBody>
        <Formik onSubmit={onSubmit} initialValues={{lName : '' , firstName : '' , gmail : '' , password : '' , phoneNumber : '' , isStudent : true , isTeacher : false}}>
          {({values , handleSubmit, handleChange , setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='lName'>
     
                  </Label>
                  <Input onChange={handleChange} value={values.lName} type='text' name='lName' id='lName' placeholder='نام خانوادگی' />
                </Col>

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='firstName'>
      
                  </Label>
                  <Input onChange={handleChange} value={values.firstName} type='text' name='firstName' id='firstName' placeholder='نام' />
                </Col>

                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='gmail'>
                    
                  </Label>
                  <Input onChange={handleChange} value={values.gmail} type='email' name='gmail' id='gmail' placeholder='ایمیل' />
                </Col> 
                
                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='password'>
                    رمز
                  </Label>
                  <Input onChange={handleChange} value={values.password} type='password' name='password' id='password' placeholder='رمز' />
                </Col>  
                
                <Col md='6' sm='12' className='mb-1'>
                  <Label className='form-label' for='phoneNumber'>
                   
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
    </Card>
  )
}
export default MultipleColumnForm
