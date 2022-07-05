import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import ProdcutCard from '../components/ProdcutCard';
import data from '../data.js';

export default function HomeScreen() {
  const { products } = data;

  console.log(products);
  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product.slug} sm={6} md={4} ls={3} className="mb-3">
            <ProdcutCard product={product} />
          </Col>
        ))}
      </Row>
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
