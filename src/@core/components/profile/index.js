// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Custom Components
import UILoader from '@components/ui-loader'
import Breadcrumbs from '@components/breadcrumbs'

// ** Reactstrap Imports
import { Row, Col, Button } from 'reactstrap'

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
                {data &&  <ProfileAbout  email={data.gmail} phoneNumber={data.phoneNumber} gender={data.gender} birthDay={data.birthDay} insertDate={data.insertDate}   />}
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

                <Col lg={{ size: 4, order: 1 }} sm={{ size: 12 }} xs={{ order: 3 }}>
                  {data && <StatsVertical icon={<Mail size={21} />} stats='توضیحات' statTitle={data.userAbout}/> } 
                </Col>
                

                <Col lg={{ size: 4, order: 1 }} sm={{ size: 12 }} xs={{ order: 3 }}>
                  {data && <StatsVertical icon={<ShoppingBag size={21} />} stats='توضیحات' statTitle={data.userAbout}/> } 
                </Col>                  


                <Col lg={{ size: 4, order: 1 }} sm={{ size: 12 }} xs={{ order: 3 }}>
                  {data && <StatsVertical icon={<ShoppingBag size={21} />} stats='توضیحات' statTitle={data.userAbout}/> } 
                </Col>
            </Row>


            <Row>
              <Col className='text-center' sm='12'>
                <Button color='primary' className='border-0 mb-1 profile-load-more' size='sm' >
      
                    <span> Load More</span>
                  
                </Button>
              </Col>
            </Row>
          </section>
        </div>
      
    </Fragment>
  )
}

export default Profile
