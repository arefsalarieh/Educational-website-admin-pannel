import React from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

const UserItem = ({id=0 , fName , lNmae , role , gender , profileCompletionPercentage , gmail , phoneNumber}) => {
  return (
    <tr>
        <td>
            <span className='align-middle fw-bold'> {fName +' ' + lNmae}</span>
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
            <span className='align-middle fw-bold'> {gmail}</span>
        </td>        

        <td>
        <Badge pill color='light-success' className='me-1'>
            {phoneNumber}
        </Badge>
        </td>

    </tr>
  )
}

export default UserItem