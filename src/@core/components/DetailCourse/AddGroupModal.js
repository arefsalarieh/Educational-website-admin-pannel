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



const AddGroupModal = ({show , setShow , courseGroup , courseId , getCourseInfoForDetail}) => {

  
  return (
    <Fragment>

          <Button color='primary' >
            افزودن گروه 
          </Button>
 

        <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
          <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>

          <ModalBody className='px-sm-5 mx-50 pb-4'>
            <h1 className='text-center mb-1'> </h1>



            <h2 className='fw-bolder pt-50 mt-2'><Badge color='success' >  لیست گروه ها :</Badge></h2>
            <ListGroup flush className='mb-2'>
              {courseGroup !== 0  ? courseGroup.map((item , index) => {
                return (
                  <ListGroupItem   key={index} className='d-flex align-items-start border-0 px-0'>

                  <div className='w-100'> 

                    <h4><Badge color='warning' className='badge-glow'> گروه {index+1}</Badge>   </h4>
                    <div style={{border:'1px solid #ccc' , backgroundColor:'#ccc' , padding:'10px' , borderRadius:'15px'}} className='d-flex align-items-center justify-content-between w-100'>
                      <div className=''>
                        
                        <Badge color='secondary' className='badge-glow'>  نام گروه :</Badge>
                        
                        <div style={{overflow:'hidden' , width:'300px' , height:'30px' , fontSize:'20px'}}>   {item.groupName}</div>
                      </div>

                      <div className=''>
                        <h5 className=''><Badge color='secondary' className='badge-glow'>   ظرفیت دوره :</Badge></h5>
                        <span style={{textAlign:'center'}}>{item.courseCapacity}</span>
                      </div>                      

                      <div className=''>
                        <h5 className=''><Badge color='secondary' className='badge-glow'>   ظرفیت گروه :</Badge></h5>
                        <span>{item.groupCapacity}</span>
                      </div>

                      <div className=''>
                      <h5 className=''><Badge color='secondary' className='badge-glow'>    مدرس :</Badge></h5>
                        <span>{item.teacherName}</span>
                      </div>



                    </div>
                  </div>

                  </ListGroupItem>
                )
              }) : (
                <h2> لیست گروه خالی است  </h2> 
              )}

                <div style={{marginTop:'50px'}}>
                 
                <h2 className='fw-bolder pt-50 mt-2'><Badge color='info' className='badge-glow'>افزودن گروه :</Badge></h2>
                 <AddGroup getCourseInfoForDetail={getCourseInfoForDetail} courseId={courseId} />
                </div>
            </ListGroup>


          </ModalBody>

        </Modal>
    </Fragment>
  )
}

export default AddGroupModal