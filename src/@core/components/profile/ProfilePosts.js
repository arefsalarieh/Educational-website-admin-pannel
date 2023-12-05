// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import { Heart, MessageSquare, Share2 } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardBody, CardText, Row, Col, UncontrolledTooltip, Input, Label, Button } from 'reactstrap'

const ProfilePosts = ({ data }) => {
  const renderPosts = () => {
    return data.map(post => {
      return (
        <div>
          rku
        </div>
      )
    })
  }
  return renderPosts()
}
export default ProfilePosts
