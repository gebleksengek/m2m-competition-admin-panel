import { Fragment, useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Link } from 'react-router-dom'
import { MessageSquare } from 'react-feather'
import Breadcrumbs from '@components/breadcrumbs'
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Button,
  Media
} from 'reactstrap'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'

import '@styles/base/pages/page-blog.scss'
import apiConfig from '@configs/api'

const GalleryList = () => {
  const [data, setData] = useState([])
  const [isLoad, setIsLoad] = useState(false)
  const [hasNext, setHasNext] = useState(true)
  const [page, setPage] = useState(1)

  const isHasNext = async () => {
    return await axios.get(
      `${apiConfig.apiEndpoint}/gallery?page=${page + 1}`
    ).then(
      res => {
        if (res.data.status) {
          return res.data.data.length > 0
        }
        return false
      }
    ).catch(
      (e) => {
        console.log(e)
        return false
      }
    )
  }

  const loadGallery = async (page) => {
    if (isLoad) return

    setIsLoad(true)
    await axios.get(
      `${apiConfig.apiEndpoint}/gallery?page=${page}&limit=10&sort=-1`
    ).then(
      async res => {
        if (res.data.status) {
          const dataTmp = [...data, ...res.data.data]
          setData(dataTmp.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i))
          console.log(dataTmp.length)
          setHasNext(await isHasNext())
        }
      }
    )
    setIsLoad(false)
  }

  useEffect(async () => {
    if (hasNext) {
      await loadGallery(page)
    }
  }, [page])


  const renderRenderList = () => {
    return data.map(item => {
      return (
        <Col key={item.id} md='12'>
          <Card>
            <Link to={`/gallery/detail/${item.id}`}>
              <CardImg className='img-fluid' src={`${apiConfig.apiEndpoint}/assets/${item.content.id}`} alt={item.content.title} top />
            </Link>
            <CardBody>
              <CardTitle tag='h4'>
                <Link className='blog-title-truncate text-body-heading' to={`/gallery/detail/${item.id}`}>
                  {item.content.title}
                </Link>
              </CardTitle>
              <Media>
                <Avatar className='mr-50' img={item.uploader.profileImageUrl} imgHeight='24' imgWidth='24' />
                <Media body>
                  <small className='text-muted mr-25'>by {item.uploader.name}</small>
                  <span className='text-muted ml-50 mr-25'>|</span>
                  <small className='text-muted'>{item.created_at}</small>
                </Media>
              </Media>
              <CardText className='blog-content-truncate'>{item.content.description}</CardText>
              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <Link className='font-weight-bold' to={`/gallery/detail/${item.id}`}>
                  Detail
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      )
    })
  }

  return (
    <Fragment>
      <Breadcrumbs
        breadCrumbTitle='Gallery List'
        breadCrumbParent='Gallery'
        breadCrumbActive='List'
      />
      <div className='blog-wrapper'>
        <div className='content-body'>
          {data.length > 0 ? (
            <div className='blog-list-wrapper'>
              <Row>
                <Col>
                  <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                  >
                    <Masonry>
                      {renderRenderList()}
                    </Masonry>
                  </ResponsiveMasonry>
                </Col>
              </Row>
              {
                hasNext ? (
                  <Row className="d-flex justify-content-center">
                    <Col md={6} xs={12} >
                      <Button.Ripple onClick={() => setPage(page + 1)} block color="primary">
                        Load More
                      </Button.Ripple>
                    </Col>
                  </Row>
                ) : null
              }
            </div>
          ) : null}
        </div>
      </div>
    </Fragment >
  )
}

export default GalleryList
