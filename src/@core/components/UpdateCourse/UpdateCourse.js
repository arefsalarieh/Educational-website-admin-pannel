import { Fragment, useEffect, useState } from "react";
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
import { Formik,Form } from "formik";
import Select from 'react-select'
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const UpdateCourse = () => {
    const navigate = useNavigate();

    const [BaseDetail, setBaseDetail] = useState();
    const [courseType, setCourseType] = useState();
    const [courseTerm, setCourseTerm] = useState();
    const [courseRoom, setCourseRoom] = useState();
    const [courseLevel, setCourseLevel] = useState();
    const [courseTeacher, setCourseTeacher] = useState(); 
    const { id } = useParams(); 

    // courseType && console.log(courseType);

    


    const CourseGeneralInfo =async () =>{
        const result = await http.get("/Course/GetCreate")
        setCourseType(result.courseTypeDtos)
        setCourseTerm(result.termDtos)
        setCourseRoom(result.classRoomDtos)
        setCourseLevel(result.courseLevelDtos)
        setCourseTeacher(result.teachers)
      }

    const getBaseDetail = async () =>{
        const result = await http.get(`/Course/${id}`) 
        setBaseDetail(result)      
    }
    

    
    


    useEffect(() => {
        CourseGeneralInfo()
        getBaseDetail()
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
    const baseCourseTypeId = newCourseTypeDtos?.find((item)=>item.label === BaseDetail?.courseTypeName)
  



    // term id
    const newTermDtos = [];
  
    for (let i = 0; i < courseTerm?.length; i++) {
    var newObj ={
        value : courseTerm[i].id,
        label : courseTerm[i].termName
    }
    newTermDtos.push(newObj)
    }
    const baseTermDtos = newTermDtos?.find(item => item)
 




    const newClassRoomDtos = [];

    for (let i = 0; i < courseRoom?.length; i++) {
        var newObj ={
        value : courseRoom[i].id,
        label : courseRoom[i].classRoomName
        }
        newClassRoomDtos.push(newObj)
    }
    const baseClass = newClassRoomDtos?.find(item => item)
   


    const newCourseLevelDtos = [];

    for (let i = 0; i < courseLevel?.length; i++) {
        var newObj ={
        value : courseLevel[i].id,
        label : courseLevel[i].levelName
        }
        newCourseLevelDtos.push(newObj)   
    }

    const baseLevel = newCourseLevelDtos?.find((item)=>item.label === BaseDetail?.courseLevelName)
    baseLevel && console.log(baseLevel);


const newTeachers = [];

 for (let i = 0; i < courseTeacher?.length; i++) {
    var newObj ={
      value : courseTeacher[i].teacherId,
      label : courseTeacher[i].fullName
    }
    newTeachers.push(newObj)
    
}




const UpdateCourseFunc = async (values) =>{
    const data = new FormData();

    const keys = Object.keys(values)
    keys.forEach((key)=>{
      const item = values[key]
      data.append(key , item)
   
    })
     const result = await http.put("/Course" , data)

      if(result.success === true){
        toast.success(result.message)  
        navigate("/DetailCourse/" + result.id)  
      }
  
      else if(result.success === false){
        toast.error(result.errors)       
      }
      
    console.log(result);
}



      
  return (
    <div>
        
        <h2> بروز رسانی کورس </h2>

        {BaseDetail && (
            <Formik 
                initialValues={{
                    id:id,
                    Title:BaseDetail.title ,
                    Describe:BaseDetail.describe ,
                    MiniDescribe: " empty  empty  empty  empty  empty  empty  empty  empty ",
                    Capacity: 100,
                    CourseTypeId:  baseCourseTypeId &&  baseCourseTypeId.value,
                    SessionNumber: 1,
                    CurrentCoursePaymentNumber: 0,
                    TremId: baseTermDtos && baseTermDtos.value,
                    ClassId: baseClass && baseClass.value,
                    CourseLvlId: baseLevel && baseLevel.value ,
                    TeacherId: BaseDetail.teacherId ,
                    Cost:BaseDetail.cost ,
                    UniqeUrlString: Math.random(),
                    Image: BaseDetail.imageAddress,
                    StartTime: "2645-01-31T00:00:00",
                    EndTime: "2645-05-10T00:00:00",
                    GoogleSchema: "",
                    GoogleTitle: "",
                    CoursePrerequisiteId:'',
                    ShortLink: "",
                    TumbImageAddress: "",
                    ImageAddress: "",   
                    }}
                    onSubmit={UpdateCourseFunc}
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
                                placeholder={baseCourseTypeId &&  baseCourseTypeId.label}
                            />
                            </Col>



                            <Col lg='6'>
                            <Label className='form-label' for='SessionNumber'>SessionNumber</Label>
                            <Input onChange={handleChange} value={values.SessionNumber} type='text' name='SessionNumber' id='SessionNumber' placeholder='SessionNumber' />
                            </Col>

                            {/* <Col lg='6'>
                            <Label className='form-label' for='CurrentCoursePaymentNumber'>CurrentCoursePaymentNumber</Label>
                            <Input onChange={handleChange} value={values.CurrentCoursePaymentNumber} type='text' name='CurrentCoursePaymentNumber' id='CurrentCoursePaymentNumber' placeholder='CurrentCoursePaymentNumber' />
                            </Col> */}

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
                                 placeholder={baseTermDtos &&  baseTermDtos.label}                               
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
                                placeholder={baseClass &&  baseClass.label}  
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
                                placeholder={baseLevel &&  baseLevel.label}                                  
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
                            <Input onChange={(e)=>{setFieldValue('Image',e.target.files[0])}}  type='file' name='Image' id='Image' placeholder='Image' />
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
                                                    
            
                            <Col lg='6'>
                            <Label className='form-label' for='Describe'>Describe</Label>
                            <Input onChange={handleChange} value={values.Describe} type='textarea' name='Describe' id='Describe' placeholder='Describe ' />
                            </Col>

                            <Col lg='6'>
                            <Label className='form-label' for='MiniDescribe'>MiniDescribe</Label>
                            <Input onChange={handleChange} value={values.MiniDescribe} type='textarea' name='MiniDescribe' id='MiniDescribe' placeholder='MiniDescribe ' />
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
        )}


    </div>
  )
}

export default UpdateCourse