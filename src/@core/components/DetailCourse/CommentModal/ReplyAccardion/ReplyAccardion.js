import { useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { Badge ,   Row, Col, Button ,} from 'reactstrap'
import http from '../../../../../@core/interceptor'
import { useQuery } from "react-query";


const ReplyAccardion = ({RepId , courseId}) => {

    const [open, setOpen] = useState('')
  
    const toggle = id => {
      open === id ? setOpen() : setOpen(id)
    }

    const getReplyComment = async () => {
        const result = await http.get(
          `/Course/GetCourseReplyCommnets/${courseId}/${RepId}`
        );
        // console.log(result);
        return result;
      };
    
      const { data, status, refetch } = useQuery(["getReply" , RepId], getReplyComment);


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
    <Accordion className='accordion-border' open={open} toggle={toggle}>
        {data && data.map((item , index)=>{
            return(
            <AccordionItem key={index}>
                <AccordionHeader  targetId={index}>
                  <div style={{color:"black" , width:'100%' , backgroundColor:"aliceblue"}}>
                    <Row className='w-100' >
                      <Col lg='3' style={{overflow:'hidden'}}>
                        <Badge color='primary' >عنوان :</Badge> {item.title}
                      </Col>

                      <Col lg='3' style={{overflow:'hidden'}}>
                        <Badge color='primary'>فرستنده :</Badge> {item.author}
                      </Col> 
                      
                      <Col lg='4' style={{overflow:'hidden'}}>
                        
                        <Badge color='primary'>وضعیت :</Badge> 
                        <Button.Ripple  outline  onClick={({})=>acceptComment(item.id , item.accept)}  color={item.accept === true ? 'success' : 'danger'} > {item.accept === true ? 'پذیرفته شده' : "در انتظار تایید"}</Button.Ripple>
                      </Col>  

                      <Col lg='2'>
                        <Badge color='light-warning'>like:{item.likeCount}</Badge> 
                        <Badge color='light-secondary'>disslike:{item.disslikeCount}</Badge> 

                      </Col>                                      
                    </Row>
                  </div>  
                </AccordionHeader>
                <AccordionBody  accordionId={index}>
                    {item.describe}
                </AccordionBody>
                <div style={{height:'5px' , backgroundColor:'green'}}></div>
            </AccordionItem>
            )
        })}


    </Accordion>
  )
  
}

export default ReplyAccardion