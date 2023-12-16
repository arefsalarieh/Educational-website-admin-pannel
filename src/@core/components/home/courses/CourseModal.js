// ** React Imports
import { Fragment, useState } from 'react'

// ** Custom Components
// import Avatar from '@components/avatar'
import Avatar from 'react-avatar'
import {PersianRolesMaker} from '../../../utils/persianRolesMaker'

// ** Reactstrap Imports
import {
  Card,
  Button,
  Label,
  Modal,
  ListGroup,
  ModalBody,
  ModalHeader,
  ListGroupItem,
  Badge
} from 'reactstrap'


import { useNavigate } from 'react-router-dom'






const ShareProjectExample = ({show, setShow, modalData, role}) => {
  const navigate = useNavigate()
  console.log(modalData?.listUser);

  const BadgeColorMaker = (tech) => {
    if (tech === "Front-End") return "info"
    else if (tech === "ReactJS") return "primary"
    else if (tech === "NextJs") return "dark"
    else if (tech === "JAVASCRIPTS") return "warning"
    else if (tech === "BackEnd") return "success"
    else if (tech === "C#") return "info"
    else if (tech === "SQL") return "danger"
    else if (tech === "TSQL") return "secondary"
    else return "muted"
  }

  const itemTechBadgeBuilder = (data) => {
    const arr = data.split(', ')
    return arr.map((item, index) => <Badge key={index} style={{margin: "0px 5px"}} color={BadgeColorMaker(item)}>{item}</Badge>)
  }

  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-4'>
          <h1 className='text-center mb-1'>لیست دوره‌ها</h1>
          <p className='text-center'>لیست همه دورها</p>
          <p className='fw-bolder pt-50 mt-2'>{modalData.totalCount} Members</p>
          <ListGroup flush className='mb-2'>
            {modalData?.courseFilterDtos.map((item,index) => {
              return (
                <ListGroupItem key={index} className='d-flex align-items-start border-0 px-0'>
                  <Avatar round size='35px' name={item.title} />
                  <div className='d-flex align-items-center justify-content-between w-100'>
                    <div className='me-1 ms-1'>
                      <h5 className='mb-25'>{item.title}</h5>
                      <span>{item.gmail}</span>
                      {itemTechBadgeBuilder(item?.technologyList)}
                    </div>
                    {/* <UncontrolledDropdown>
                      <DropdownToggle color='flat-secondary' caret>
                        <span className='d-lg-inline-block d-none'>{item.type}</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className='w-100'>Owner</DropdownItem>
                        <DropdownItem className='w-100'>Can Edit</DropdownItem>
                        <DropdownItem className='w-100'>Can Comment</DropdownItem>
                        <DropdownItem className='w-100'>Can View</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown> */}
                    <Button color='primary' onClick={() => navigate(`/DetailCourse/${item.courseId}`)} >جزئیات دوره</Button>
                  </div>
                </ListGroupItem>
              )
            })}
          </ListGroup>
          {/* <div className='d-flex align-content-center justify-content-between flex-wrap'>
            <div className='d-flex align-items-center me-2'>
              <Users className='font-medium-2 me-50' />
              <p className='fw-bolder mb-0'>Public to Vuexy - Pixinvent</p>
            </div>
            <a className='fw-bolder' href='#' onClick={e => e.preventDefault()}>
              <Link className='font-medium-2 me-50' />
              <span>Copy project link</span>
            </a>
          </div> */}
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default ShareProjectExample
