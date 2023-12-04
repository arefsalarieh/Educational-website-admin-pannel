// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Button, Card, CardTitle, CardBody, CardText, CardSubtitle, CardLink, CardImg, Row, Col  } from 'reactstrap'

// ** Demo Components
import ProfilePoll from './ProfilePolls'
import ProfileAbout from './ProfileAbout'
import ProfilePosts from './ProfilePosts'
import ProfileHeader from './ProfileHeader'
import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestPhotos from './ProfileLatestPhotos'
import ProfileSuggestedPages from './ProfileSuggestedPages'
import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'
import { useParams } from "react-router-dom";
import http from '../../../@core/interceptor'
import {useQuery} from 'react-query'

// ** Styles
import '@styles/react/pages/page-profile.scss'
import StatsVertical from '../StatsVertical/StatsVertical'
import StatsHorizontal from '../StatsHorizontal/StatsHorizontal'
import {
  Eye,
  Cpu,
  Heart,
  Award,
  Truck,
  Server,
  Activity,
  ShoppingBag,
  AlertOctagon,
  MessageSquare,
  Mail
} from 'react-feather'
import gmailImage from '../../../../src/assets/images/NewImage/gmail.png'
import linkedinImage from '../../../../src/assets/images/NewImage/linkedin.png'
import telegramImage from '../../../../src/assets/images/NewImage/telegram.png'
import phoneImage from '../../../../src/assets/images/NewImage/phone.png'
import UserReservedCourse from './UserReservedCourse'
import UserAcceptCourse from './UserAcceptCourse'

const Profile = () => {

  const {id} = useParams();


  const getUsersInfo =async () =>{
    const result = await http.get(`/User/UserDetails/${id}`)
    return result;
  }

  const {data , status} = useQuery(['userInfo' , id] , getUsersInfo )

  // data && console.log(data);

  return (
    <Fragment>
      <Breadcrumbs title='Profile' data={[{ title: 'Pages' }, { title: 'Profile' }]} />
      
        <div id='user-profile'>
          <Row>
            <Col sm='12'>
              {data && <ProfileHeader  pic={data.currentPictureAddress} fName={data.fName} lName={data.lName}   />}
            </Col>
          </Row>
          <section id='profile-info'>
            <Row>
              
              <Col lg={{ size: 4, order: 1 }} sm={{ size: 12 }} xs={{ order: 1 }}>
                {data &&  <ProfileAbout  id={data.id} gender={data.gender} birthDay={data.birthDay} insertDate={data.insertDate}   />}
              </Col>

              <Col lg={{ size: 8, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
                <Row lg={{ size: 4, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
                  {data && <StatsVertical icon={<Eye size={21} />}   stats='آدرس' statTitle={data.homeAdderess}/> } 
                </Row>

                <Row lg={{ size: 4, order: 1 }} sm={{ size: 12 }} xs={{ order: 3 }}>
                  {data && <StatsVertical icon={<ShoppingBag size={21} />} stats='توضیحات' statTitle={data.userAbout}/> } 
                </Row>  
              </Col>

            </Row>

            <Row>

              <Col lg='3' md='6'>
                <Card>
                  <CardImg top src={gmailImage} alt='Card cap' />
                  <CardBody>
                    <CardTitle tag='h4'> Gmail</CardTitle>
                    <CardText>
                      {data && ( data.gmail === null ? "کاربر اکانت gmail را وارد نکرده" : data.gmail)}
                    </CardText>
                    <Button color='primary' outline>
                        Go to gmail
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Col lg='3' md='6'>
                <Card>
                  <CardImg top src={linkedinImage} alt='Card cap' />
                  <CardBody>
                    <CardTitle tag='h4'>Linkedin </CardTitle>
                    <CardText>
                      {data && ( data.linkdinProfile === null ? "کاربر اکانت linkedin را وارد نکرده" : data.linkdinProfile)}
                     </CardText>

                    <Button color='primary' outline>
                      Go to linkedin
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Col lg='3' md='6'>
                <Card>
                  <CardImg top src={telegramImage} alt='Card cap' />
                  <CardBody>
                    <CardTitle tag='h4'> Telegram</CardTitle>
                    <CardText>
                        {data && ( data.telegramLink === null ? "کاربر اکانت telegram را وارد نکرده" : data.telegramLink)}
                    </CardText>
                    <Button color='primary' outline>
                      Go to telegram
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Col lg='3' md='6'>
                <Card>
                  <CardImg top src={phoneImage} alt='Card cap' />
                  <CardBody>
                    <CardTitle tag='h4'>Phone Number </CardTitle>
                    <CardText>
                       {data && ( data.phoneNumber === null ? "کاربر شماره تماس را وارد نکرده" : data.phoneNumber)}
                    </CardText>
                    <Button color='primary' outline>
                        Call 
                    </Button>
                  </CardBody>
                </Card>
              </Col>

            </Row>


            <Row>
              <Col lg='6'>
                 {data && <UserReservedCourse coursesReseves={data.coursesReseves}/>}              
              </Col>

              <Col lg='6'>
                 {data && <UserAcceptCourse courses={data.courses}/>}              
              </Col>
            </Row>



          </section>
        </div>
      
    </Fragment>
  )
}

export default Profile
