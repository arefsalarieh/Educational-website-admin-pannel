import React from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';


const ReserveCourseItem = ({id=0 , courseName}) => {


    const navigate = useNavigate()

    const goDetail = () =>{
        navigate('/pages/profile/' + id)
    }

    

  return (
    <tr>
        <td>
            <span className='align-middle fw-bold'> {courseName}</span>
        </td>

        <td>
            <Button.Ripple onClick={goDetail} color='primary'> مشاهده جزئیات</Button.Ripple>

        </td>  

        <td>
            <Button.Ripple onClick={goDetail} color='primary'>قبول کردن</Button.Ripple>
            <Button.Ripple onClick={goDetail} color='danger'>رد کردن</Button.Ripple>
        </td>   


     

    </tr>
  )
}

export default ReserveCourseItem