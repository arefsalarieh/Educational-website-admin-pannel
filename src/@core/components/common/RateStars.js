import React from 'react'
import { Star } from 'react-feather'
import Rating from 'react-rating'
import { Card, CardBody } from 'reactstrap'

function RateStars({rate}) {
  return (
    <Card>
    <CardBody className='pt-3'>
      <Rating
        readonly
      //   direction={dir}
        initialRating={rate}
        emptySymbol={<Star size={15} fill="#babfc7" stroke="#babfc7" />}
        fullSymbol={
          <Star size={15} fill="#FFBF00" stroke="text-warning" />
        }
      />
    </CardBody>
  </Card>
  )
}

export default RateStars