// ** Third Party Components
import classnames from 'classnames'
import { TrendingUp, User, Box, DollarSign } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useQuery } from 'react-query'
import instance from '../../interceptor'
import { useNavigate } from 'react-router-dom'

const StatsCard = ({ cols }) => {

  const {data: siteStats, status} = useQuery("siteStats", () =>  instance.get(`/Home/LandingReport`))
  const navigate = useNavigate()

  const data = [
    {
      title: 'تعداد اساتید',
      subtitle: siteStats?.teacherCount,
      color: 'light-primary',
      linkTo: '/UsersList/TeacherTable',
      icon: <User size={24} />
    },
    {
      title: 'تعداد دانشجویان',
      subtitle: siteStats?.studentCount,
      color: 'light-info',
      linkTo: '/UsersList/StudentTable',
      icon: <TrendingUp size={24} />
    },
    {
      title: 'تعداد دوره‌ها',
      subtitle: siteStats?.courseCount,
      color: 'light-danger',
      linkTo: '/CoursesList',
      icon: <Box size={24} />
    },
    {
      title: 'اخبار و مقالات',
      subtitle: siteStats?.newsCount,
      color: 'light-success',
      linkTo: '/news',
      icon: <DollarSign size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
          onClick={() => navigate(item.linkTo)}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>آمار سایت</CardTitle>
        {/* <CardText className='card-text font-small-2 me-25 mb-0'>Updated 1 month ago</CardText> */}
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
