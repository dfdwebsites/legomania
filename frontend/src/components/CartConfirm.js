import React, { useRef } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate } from 'react-router-dom';

export default function CartConfirm(props) {
  const cartConfirmRef = useRef();
  const { product } = props;
  const navigate = useNavigate();
  return (
    <div
      ref={cartConfirmRef}
      id="cart-confirm-container"
      className="d-flex justify-content-center align-items-center cart-confirm-container"
    >
      <div className="confirm-card">
        <Row className="mb-2 align-items-end">
          <Col md={1}>
            {' '}
            <i
              class="fas fa-check-circle"
              style={{ color: 'green', fontSize: '1.5rem' }}
            ></i>
          </Col>
          <Col md={10}>
            <div>Item succesfully added to cart</div>
          </Col>
          <Col md={1}>
            <button className="close-btn" onClick={() => props.closeDiv()}>
              <i class="fas fa-times"></i>
            </button>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={4} className="align-items-center d-flex">
            <img src={product.image} alt={product.name} />
          </Col>
          <Col className="p-0">
            <Row className="mb-2">
              <Col>{product.name}</Col>
            </Row>

            <Row className="mb-2">
              <Col>
                <strong>${product.price}</strong>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col>Qty:{product.quantity}</Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="d-flex justify-content-center">
            {' '}
            <Button style={{ width: '80%' }} onClick={() => props.closeDiv()}>
              {' '}
              Continiue Shopping
            </Button>
          </Col>
          <Col md={6} className="d-flex justify-content-center">
            {' '}
            <Button style={{ width: '80%' }} onClick={() => navigate('/cart')}>
              View My Bag
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
