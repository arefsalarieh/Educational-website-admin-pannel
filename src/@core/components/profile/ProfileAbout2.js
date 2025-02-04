import { Card, CardBody, CardText } from 'reactstrap'
import { Badge } from 'reactstrap'

const ProfileAbout2 = ({nationalCode , active , isDelete , twoStepAuth , receiveMessageEvent , phoneNumber}) => {
  return (
    <Card>
    <CardBody>

        <div className='mt-2'>
        <Badge className='mb-75'>کد ملی :</Badge>
        <CardText>{nationalCode}</CardText>
      </div>

      <div className='mt-2'>
        <Badge className='mb-75'>فعال / غیر فعال :</Badge>
        <div><Badge color={active === true ? 'success' : ' danger'}>{active === true ? 'فعال' : 'غیر فعال'}</Badge></div>

      </div>

      
      <div className='mt-2'>
        <Badge className='mb-75'> وضعیت حذف :</Badge>
        <div><Badge color={isDelete === false ? 'success' : ' danger'}>{isDelete === false ? 'سالمه' :  "حذف شده"}</Badge></div>
        {/* <CardText>{isDelete === false ? "عادی" : "حذف شده"}</CardText> */}
      </div>

      <div className='mt-2'>
        <Badge className='mb-75'>نوع ورود به پنل کاربری :</Badge>
        <CardText>{twoStepAuth === false ? "تک مرحله ای" : "دو مرحله ای"}</CardText>
      </div>

      <div className='mt-2'>
        <Badge className='mb-75'> وضعیت دریافت خبر ها :</Badge>
        <CardText>{receiveMessageEvent === true ? "فعال" : "غیر فعال"}</CardText>
      </div>
      

     
    </CardBody>
  </Card>
  )
}

export default ProfileAbout2