import React, { useState } from 'react'
import { MoreVertical, Edit, Trash } from 'react-feather'
import { Table, Badge, UncontrolledDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom';
import http from '../../../@core/interceptor'
import {useQuery} from 'react-query'
import HandleReserve from './HandleReserve';


const ReserveCourseItem = ({ courseName , reserverDate }) => {





  return (
    <tr>
        <td>
            <span className='align-middle fw-bold'> {courseName}</span>
        </td>

        <td>
            <span className='align-middle fw-bold'> {reserverDate}</span>
        </td>        

        <td>
            <Button.Ripple  color='primary'> مشاهده جزئیات</Button.Ripple>
        </td>  



     

    </tr>
  )
}

export default ReserveCourseItem