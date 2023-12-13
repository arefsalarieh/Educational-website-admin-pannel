import { useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { Badge ,   Row, Col, Button ,} from 'reactstrap'
import http from '../../../interceptor'
import ReplyAccardion from './ReplyAccardion/ReplyAccardion'
import { useQuery } from "react-query";

const CommentAccardion = ({ courseId}) => {
    const [open, setOpen] = useState('')
    const [showReply, setShowReply] = useState(false)
  
    const toggle = id => {
      open === id ? setOpen() : setOpen(id)
    }



    const getCourseComment = async () => {
      const result = await http.get(
        `/Course/GetCourseCommnets/${courseId}`
      );
      // console.log(result);
      return result;
    };
  
    const { data, status, refetch } = useQuery(["getComment" , courseId], getCourseComment);



    const acceptComment =async (commentId , acceptComment)=>{
      if(acceptComment === false){
        const result =await http.post(`/Course/AcceptCourseComment?CommentCourseId=${commentId}`)
        refetch()
        console.log(result);        
      }

      else if(acceptComment === true){
        const result =await http.post(`/Course/RejectCourseComment?CommentCourseId=${commentId}`)
        refetch()
        console.log(result); 
      }


    }
  
    return (
      <Accordion className='accordion-border' open={open} toggle={toggle} >
        {data && data.map((item , index)=>{
          return(
            <AccordionItem key={index} style={{width:'100%'  }}>
              <AccordionHeader targetId={index}>
                <div style={{color:"black" , width:'100%' }}>
                  <Row className='w-100' >
                    <Col lg='3' style={{overflow:'hidden'}}>
                       <Badge color='info' >عنوان :</Badge> {item.title}
                    </Col>

                    <Col lg='3' style={{overflow:'hidden'}}>
                      <Badge color='info'>فرستنده :</Badge> {item.author}
                    </Col> 
                    
                    <Col lg='4' style={{overflow:'hidden'}}>
                      
                      <Badge color='info'>وضعیت :</Badge> 
                      <Button.Ripple    onClick={({})=>acceptComment(item.id , item.accept)}  color={item.accept === true ? 'success' : 'danger'} > {item.accept === true ? 'پذیرفته شده' : "در انتظار تایید"}</Button.Ripple>
                    </Col>  

                    <Col lg='2'>
                      <Badge color='light-warning'>like:{item.likeCount}</Badge> 
                      <Badge color='light-secondary'>disslike:{item.disslikeCount}</Badge> 

                    </Col>                                      
                  </Row>
                </div>
              </AccordionHeader>

              <AccordionBody accordionId={index}>
                <div style={{fontSize:'20px'}}>
                  <div><h2>متن کامنت :</h2>{item.describe}</div>  
                </div>
                <div style={{marginTop:'20px'}}>
                {/* <Badge color='light-primary' >تعداد ریپلای ها :</Badge>
                <Badge color='light-danger' > {item.acceptReplysCount} </Badge> */}
                
                <div>


                <Badge color='warning'>
                     ریپلای ها   
                </Badge>
                  <div style={{backgroundColor:'red'}}>
                     <ReplyAccardion RepId={item.id} courseId={item.courseId}/>
                  </div>

                </div>
                
                 
                </div>
              </AccordionBody>
              <div style={{height:'8px' , backgroundColor:'red'}}></div>
            </AccordionItem>


          )
        })}

      </Accordion>
    )
  }
  export default CommentAccardion