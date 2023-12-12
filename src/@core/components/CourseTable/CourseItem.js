import React, { useState } from "react";
import { Edit, MoreVertical, Trash } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import http from "../../interceptor";
import { useQuery } from "react-query";
import { useFormikContext } from "formik";
import { Button } from 'reactstrap'




function CourseItem({
  id,
  fullName,
  typeName,
  statusName,
  levelName,
  cost,
  title,
  refetch,
  isActive,
  isdelete,
}) {
  const show = () =>{
      console.log(isdelete);
  }

  const navigate = useNavigate();

  const handleDelete = async (values) => {
    const courseobjDel = {
      active: true,
      id: id,
    };
    const result = await http.delete(`/Course/DeleteCourse/`, {
      data: courseobjDel,
    });
    refetch();
    return result;
  };



  const handleActive = async (values) => {
    const courseobjAct = {
      active: isActive === true ? false : true,
      id: id,
    };
    const result = await http.put(
      `/Course/ActiveAndDeactiveCourse`,
      courseobjAct
    );
    refetch();
    return result;
  };

  return (
    <tr>
      <td className="text-nowrap ">
        <div  style={{width:'150px' , overflow: "hidden" , }}>{fullName}</div>
      </td>
      <td className="text-nowrap ">
        <div  style={{width:'150px' , overflow: "hidden" , }}>{title}</div></td>
      <td className="text-nowrap ">{typeName}</td>
      <td className="text-nowrap ">{cost}</td>
      <td>
        <Button
          
          pill
          color={isActive === true ? "success" : 'danger'}
         
          onClick={handleActive}
        >
          {isActive === true ? "فعاله" : "غیرفعاله"}
        </Button>
      </td>

      <td   style={{width:'10px'}}>
        <Button
        style={{width:'150px' , overflow: "hidden" , }}
          pill
          color={isdelete === true ? 'danger' : 'success'}
      

        >
          {isdelete === true ? " حذف شده" : "سالمه " }
        </Button>          
      </td>

      <td>
        <Button
          pill
          color="primary"
     
          onClick={() => {
            navigate("/DetailCourse/" + id);
          }}
        >
          جزییات
        </Button>
      </td>

    </tr>
  );
}

export default CourseItem;
