import React, { useEffect, useReducer, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LoadingBox from '../components/LoadingBox';
import ProdcutCard from '../components/ProdcutCard';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Button from 'react-bootstrap/esm/Button';
import CanvasBG from '../components/CanvasBG';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

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

  const [activeProduct, setActiveProduct] = useState(0);

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

  const getLatestProducts = (num) => {
    let latestProducts = products.sort((a, b) => {
      let da = new Date(a.createdAt),
        db = new Date(b.createdAt);
      return db - da;
    });

    return latestProducts.slice(0, num);
  };

  const getFeaturedProducts = () => {
    let featuredProducts = products.filter((x) => x.isFeatured);
    return featuredProducts;
  };

  return (
    <div>
      <CanvasBG />
      <Container>
        <div>
          <Helmet>
            <title>LegoMania</title>
          </Helmet>
          {loading ? (
            <LoadingBox />
          ) : (
            <>
              <div className="hero">
                <div className="d-flex">
                  <div className="imgContainer me-3">
                    <img
                      className="img-large"
                      src={products[activeProduct].image}
                      alt={products[activeProduct].name}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <p>{products[activeProduct].description}</p>
                    <Link to={`/product/${products[activeProduct].slug}`}>
                      See more...
                    </Link>
                  </div>
                </div>
                <Button
                  onClick={() =>
                    setActiveProduct((prev) => {
                      let newProduct = prev - 1;
                      if (newProduct < 0) {
                        newProduct = products.length - 1;
                      }
                      return newProduct;
                    })
                  }
                >
                  <i className="fas fa-chevron-left"></i>
                </Button>
                <Button
                  onClick={() =>
                    setActiveProduct((prev) => {
                      let newProduct = prev + 1;
                      if (newProduct > products.length - 1) {
                        newProduct = 0;
                      }
                      return newProduct;
                    })
                  }
                >
                  <i className="fas fa-chevron-right"></i>
                </Button>
              </div>

              <Row className="my-5">
                <h2>Latest Products</h2>
                {getLatestProducts(3).map((product) => (
                  <Col key={product.slug} sm={6} md={4} ls={3} className="mb-5">
                    <ProdcutCard product={product} />
                  </Col>
                ))}
              </Row>
              <Row className="my-5">
                <h2>Featured Products</h2>
                {getFeaturedProducts().map((product) => (
                  <Col key={product.slug} sm={6} md={4} ls={3} className="mb-5">
                    <ProdcutCard product={product} />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
