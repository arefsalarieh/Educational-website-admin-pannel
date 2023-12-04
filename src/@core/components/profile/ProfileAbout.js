// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout = ({  id , gender , birthDay , insertDate}) => {
  return (
    <Card>
      <CardBody>

        <div className='mt-2'>
          <h5 className='mb-75'>آیدی :</h5>
          <CardText>{id}</CardText>
        </div>


        <div className='mt-2'>
          <h5 className='mb-75'>جنسیت :</h5>
          <CardText>{gender === true ? 'مرد' : "زن"}</CardText>
        </div>

        <div className='mt-2'>
          <h5 className='mb-75'>تاریخ تولد :</h5>
          <CardText>{birthDay}</CardText>
        </div>
        
        <div className='mt-2'>
          <h5 className='mb-75'>زمان ثبت نام :</h5>
          <CardText>{insertDate}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
