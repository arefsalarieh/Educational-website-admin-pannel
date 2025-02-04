import React from 'react'
import { Button } from 'reactstrap'
import http from '../../../@core/interceptor'
import { useParams } from "react-router-dom";

const AddRoleItem = ({roleName , roleId , refetch2 }) => {

    const {id} = useParams();

    const addRoleFunc =async () =>{
      const delObj = {
        roleId : roleId,
        userId : id
      }
      const result =await http.post('/User/AddUserAccess?Enable=true' , delObj)
      refetch2()
      console.log(result);
    }

  return (
    <tr >
        <td>
            <span>{roleName}</span>
        </td>

        
        <td>
            <Button.Ripple onClick={addRoleFunc} color='primary'>افزودن دسترسی</Button.Ripple>
        </td>    
             
    </tr>
  )
}

export default AddRoleItem