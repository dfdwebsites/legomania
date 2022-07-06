import React, { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LoadingBox from '../components/LoadingBox';
import ProdcutCard from '../components/ProdcutCard';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export default function HomeScreen() {
  const [{ loading, products, error }, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: ''
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchdata();
  }, []);

  console.log(products);
  return (
    <div>
      <Helmet>
        <title>LegoMania</title>
      </Helmet>
      {loading ? (
        <LoadingBox />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.slug} sm={6} md={4} ls={3} className="mb-3">
              <ProdcutCard product={product} />
            </Col>
          ))}
        </Row>
      )}
      <canvas className="main-bg-canvas"></canvas>
      {/* <Link to="/product/car">car</Link> <Link to="/product/boat">boat</Link>{' '}
      <Link to="/product/cafe">cafe</Link> <Link to="/product/4955">truck</Link>{' '}
      <Link to="/product/fast-car">fast car</Link>
      <Link to="/product/offroad-power">Off Road</Link>
      <Link to="/product/truck">OTHER truck</Link>
      <LoadingBox /> */}
    </div>
  );
}
