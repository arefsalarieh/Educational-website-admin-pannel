import { Fragment, useState , useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from 'reactstrap'
import http from '../../../../@core/interceptor'
import { useQuery } from "react-query";

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
import AddGroup from '../../AddGroup/AddGroup';
import CommentAccardion from './CommentAccardion';



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



const CommentModal = ({show3 , setShow3  , courseId }) => {




 


  
  return (
    <Fragment>

          <Button color='primary' >
             نمایش کامنت ها 
          </Button>
 

        <Modal isOpen={show3} toggle={() => setShow3(!show3)} className='modal-dialog-centered modal-lg'>
          <ModalHeader className='bg-transparent' toggle={() => setShow3(!show3)}></ModalHeader>

          <ModalBody className='px-sm-5 mx-50 pb-4'>
            <h1 className='text-center mb-1'>نمایش کامنت ها </h1>



            <p className='fw-bolder pt-50 mt-2'>لیست کامنت ها</p>
            <ListGroup flush className='mb-2'>


                <div style={{overflow:'scroll' , height:'300px' ,}}>
                 
                <CommentAccardion  courseId={courseId}/>
                </div>
            </ListGroup>


          </ModalBody>

        </Modal>
    </Fragment>
  )
}

export default CommentModal