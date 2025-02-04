// ** React Imports
import { Fragment, useState } from 'react'
import http from '../../../../@core/interceptor'

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
import AddGroup from '../../AddGroup/AddGroup'
import toast, { Toaster } from 'react-hot-toast';





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

const ShareProjectExample = ({getCourseInfo , courseId , courseGroup , studentId , show , setShow , refetch }) => {
 

  const handleReserve =async (courseGro) =>{
    try{
      const reserveObj = {
        courseId: courseId,
        courseGroupId: courseGro,
        studentId: studentId
      }
      const result =await http.post("/CourseReserve/SendReserveToCourse" , reserveObj) 
      console.log(result);  
      if(result.success === true){
        toast.success(result.message)    
      }
  
      else if(result.success === false){
        toast.error(result.message)       
      }      
    }catch(error){
 
        alert(error)
      
    }


    


  }




  return (
    <Fragment>

          <Button color='primary' >
            تایید رزرو
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
                        <Button onClick={()=>handleReserve(item.groupId)} color='success'>
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
                 <AddGroup getCourseInfo={getCourseInfo} courseId={courseId} refetch={refetch}/>
                </div>
            </ListGroup>


          </ModalBody>
        </Modal>
    </Fragment>
  )
}

export default ShareProjectExample
