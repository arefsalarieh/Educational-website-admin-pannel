import { useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { Badge ,   Row, Col, Button ,} from 'reactstrap'
import http from '../../../../../@core/interceptor'
import { useQuery } from "react-query";
import EditComment from '../EditComment';


const ReplyAccardion = ({RepId , courseId , commentIndex}) => {

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
    <Accordion className='accordion-border' open={open} toggle={toggle} >
      <AccordionItem>
       <AccordionHeader targetId='1'>
        <Button color='danger'>برای مشاهده ریپلای ها اینجا کلیک کنید</Button>
       </AccordionHeader>


       <AccordionBody accordionId='1' color='dark'  >
          {data && data.map((item , index)=>{
            return(
              <div key={index} style={{  width:'90%' , margin:'20px auto' , padding:'10px' , border:'1px solid aqua'}}>
                   <div style={{margin:'20px 0' }}><Badge color='dark' > ریپلای {index+1} کامنت {commentIndex+1} </Badge></div>

                   <Row className='w-100' >
                      <Col lg='3' style={{overflow:'hidden'}}>
                        <Badge color='primary' >عنوان :</Badge>
                        <h2 style={{fontSize:'12px'}}>{item.title}</h2> 
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



                    <div style={{  padding:'10px'}} >
                      <Row>
                        <Col lg='12'>
                          <div style={{fontSize:'20px' }}>
                            <h2>متن کامنت :</h2>
                            <div style={{fontSize:'20px' , border:'1px solid #ccc' , height:'100px'}}>{item.describe} </div>
                          </div>                     
                        </Col>

                      </Row>

                      <div style={{margin:'10px auto'}}>
                        <EditComment  CourseId={item.courseId} CommentId={item.id} refetch={refetch}/>
                      </div>
                    </div>

              </div>
            )
          })}
       </AccordionBody>
      </AccordionItem>


        {/* {data && data.map((item , index)=>{
            return(
            <AccordionItem key={index}>
                <AccordionHeader  targetId={index}>
                  <div style={{color:"black"  , backgroundColor:"aliceblue"}}>

                    <div style={{margin:'20px 0'}}><Badge color='dark' > ریپلای {index+1} کامنت {commentIndex+1} </Badge></div>

                    <Row className='w-100' >
                      <Col lg='3' style={{overflow:'hidden'}}>
                        <Badge color='primary' >عنوان :</Badge>
                        <h2 style={{fontSize:'12px'}}>{item.title}</h2> 
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
                <div style={{height:'5px' , backgroundColor:'green' }}></div>
            </AccordionItem>
            )
        })} */}


    </Accordion>
  )
  
}

export default ReplyAccardion