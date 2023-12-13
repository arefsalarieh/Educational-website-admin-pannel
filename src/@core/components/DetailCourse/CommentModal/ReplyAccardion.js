import { useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { Badge ,   Row, Col, Button ,} from 'reactstrap'
import http from '../../../../@core/interceptor'

const ReplyAccardion = ({data}) => {
    const [open, setOpen] = useState('')
  
    const toggle = id => {
      open === id ? setOpen() : setOpen(id)
    }

    const acceptComment =async (x)=>{
      const result =await http.post(`/Course/AcceptCourseComment?CommentCourseId=${x}`)
      console.log(result);
    }
  
    return (
      <Accordion className='accordion-border' open={open} toggle={toggle} >
        {data && data.map((item , index)=>{
          return(
            <AccordionItem key={index} style={{width:'100%'  }}>
              <AccordionHeader targetId={index}>
                <div style={{color:"black" , width:'100%' }}>
                  <Row className='w-100' >
                    <Col lg='4' style={{overflow:'hidden'}}>
                       <Badge color='info' >عنوان :</Badge> {item.title}
                    </Col>

                    <Col lg='4' style={{overflow:'hidden'}}>
                      <Badge color='info'>فرستنده :</Badge> {item.author}
                    </Col> 
                    
                    <Col lg='4' style={{overflow:'hidden'}}>
                      
                      <Badge color='info'>وضعیت :</Badge> 
                      <Button  onClick={({})=>acceptComment(item.id && item.id)}  color={item.accept === true ? 'success' : 'danger'} > {item.accept === true ? 'پذیرفته شده' : "در انتظار تایید"}</Button>
                    </Col>                                        
                  </Row>
                </div>
              </AccordionHeader>

              <AccordionBody accordionId={index}>
                <div style={{fontSize:'20px'}}>
                  <div>{item.describe}</div>  
                </div>
                <div>
                <Badge color='success' >تعداد ریپلای ها :</Badge> {item.title}
                </div>
              </AccordionBody>
            </AccordionItem>
          )
        })}

      </Accordion>
    )
  }
  export default ReplyAccardion