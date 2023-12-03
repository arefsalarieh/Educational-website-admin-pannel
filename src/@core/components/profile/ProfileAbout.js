// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout = ({  email , phoneNumber , gender , birthDay , insertDate}) => {
  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>Email</h5>
        <CardText>{email}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>شماره تماس:</h5>
          <CardText>{phoneNumber}</CardText>
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
