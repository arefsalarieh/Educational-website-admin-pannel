import React from 'react'
import { Formik,Form } from "formik";
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Button,
    // Form,
    Label,
    Input,
    FormFeedback,
    Row,
    Col,
  
  } from "reactstrap";
import http from '../../../@core/interceptor'

const AddGroup = ({courseId}) => {



    const setGroupFunc =async (values) =>{
        const data = new FormData()

        const setGrouoObj = {
            GroupName : values.GroupName,
            courseId : courseId,
            GroupCapacity : values.GroupCapacity
        }

        const keys = Object.keys(setGrouoObj)

        keys.forEach((key)=>{
          const item = setGrouoObj[key]
          data.append(key , item)
          //console.log(data);
        })

        const result =await http.post("/CourseGroup" , data)
     
        console.log(result);
    }

  return (
    <div>
        <Formik onSubmit={setGroupFunc} initialValues={{GroupName : '' , GroupCapacity : null}}>
        {({ values, handleSubmit, handleChange , setFieldValue}) =>(
            <form  onSubmit={handleSubmit}>

            <Card>
                <CardBody>
                <Row>

                    <Col lg='12'>
                        <Label className='form-label' for='GroupName'>GroupName</Label>
                        <Input onChange={handleChange} value={values.GroupName} type='text' name='GroupName' id='GroupName' placeholder='GroupName' />
                    </Col>

                    <Col lg='12'>
                        <Label className='form-label' for='GroupCapacity'>GroupCapacity</Label>
                        <Input onChange={handleChange} value={values.GroupCapacity} type='text' name='GroupCapacity' id='GroupCapacity' placeholder='GroupCapacity ' />
                    </Col>
                                                 

                </Row>

                
                <div className="d-flex"  >
                    <Button className="me-1" color="primary" type="submit" >
                    اضافه کردن
                    </Button>

                </div>
                </CardBody>
            </Card>
            </form>
        )}
        </Formik>
    </div>
  )
}

export default AddGroup