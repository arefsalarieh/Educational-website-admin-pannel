import { Fragment, useState , useEffect } from 'react'
import http from '../../interceptor'
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

// ** Utils
import { selectThemeColors } from '@utils'

// ** Avatars
import avatar1 from '@src/assets/images/avatars/1-small.png'
import avatar2 from '@src/assets/images/avatars/3-small.png'
import avatar3 from '@src/assets/images/avatars/5-small.png'
import avatar4 from '@src/assets/images/avatars/7-small.png'
import avatar5 from '@src/assets/images/avatars/9-small.png'
import avatar6 from '@src/assets/images/avatars/11-small.png'

// ** Portraits
import portrait1 from '@src/assets/images/portrait/small/avatar-s-9.jpg'
import portrait2 from '@src/assets/images/portrait/small/avatar-s-3.jpg'
import portrait3 from '@src/assets/images/portrait/small/avatar-s-5.jpg'
import portrait4 from '@src/assets/images/portrait/small/avatar-s-7.jpg'
import portrait5 from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import portrait6 from '@src/assets/images/portrait/small/avatar-s-10.jpg'
import portrait7 from '@src/assets/images/portrait/small/avatar-s-8.jpg'
import portrait8 from '@src/assets/images/portrait/small/avatar-s-6.jpg'
import toast, { Toaster } from 'react-hot-toast';

const options = [
  { value: 'Donna Frank', label: 'Donna Frank', avatar: avatar1 },
  { value: 'Jane Foster', label: 'Jane Foster', avatar: avatar2 },
  { value: 'Gabrielle Robertson', label: 'Gabrielle Robertson', avatar: avatar3 },
  { value: 'Lori Spears', label: 'Lori Spears', avatar: avatar4 },
  { value: 'Sandy Vega', label: 'Sandy Vega', avatar: avatar5 },
  { value: 'Cheryl May', label: 'Cheryl May', avatar: avatar6 }
]


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

const AddTechModal = ({rand , setRand , getCourseInfoForDetail  , show2 , setShow2 , haveTechs}) => {
  const { id } = useParams();
  const [courseTech, setCourseTech] = useState();  
  const [haveCourseTechs, sethaveCourseTechs] = useState();  




  

  const getCreateFunc =async () =>{
    const result = await http.get("/Course/GetCreate")
    setCourseTech(result.technologyDtos)
  }


  useEffect(() => {
    getCreateFunc()
    sethaveCourseTechs(haveTechs)
  },[rand]);



 const technologyDtos = [];

  for (let i = 0; i < courseTech?.length; i++) {

    var newObj ={
      value : courseTech[i].id,
      label : courseTech[i].techName
    }

    technologyDtos.push(newObj)  
}



const newTechnologyDtos = technologyDtos.filter((f) => !haveCourseTechs.some((s) => s === f.label));










const AddTechFunc = async (values) =>{
  const techArr = [values]
  const result = await http.post(`/Course/AddCourseTechnology?courseId=${id}` , techArr)
    // console.log(result);
    if(result.success === true){
      toast.success(result.message)    
    }

    else if(result.success === false){
      toast.error(result.errors)       
    }

    
  setRand(Math.random())
  getCourseInfoForDetail()


}

  return (
    <Fragment>

          <Button color='primary' >
            افزودن تکنولوژی 
          </Button>
 
        {newTechnologyDtos && (
              <Modal isOpen={show2} toggle={() => setShow2(!show2)} className='modal-dialog-centered modal-lg'>
                <ModalHeader className='bg-transparent' toggle={() => setShow2(!show2)}></ModalHeader>
                  <Formik onSubmit={AddTechFunc} initialValues={{techId : ''}}>
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
        
        
                          {/* <p className='fw-bolder pt-50 mt-2'>لیست گروه ها</p>
                          <ListGroup flush className='mb-2'>
                              {haveCourseTechs && haveCourseTechs.map((item , index)=>{
                                return(
                                  <Badge key={index} style={{width:'100px'}} color='info'>{item}</Badge>
                                )
                              })}
                          </ListGroup> */}
        
        
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
        )}

    </Fragment>
  )
}

export default AddTechModal
