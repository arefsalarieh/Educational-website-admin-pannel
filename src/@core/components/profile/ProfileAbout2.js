import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout2 = ({nationalCode , active , isDelete , twoStepAuth , receiveMessageEvent , phoneNumber}) => {
  return (
    <Card>
    <CardBody>

        <div className='mt-2'>
        <h5 className='mb-75'>کد ملی :</h5>
        <CardText>{nationalCode}</CardText>
      </div>

      <div className='mt-2'>
        <h5 className='mb-75'>فعال / غیر فعال :</h5>
        <CardText>{active === true ? 'فعال' : 'غیر فعال'}</CardText>
      </div>

      
      <div className='mt-2'>
        <h5 className='mb-75'> وضعیت (عادی / حذف شده) :</h5>
        <CardText>{isDelete === false ? "عادی" : "حذف شده"}</CardText>
      </div>

      <div className='mt-2'>
        <h5 className='mb-75'>نوع ورود به پنل کاربری :</h5>
        <CardText>{twoStepAuth === false ? "تک مرحله ای" : "دو مرحله ای"}</CardText>
      </div>

      <div className='mt-2'>
        <h5 className='mb-75'> وضعیت دریافت خبر ها :</h5>
        <CardText>{receiveMessageEvent === true ? "فعال" : "غیر فعال"}</CardText>
      </div>
      

     
    </CardBody>
  </Card>
  )
}

export default ProfileAbout2