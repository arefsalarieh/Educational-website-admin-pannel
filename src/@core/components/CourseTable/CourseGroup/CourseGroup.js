import React from 'react'
import { useQuery } from "react-query";
import http from '../../../../@core/interceptor'

const CourseGroup = ({courseDtos,courseId}) => {
    for (let i = 0; i < courseDtos.length; i++) {
        // console.log(courseDtos[i].courseId);

        const getGroupFunc =async () =>{
            const result = await http.get(`/Course/${courseDtos[i].courseId}`)
            return result
        }

        var {data , statuse} = useQuery('getGroup' , getGroupFunc)

       
        
    }
   
  return (
    <div>CourseGroup</div>
  )
}

export default CourseGroup