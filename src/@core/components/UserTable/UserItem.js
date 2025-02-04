import React from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';

const UserItem = ({id=0 , fName , lNmae , role , gender , profileCompletionPercentage , gmail , phoneNumber}) => {

    const navigate = useNavigate()

    const goDetail = () =>{
        navigate('/pages/profile/' + id)
    }
    
  return (
    <tr>
        <td>
            <div style={{ width:'150px' , height:'30px' , overflow:'hidden'}}>
                <span className='align-middle fw-bold'> {fName +' ' + lNmae}</span>
            </div>
        </td>

        <td>
            <span className='align-middle fw-bold'> {role}</span>
        </td>

        <td>
            <span className='align-middle fw-bold'> {id}</span>
        </td>        

        <td>
            <span className='align-middle fw-bold'> {gender === true ? 'مرد' : 'زن'}</span>
        </td>

        <td>
            <span className='align-middle fw-bold'> {profileCompletionPercentage}</span>
        </td>

        <td>
            <div style={{width:'200px' , height:'30px' , overflow:'hidden'}}>
                <span className='align-middle fw-bold'> {gmail}</span>           
            </div>
        </td>        

        <td>
        <Badge pill color='light-success' className='me-1'>
            {phoneNumber}
        </Badge>
        </td>

        <td>
            <Button.Ripple onClick={goDetail} color='primary'>جزئیات</Button.Ripple>
        </td>        

    </tr>
  )
}

export default UserItem