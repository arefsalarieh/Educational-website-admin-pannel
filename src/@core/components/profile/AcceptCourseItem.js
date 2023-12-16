import React from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';


const AcceptCourseItem = ({title , lastUpdate , id}) => {

    // console.log(id);


    const navigate = useNavigate()

    const goDetail = () =>{
        navigate('/DetailCourse/' + id)
    }

    

  return (
    <tr>
        <td>
            <span className='align-middle fw-bold'> {title}</span>
        </td>

        <td>
            <span className='align-middle fw-bold'> {lastUpdate}</span>
        </td>
        
        <td>
            <Button.Ripple onClick={goDetail} color='primary'>  جزئیات</Button.Ripple>

        </td>  



     

    </tr>
  )
}

export default AcceptCourseItem