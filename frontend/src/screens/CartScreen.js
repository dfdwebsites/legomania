import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { Store } from '../Store';

export default function CartScreen() {
  //   const [state, dispatch: ctxDispatch] = useContext(Store);
  //   const {
  //     cart: { cartitems }
  //   } = state;

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems }
  } = state;

  return (
    <div>
      <Helmet>
        <title>My Bag</title>
      </Helmet>
      <h1>My Bag ({cartItems.reduce((a, c) => c.quantity + a, 0)}) </h1>
      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <Row key={item._id}>
              <Col md={2}>
                <Link to={`/product/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-thumbnail"
                  />
                </Link>
              </Col>
              <Col md={4}>
                {item.name} <br />${item.price}
              </Col>
              <Col md={5}>
                <button>
                  <i className="fas fa-minus"></i>
                </button>
                {item.quantity}
                <button>
                  <i className="fas fa-plus"></i>
                </button>
              </Col>
              <Col md={1}>
                <button>
                  {' '}
                  <i className="fas fa-trash-alt"></i>
                </button>
              </Col>
            </Row>
          ))}
        </Col>
        <Col md={4}>action stuff</Col>
      </Row>
    </div>
  );
}
