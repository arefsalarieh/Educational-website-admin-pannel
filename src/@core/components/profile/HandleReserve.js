import React from 'react'
import { Button } from 'reactstrap'
import http from '../../../@core/interceptor'
import {useQuery} from 'react-query'

const HandleReserve = ({teacherId , courseId , userId}) => {

    

    const getCourseGroup =async () =>{
        const result = await http.get(`/CourseGroup/GetCourseGroup?TeacherId=${teacherId}&CourseId=${courseId}`)
        return result;
      }
      
      const {data , status} = useQuery(['courseGro' ] , getCourseGroup )

    //   data && console.log(data[0].groupId);



    const acceptReserve =async () =>{
        // const changeData = new FormData();

        // const changeObj = {
        //     courseId : courseId,
        //     courseGroupId : data[0].groupId,
        //     studentId : userId
        // }

        // const keys = Object.keys(changeObj)
        // keys.forEach((key)=>{
        //     const item = changeObj[key]
        //     changeData.append(key , item)
        //     //console.log(data);
        //   })


        // const result = await http.post('/CourseReserve/SendReserveToCourse' , changeObj)

        
       
    }


  return (
    <Button.Ripple onClick={acceptReserve} color='primary'>قبول کردن</Button.Ripple>
  )
}

export default HandleReserve