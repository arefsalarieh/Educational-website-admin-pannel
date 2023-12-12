import { Fragment, useState , useEffect } from 'react'
import http from '../../../@core/interceptor'
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from 'reactstrap'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import {
  Card,
  Button,
  Label,
  Modal,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  ListGroupItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

// ** Third Party Components
import Select, { components } from 'react-select'
import { FileText, Users, Link } from 'react-feather'
import { Formik,Form } from "formik";



const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className='d-flex flex-wrap align-items-center'>
          <Avatar className='my-0 me-1' size='sm' img={data.avatar} />
          <div>{data.label}</div>
        </div>
      </components.Option>
    )
  }



const AddGroupModal = ({show2 , setShow2 , courseId}) => {
  return (
    <Fragment>

          <Button color='primary' >
            افزودن تکنولوژی 
          </Button>
 

        <Modal isOpen={show2} toggle={() => setShow2(!show2)} className='modal-dialog-centered modal-lg'>
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
          <Formik  initialValues={{techId : ''}}>
            {({ values, handleSubmit, handleChange , setFieldValue}) =>(
              <form onSubmit={handleSubmit}>
                <ModalBody className='px-sm-5 mx-50 pb-4'>
                  <h1 className='text-center mb-1'>AddTech</h1>
                  <p className='text-center'>Share project with a team members</p>
                  <Label for='addMemberSelect' className='form-label fw-bolder font-size font-small-4 mb-50'>
                    Add Members
                  </Label>
                  <Select
                      id='CourseTypeId'
                      name='CourseTypeId' 
                      className='react-select'
                      classNamePrefix='select'
                      options={newTechnologyDtos && newTechnologyDtos}
                      isClearable={false}
                      onChange={(value)=>{setFieldValue('techId',value.value)}}
                    />

                  <Button className="me-1" color="primary" type="submit" >
                    اضافه کردن
                  </Button>


                  <p className='fw-bolder pt-50 mt-2'>لیست گروه ها</p>
                  <ListGroup flush className='mb-2'>
                      {haveCourseTechs && haveCourseTechs.map((item , index)=>{
                        return(
                          <Badge key={index} style={{width:'100px'}} color='info'>{item}</Badge>
                        )
                      })}
                  </ListGroup>


                  <div className='d-flex align-content-center justify-content-between flex-wrap'>
                    <div className='d-flex align-items-center me-2'>
                      <Users className='font-medium-2 me-50' />
                      <p className='fw-bolder mb-0'>Public to Vuexy - Pixinvent</p>
                    </div>
                    <a className='fw-bolder' href='#' onClick={e => e.preventDefault()}>
                      <Link className='font-medium-2 me-50' />
                      <span>Copy project link</span>
                    </a>
                  </div>
                </ModalBody>                
              </form>
            )}
          </Formik>

        </Modal>
    </Fragment>
  )
}

export default AddGroupModal