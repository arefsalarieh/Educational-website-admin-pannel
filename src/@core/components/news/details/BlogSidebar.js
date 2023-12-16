// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'

// ** Third Party Components
import axios from 'axios'
import classnames from 'classnames'
import * as Icon from 'react-feather'

// ** Custom Components
import AvatarVuexy from '@components/avatar'
import ReactAvatar from 'react-avatar'

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText } from 'reactstrap'
import { useQuery } from 'react-query'
import instance from '../../../interceptor'

const BlogSidebar = () => {
  // ** States
  const [data, setData] = useState(null)

  // useEffect(() => {
  //   axios.get('/blog/list/data/sidebar').then(res => setData(res.data))
  // }, [])

  const CategoryColorsArr = {
    Quote: 'light-info',
    Fashion: 'light-primary',
    Gaming: 'light-danger',
    Video: 'light-warning',
    Food: 'light-success'
  }

  const {data: newsForSlide} = useQuery("newsForSlide", () => {return instance.get('/News?PageNumber=1&RowsOfPage=5&SortingCol=InsertDate&SortType=DESC')})

  const {data: catForSlider} = useQuery("catForSlider", () => {return instance.get('/News/GetListNewsCategory')})
  console.log(catForSlider);

  const renderRecentPosts = () => {
    return newsForSlide?.news.map((post, index) => {
      return (
        <div
          key={index}
          className={classnames('d-flex', {
            'mb-2': index !== newsForSlide.news.length - 1
          })}
        >
          <Link className='me-2' to={`/pages/blog/detail/${post.id}`}>
            <img className='rounded' src={post.currentImageAddressTumb} alt={post.title} width='100' height='70' />
          </Link>
          <div>
            <h6 className='blog-recent-post-title'>
              <Link className='text-body-heading' to={`/pages/blog/detail/${post.id}`}>
                {post.title}
              </Link>
            </h6>
            <div className='text-muted mb-0'>{post.updateDate.slice(0,10)}</div>
          </div>
        </div>
      )
    })
  }

  const renderCategories = () => {
    return catForSlider?.map((item, index) => {
      // const IconTag = Icon[item.icon]

      return (
        <div
          key={index}
          className={classnames('d-flex justify-content-start align-items-center', {
            'mb-75': index !== catForSlider?.length - 1
          })}
        >
          <a className='me-75' href='/' onClick={e => e.preventDefault()}>
            {/* <AvatarVuexy className='rounded' img={item.iconAddress} /> */}
            <ReactAvatar round name={item.categoryName} size='45' />
          </a>
          <a href='/' onClick={e => e.preventDefault()}>
            <div className='blog-category-title text-body h5'>{item.categoryName}</div>
          </a>
        </div>
      )
    })
  }

  return (
    <div className='sidebar-detached sidebar-right'>
      <div className='sidebar'>
        <div className='blog-sidebar right-sidebar my-2 my-lg-0'>
          <div className='right-sidebar-content'>
            {/* <div className='blog-search'>
              <InputGroup className='input-group-merge'>
                <Input placeholder='Search here' />
                <InputGroupText 
                // onChange={(e) => handleChange(e.target.value)}
                >
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup>
            </div> */}
            {newsForSlide !== null ? (
              <Fragment>
                <div className='blog-recent-posts mt-3'>
                  <h6 className='section-label'>آخرین اخبار</h6>
                  <div className='mt-75'>{renderRecentPosts()}</div>
                </div>
                <div className='blog-categories mt-3'>
                  <h6 className='section-label'>Categories</h6>
                  <div className='mt-1'>{renderCategories()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar
