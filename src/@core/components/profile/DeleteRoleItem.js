import React from 'react'
import { Button } from 'reactstrap'
import http from '../../../@core/interceptor'
import { useParams } from "react-router-dom";

const DeleteRoleItem = ({roleName , roleId }) => {

  const {id} = useParams();

  const deleteRoleFunc =async () =>{
    const delObj = {
      roleId : roleId,
      userId : id
    }
    const result =await http.post('/User/AddUserAccess?Enable=false' , delObj)
    console.log(result);
  }
  return (
    <tr >
        <td>
            <span>{roleName}</span>
        </td>

        
        <td>
            <Button.Ripple onClick={deleteRoleFunc} color='danger'>حذف دسترسی</Button.Ripple>
        </td>    
             
    </tr>
  )
}

export default DeleteRoleItem