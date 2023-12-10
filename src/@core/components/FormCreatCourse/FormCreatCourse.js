// ** React Imports
import { Fragment } from "react";

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


  // ** Hooks
  const { reset } = useForm({ mode: "onChange" });


  const CreatCourse = async (values) => {

    const dataForm = new FormData();

    const setCourses = {
      Title: values.Title,
      Describe: values.Describe,
      MiniDescribe: values.MiniDescribe,
      Capacity: values.Capacity,
      CourseTypeId: values.CourseTypeId,
      SessionNumber: values.SessionNumber,
      CurrentCoursePaymentNumber: 0,
      CoursePrerequisiteId:"6c0a12ea-6a73-ee11-b6c7-ca6d3e095898",
      TremId: values.TremId,
      ClassId: values.ClassId,
      CourseLvlId: values.CourseLvlId,
      TeacherId: values.TeacherId,
      Cost: values.Cost,
      UniqeUrlString: values.UniqeUrlString,
      ShortLink: values.ShortLink,
      TumbImageAddress: values.TumbImageAddress,
      ImageAddress: values.ImageAddress,
      Image: values.Image,
    };

    const keys = Object.keys(setCourses);
    keys.forEach((key) => {
      const item = setCourses[key];
      dataForm.append(key, item);
      console.log(dataForm);
    });
    const res = await http.post(`/Course`, dataForm);
    return res;
  };


  const cours= [
    {
        "id": 1,
        "typeName": "آنلاین-حضوری",
        "insertDate": "2023-10-25T22:14:30.083"
    },
    {
        "id": 2,
        "typeName": "حضوری",
        "insertDate": "2023-10-25T22:14:34.947"
    }
]


  const courseTypeDtos = [
    { value: 1, label: "آنلاین-حضوری"},
    { value: 2, label: "حضوری" },

  ]

  const termDtos = [
    { value: 1, label:"ترم پاییز 1402"},
  ]
 
  const classRoomDtos = [
    { value: 1, label: "کلاس شماره 1"},
    { value: 2, label: "کلاس شماره 2" },    
  ]

  const courseLevelDtos = [
      { value: 1, label: "  مقدماتی"},
      { value: 2, label: "متوسط" },     
      { value: 3, label: "پیشرفته" },     
  ]

  const technologyDtos = [
      { value: 2, label: "  Front-End"},
      { value: 3, label: "ّReactJS" },     
      { value: 4, label: "NextJs" },     
      { value: 5, label: "JAVASCRIPTS" },     
      { value: 6, label: "BackEnd" },     
      { value: 7, label: "c#" },     
      { value: 8, label: "sql" },       
  ]



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

  

const arr = [
  {
    id: 1,
    levelName: "مقدماتی"
  },
  {
      id: 2,
      levelName: "متوسط"
  },
]

const objj =   {
      id: 2,
      levelName: "متوسط"
  }



var arr2 = [];

// for(let key in objj){
//   console.log();
// }


// var newArr = [];

// for (let i = 0; i < arr.length; i++) {
//     arr[i].


//   console.log(Item);
  
// }



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
                              value={values.CourseTypeId}
                              className='react-select'
                              classNamePrefix='select'
                              defaultValue={courseTypeDtos[0]}
                              options={courseTypeDtos}
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
                              options={termDtos}
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
                              options={classRoomDtos}
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
                              options={courseLevelDtos}
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
                              defaultValue={teachers[0]}
                              options={teachers}
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
