// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Third Party Components
import * as yup from "yup";
import toast from "react-hot-toast";
import { Check } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
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
import { useQuery } from "react-query";
import http from "../../interceptor";
import { Formik,Form } from "formik";
import SelectOptions from "./SelectOptions";
import Select from 'react-select'
import { selectThemeColors } from '@utils'

const FormCreatCourse = () => {
  const [courseType, setCourseType] = useState();
  const [courseTerm, setCourseTerm] = useState();
  const [courseRoom, setCourseRoom] = useState();
  const [courseLevel, setCourseLevel] = useState();
  const [courseTeacher, setCourseTeacher] = useState();  
  // courseTeacher && console.log(courseTeacher);

  const getCreateFunc =async () =>{
    const result = await http.get("/Course/GetCreate")
    setCourseType(result.courseTypeDtos)
    setCourseTerm(result.termDtos)
    setCourseRoom(result.classRoomDtos)
    setCourseLevel(result.courseLevelDtos)
    setCourseTeacher(result.teachers)


  }


  // const {data , status} = useQuery('getCreate' , getCreateFunc)

  useEffect(() => {
    getCreateFunc()
  },[]);


// course type
const newCourseTypeDtos = []

 for (let i = 0; i < courseType?.length; i++) {
    var newObj ={
      value : courseType[i].id,
      label : courseType[i].typeName
    }
    newCourseTypeDtos.push(newObj)
}


const newTermDtos = [];

 for (let i = 0; i < courseTerm?.length; i++) {
    var newObj ={
      value : courseTerm[i].id,
      label : courseTerm[i].termName
    }
    newTermDtos.push(newObj)
}


const newClassRoomDtos = [];

 for (let i = 0; i < courseRoom?.length; i++) {
    var newObj ={
      value : courseRoom[i].id,
      label : courseRoom[i].classRoomName
    }
    newClassRoomDtos.push(newObj)
}


const newCourseLevelDtos = [];

 for (let i = 0; i < courseLevel?.length; i++) {
    var newObj ={
      value : courseLevel[i].id,
      label : courseLevel[i].levelName
    }
    newCourseLevelDtos.push(newObj)   
}


const newTeachers = [];

 for (let i = 0; i < courseTeacher?.length; i++) {
    var newObj ={
      value : courseTeacher[i].userId,
      label : courseTeacher[i].fullName
    }
    newTeachers.push(newObj)
    
    console.log(newTeachers);
}


 






  const teachers = [
    { value: 1, label: '09301826338' },
    { value: 2, label: '09394510553' },
    { value: 6, label: '09118586373' },
    { value: 9, label: '09229167194' },
    { value: 10, label: '09909123183' },
    { value: 11, label: '09382045502' },
    { value: 12, label: '09030441438' },
    { value: 16, label: '09117941582' },
  ]

  








  const show =async (values) =>{
    const data = new FormData();

    const keys = Object.keys(values)
    keys.forEach((key)=>{
      const item = values[key]
      data.append(key , item)
      //console.log(data);
    })

    const result = await http.post("/Course" , data)
    console.log(result);
  }
  

  
    return (
      <div>
        <h2>دوره جدید </h2>
        <Formik
                initialValues={{
                  Title: "",
                  Describe: "",
                  MiniDescribe: "",
                  Capacity: "",
                  CourseTypeId: null,
                  SessionNumber: "",
                  CurrentCoursePaymentNumber: "",
                  TremId: "",
                  ClassId: "",
                  CourseLvlId: "",
                  TeacherId: "",
                  Cost: "",
                  UniqeUrlString: Math.random(),
                  Image: "",
                  StartTime: "2645-01-31T00:00:00",
                  EndTime: "2645-05-10T00:00:00",
                  GoogleSchema: "",
                  GoogleTitle: "",
                  CoursePrerequisiteId:'',
                  ShortLink: "",
                  TumbImageAddress: "",
                  ImageAddress: "",   
                }}
                onSubmit={show}
              >
                {({ values, handleSubmit, handleChange , setFieldValue}) => (
                  <form onSubmit={handleSubmit}>
                    <Card>

                      <CardBody>
                        <Row>

                          <Col lg='6'>
                            <Label className='form-label' for='Title'>Title</Label>
                            <Input onChange={handleChange} value={values.Title} type='text' name='Title' id='Title' placeholder='Title' />
                          </Col>

                          <Col lg='6'>
                            <Label className='form-label' for='Describe'>Describe</Label>
                            <Input onChange={handleChange} value={values.Describe} type='text' name='Describe' id='Describe' placeholder='Describe ' />
                          </Col>

                          <Col lg='6'>
                            <Label className='form-label' for='MiniDescribe'>MiniDescribe</Label>
                            <Input onChange={handleChange} value={values.MiniDescribe} type='text' name='MiniDescribe' id='MiniDescribe' placeholder='MiniDescribe ' />
                          </Col>

                          <Col lg='6'>
                            <Label className='form-label' for='Capacity'>Capacity</Label>
                            <Input onChange={handleChange} value={values.Capacity} type='text' name='Capacity' id='Capacity' placeholder='Capacity' />
                          </Col>


                          
                          <Col lg='6'  >
                            <Label className='form-label' for='CourseTypeId'>CourseTypeId</Label>
                            <Select
                              id='CourseTypeId'
                              name='CourseTypeId' 
                              className='react-select'
                              classNamePrefix='select'
                              options={newCourseTypeDtos && newCourseTypeDtos}
                              isClearable={false}
                              onChange={(value)=>{setFieldValue('CourseTypeId',value.value)}}
                            />
                          </Col>



                          <Col lg='6'>
                            <Label className='form-label' for='SessionNumber'>SessionNumber</Label>
                            <Input onChange={handleChange} value={values.SessionNumber} type='text' name='SessionNumber' id='SessionNumber' placeholder='SessionNumber' />
                          </Col>

                          <Col lg='6'>
                            <Label className='form-label' for='CurrentCoursePaymentNumber'>CurrentCoursePaymentNumber</Label>
                            <Input onChange={handleChange} value={values.CurrentCoursePaymentNumber} type='text' name='CurrentCoursePaymentNumber' id='CurrentCoursePaymentNumber' placeholder='CurrentCoursePaymentNumber' />
                          </Col>

                          <Col lg='6'  >
                            <Label className='form-label' for='TremId'>TremId</Label>
                            <Select
                              id='TremId'
                              name='TremId'
                              className='react-select'
                              classNamePrefix='select'
                              options={newTermDtos && newTermDtos}
                              isClearable={false}
                              onChange={(value)=>{setFieldValue('TremId',value.value)}}
                            />
                          </Col>

                          <Col lg='6'  >
                            <Label className='form-label' for='ClassId'>ClassId</Label>
                            <Select
                              id='ClassId'
                              name='ClassId'
                              className='react-select'
                              classNamePrefix='select'
                              options={newClassRoomDtos && newClassRoomDtos}
                              isClearable={false}
                              onChange={(value)=>{setFieldValue('ClassId',value.value)}}
                            />                         
                          </Col>


                          <Col lg='6'  >
                            <Label className='form-label' for='ClassId'>CourseLvlId</Label>
                            <Select
                              id='CourseLvlId'
                              name='CourseLvlId'
                              className='react-select'
                              classNamePrefix='select'
                              options={newCourseLevelDtos && newCourseLevelDtos}
                              isClearable={false}
                              onChange={(value)=>{setFieldValue('CourseLvlId',value.value)}}
                            />                                                          
                          </Col>


                          <Col lg='6'  >
                            <Label className='form-label' for='TeacherId'>TeacherId</Label>
                            <Select
                              id='TeacherId'
                              name='TeacherId'                              
                              className='react-select'
                              classNamePrefix='select'
                             
                              options={newTeachers && newTeachers}
                              isClearable={false}
                              onChange={(value)=>{setFieldValue('TeacherId',value.value)}}
                            />
                          </Col>

                          <Col lg='6' >
                            <Label className='form-label' for='CurrentCoursePaymentNumber'>Cost</Label>
                            <Input onChange={handleChange} value={values.Cost} type='text' name='Cost' id='Cost' placeholder='Cost' />
                          </Col>

                          <Col lg='6' >
                            <Label className='form-label' for='Image'>Image</Label>
                            <Input onChange={(e)=>{setFieldValue('Image',e.target.value)}}  value={values.Image} type='file' name='Image' id='Image' placeholder='Image' />
                          </Col>
                          
                          <Col lg='6' >
                            <Label className='form-label' for='GoogleSchema'>GoogleSchema</Label>
                            <Input onChange={handleChange} value={values.GoogleSchema} type='text' name='GoogleSchema' id='GoogleSchema' placeholder='GoogleSchema' />
                          </Col>
                          
                          <Col lg='6' >
                            <Label className='form-label' for='GoogleTitle'>GoogleTitle</Label>
                            <Input onChange={handleChange} value={values.GoogleTitle} type='text' name='GoogleTitle' id='GoogleTitle' placeholder='GoogleTitle' />
                          </Col>
                          
                          <Col lg='6' >
                            <Label className='form-label' for='ShortLink'>ShortLink</Label>
                            <Input onChange={handleChange} value={values.ShortLink} type='text' name='ShortLink' id='ShortLink' placeholder='ShortLink' />
                          </Col>
                                                    
            
                          

                        </Row>

                        
                        <div className="d-flex"  >
                          <Button className="me-1" color="primary" type="submit" >
                            اضافه کردن
                          </Button>
                          <Button
                            outline
                            color="secondary"
                            type="reset"
                          >
                            ریست
                          </Button>
                        </div>
                      </CardBody>
                    </Card>




                  </form>
                )}
        </Formik>
      </div>
    );
  }


export default FormCreatCourse;
