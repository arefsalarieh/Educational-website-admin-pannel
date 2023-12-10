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
import http from "../../../interceptor";
import { useQuery } from "react-query";
import { useFormikContext } from "formik";
import { Button } from 'reactstrap'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'




const ReserveItem = ({courseName , studentName , studentId , reserverDate , accept , courseId}) => {
  const navigate = useNavigate();

  console.log(courseName);
  return (
        
        <tr>
          <td className="text-nowrap ">{courseName}</td>
          <td className="text-nowrap ">{studentName}</td>
          <td className="text-nowrap ">{studentId}</td>
          <td className="text-nowrap ">{reserverDate}</td>
          <td className="text-nowrap ">{accept === true ? 'قبول شده' : "در انتظار تایید"}</td>
          <td>
                <Button
                  pill
                  color="primary"
                  className="me-1"
                  onClick={() => {
                    navigate("/DetailCourse/" + courseId);
                  }}
                >
                  جزییات
                </Button>
          </td>

          <td>
            
          </td>
        </tr>
      
  )
}

export default ReserveItem