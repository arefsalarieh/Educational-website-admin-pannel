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
        console.log(result);
        return result;
      };
    
      const { data, status, refetch } = useQuery(["getReply" , RepId], getReplyComment);


  return (
    <Accordion className='accordion-border' open={open} toggle={toggle}>
        {data && data.map((item , index)=>{
            return(
            <AccordionItem key={index}>
                <AccordionHeader  targetId={index}>{item.title}</AccordionHeader>
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