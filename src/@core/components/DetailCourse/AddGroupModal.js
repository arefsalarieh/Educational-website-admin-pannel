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
import AddGroup from '../AddGroup/AddGroup';



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



const AddGroupModal = ({show , setShow , courseGroup , courseId }) => {

  courseGroup && console.log(courseGroup);
  return (
    <Fragment>

          <Button color='primary' >
            افزودن گروه 
          </Button>
 

        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>

          <ModalBody className='px-sm-5 mx-50 pb-4'>
            <h1 className='text-center mb-1'>انتخاب گروه</h1>



            <p className='fw-bolder pt-50 mt-2'>لیست گروه ها</p>
            <ListGroup flush className='mb-2'>
              {courseGroup !== 0  ? courseGroup.map((item , index) => {
                return (
                  <ListGroupItem   key={index} className='d-flex align-items-start border-0 px-0'>
                    
                    <div className='d-flex align-items-center justify-content-between w-100'>
                      <div className='me-1'>
                        <h5 className='mb-25'>نام گروه</h5>
                        <span>{item.groupName}</span>
                      </div>

                      <div className='me-1'>
                        <h5 className='mb-25'>ظرفیت دوره</h5>
                        <span>{item.courseCapacity}</span>
                      </div>                      

                      <div className='me-1'>
                        <h5 className='mb-25'>ظرفیت گروه</h5>
                        <span>{item.groupCapacity}</span>
                      </div>

                      <div className='me-1'>
                        <h5 className='mb-25'>مدرس</h5>
                        <span>{item.teacherName}</span>
                      </div>

                      <div className='me-1'>
                        <Button  color='success'>
                          تایید  رزرو
                        </Button>
                      </div>

                    </div>
                  </ListGroupItem>
                )
              }) : (
                <h2> لیست گروه خالی است  </h2> 
              )}

                <div>
                 
                  <h2>   افزودن گروه</h2>
                 <AddGroup courseId={courseId}/>
                </div>
            </ListGroup>


          </ModalBody>

        </Modal>
    </Fragment>
  )
}

export default AddGroupModal