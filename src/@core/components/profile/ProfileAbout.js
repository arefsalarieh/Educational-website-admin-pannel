// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'
import { Badge } from 'reactstrap'

const ProfileAbout = ({  id , gender , birthDay , insertDate , roles}) => {

  var rolesList = [];

  for(let item of roles){
    
    rolesList.push(item.roleName)
  }


  return (
    <Card>
      <CardBody>

        <div className='mt-2'>
          <Badge className='mb-75'>آیدی :</Badge>
          <CardText>{id}</CardText>
        </div>


        <div className='mt-2'>
          <Badge className='mb-75'>جنسیت :</Badge>
          <CardText>{gender === true ? 'مرد' : "زن"}</CardText>
        </div>

        <div className='mt-2'>
          <Badge className='mb-75'>تاریخ تولد :</Badge>
          <CardText>{birthDay}</CardText>
        </div>
        
        <div className='mt-2'>
          <Badge className='mb-75'>زمان ثبت نام :</Badge>
          <CardText>{insertDate}</CardText>
        </div>

        <div className='mt-2'>
          <Badge className='mb-75'> نوع کاربر  :</Badge>
          <CardText>
            {rolesList.map((rol , index)=>{
                return(
                  <div key={index}>{index+1}-{rol}</div>
                )
            })}
          </CardText>
        </div>        
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
