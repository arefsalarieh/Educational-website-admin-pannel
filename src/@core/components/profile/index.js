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
              <Col lg={{ size: 3, order: 1 }} sm={{ size: 12 }} xs={{ order: 2 }}>
                <ProfileAbout  />
                {/* <ProfileSuggestedPages data={data.suggestedPages} /> */}
                {/* <ProfileTwitterFeeds data={data.twitterFeeds} /> */}
              </Col>
              <Col lg={{ size: 6, order: 2 }} sm={{ size: 12 }} xs={{ order: 1 }}>
                {/* <ProfilePosts data={data.post} /> */}
              </Col>
              <Col lg={{ size: 3, order: 3 }} sm={{ size: 12 }} xs={{ order: 3 }}>
                {/* <ProfileLatestPhotos data={data.latestPhotos} /> */}
                {/* <ProfileFriendsSuggestions data={data.suggestions} /> */}
                {/* <ProfilePoll data={data.polls} /> */}
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
