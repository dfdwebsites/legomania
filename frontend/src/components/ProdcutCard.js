import React, { createElement, useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import CartConfirm from './CartConfirm';

export default function ProdcutCard(props) {
  const [addtoCartclicked, setAddtoCartclicked] = useState(false);
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems }
  } = state;

  const closeDiv = () => {
    setAddtoCartclicked(false);
  };

  const addToCartHandler = (item) => {
    setAddtoCartclicked(true);
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  return (
    <>
      {addtoCartclicked && (
        <CartConfirm product={product} closeDiv={closeDiv} />
      )}
      <Card>
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
          />
        </Link>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>

          <Card.Text>{product.details}</Card.Text>
          <div className="d-flex justify-content-between mb-3">
            Price: ${product.price}{' '}
            <Link to={`/product/${product.slug}`}>Learn more..</Link>
          </div>
          <Button variant="primary" onClick={() => addToCartHandler(product)}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
