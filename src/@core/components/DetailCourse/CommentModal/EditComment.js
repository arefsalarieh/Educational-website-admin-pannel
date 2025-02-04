import React from 'react'
import http from "../../../../@core/interceptor";
import { Formik,Form } from "formik";
import {Label,Input,Button} from "reactstrap";
import { useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem , Badge } from 'reactstrap'


const EditComment = ({CommentId , CourseId , refetch}) => {

  const [open, setOpen] = useState('1')

  const toggle = id => {
    open === id ? setOpen() : setOpen(id)
  }



  const updateCourseFunc = async (values) =>{
    const data = new FormData();
    data.append('CommentId' , CommentId)
    data.append('CourseId' , CourseId)
    data.append('Title' , values.Title)
    data.append('Describe' , values.Describe)

    const result =await http.put('/Course/UpdateCourseComment' , data)

    console.log(result);

    refetch()
  }
  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId={CommentId}> 
            <Button color='warning'>برای اصلاح کامنت اینجا کلیک کنید</Button>
          </AccordionHeader>

          <AccordionBody accordionId={CommentId}>
            <Formik onSubmit={updateCourseFunc} initialValues={{ Title : '' , Describe : ''}}>
              {({ values, handleSubmit, handleChange , setFieldValue}) =>(
                <form onSubmit={handleSubmit}>
                  <Label className='form-label' for='Title'>Title</Label>
                  <Input onChange={handleChange} value={values.Title} type='text' name='Title' id='Title' placeholder='Title' />

                  <Label className='form-label' for='Describe'>Describe</Label>
                  <Input onChange={handleChange} value={values.Describe} type='textarea' name='Describe' id='Describe' placeholder='Describe ' />

                  <Button className="me-1" color="primary" type="submit" >
                       تایید
                  </Button>
                </form>
              )}
            </Formik>
        </AccordionBody>
        </AccordionItem>
      </Accordion>



    </div>
  )
}

export default EditComment