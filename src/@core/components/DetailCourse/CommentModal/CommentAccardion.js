import { useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { Badge ,   Row, Col, Button ,} from 'reactstrap'
import http from '../../../interceptor'
import ReplyAccardion from './ReplyAccardion/ReplyAccardion'
import { useQuery } from "react-query";
import EditComment from './EditComment'

const CommentAccardion = ({ courseId}) => {
    const [open, setOpen] = useState('')
    const [editDisplay, setEditDisplay] = useState('none')
  
    const toggle = id => {
      open === id ? setOpen() : setOpen(id)
    }

    const changeDisplay = () =>[
      editDisplay === 'block' ? setEditDisplay('none') : setEditDisplay('block')
    ]


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
      <div className='accordion-border'  >

        {data && data.map((item , index)=>{
          return(
            <div key={index}  style={{border:'1px solid black' , padding:'20px' , marginTop:'40px' , backgroundColor:'white' }}>
            <div >
              <div >
                <div style={{color:"black"  , width:'100%' }}>
                 
                  <div style={{marginBottom:'20px' , fontSize:'20px'}}><Badge color='dark' > کامنت {index+1} </Badge></div>

                  <Row  >
                    <Col lg='3' style={{overflow:'hidden' , fontSize:'20px'}}>
                       <Badge color='info'>عنوان :    </Badge> {item.title}
                    </Col>

                    <Col lg='4' style={{overflow:'hidden' ,  fontSize:'20px'}}>
                      <Badge color='info'>فرستنده :</Badge> {item.author}
                    </Col> 
                    
                    <Col lg='4' style={{overflow:'hidden' , fontSize:'20px'}}>
                      
                      <Badge color='info'>وضعیت :</Badge> 
                      <Button.Ripple    onClick={({})=>acceptComment(item.id , item.accept)}  color={item.accept === true ? 'success' : 'danger'} > {item.accept === true ? 'پذیرفته شده' : "در انتظار تایید"}</Button.Ripple>
                    </Col>  

                    <Col lg='1'>
                      <Badge color='light-warning'>like:{item.likeCount}</Badge> 
                      <Badge color='light-secondary'>disslike:{item.disslikeCount}</Badge> 
                    </Col>                                      
                  </Row>
                </div>
              </div>

              <div style={{  margin:'20px auto'}} >
                <div >
                  <Row>
                    <Col lg='12'>
                      <div style={{fontSize:'20px' }}>
                        <h2>متن کامنت :</h2>
                        <div style={{fontSize:'20px' , border:'1px solid #ccc' , height:'150px'}}>{item.describe} </div>
                      </div>                     
                    </Col>

                  </Row>

                  <div style={{margin:'10px auto'}}>
                    <EditComment  CourseId={item.courseId} CommentId={item.id} refetch={refetch}/>
                  </div>

               



                  <div style={{ backgroundColor:'#ccc' ,  margin:' auto'  }}>
                    <div>
                          <div style={{ margin:'0 auto'}}>
                            <ReplyAccardion RepId={item.id} courseId={item.courseId} commentIndex={index}/>
                          </div>
                      </div>                   
                  </div>                  
                </div>

              </div>
              {/* <div style={{height:'8px' , backgroundColor:'black'}}></div> */}
            </div>
            </div>



          )
        })}

      </div>
    )
  }
  export default CommentAccardion