import { Canvas } from '@react-three/fiber';
import React, {
  Suspense,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import { Link, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { Environment, OrbitControls } from '@react-three/drei';
import LoaderTHREE from '../components/LoaderTHREE';
import Model from '../components/TestCubes';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios';
import Rating from '../components/Rating';
import { Store } from '../Store';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, product: action.payload };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function ProductScreen() {
  const [{ product, loading, error }, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: ''
  });
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { slug } = params;
  const [three, setThree] = useState(false);

  // const buttonRef = React.forwardRef((props, ref)=>{
  useEffect(() => {
    const fetchdata = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchdata();
  }, [slug]);

  const addToCartHandler = () => {};

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <main>
      <Helmet>
        <title>product {product.name}</title>
      </Helmet>
      <Link to="/">home</Link>
      <Row style={{ minHeight: '500px' }} className="g-0 mb-5">
        <Col md={9} style={{ position: 'relative' }}>
          <button
            className="setting-three d-flex justify-content-center align-items-center"
            disabled={three}
            style={{ display: three ? 'none' : 'block' }}
            onClick={() => setThree(!three)}
          >
            3D
          </button>
          {three ? (
            <Canvas style={{ minHeight: '500px' }}>
              <Suspense fallback={<LoaderTHREE />}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Model url={`models/${slug}.mpd`} />
                <OrbitControls />
                <Environment preset="sunset" />
              </Suspense>
              {/* <TestCubes position={[1.2, 0, 0]} /> */}
            </Canvas>
          ) : (
            // <iframe
            //   src="/test.html"
            //   title="iframe test"
            //   style={{ width: '100%', height: '100%' }}
            // ></iframe>
            <>
              {/* <button id="create"> build </button> */}
              <img className="img-large" src={product.image} alt="testing" />
            </>
          )}
        </Col>
        <Col md={3} className="ps-2">
          <ListGroup variant="flush">
            <Helmet>
              <title>{product.name}</title>
            </Helmet>

            {/* <ListGroup.Item>
              <Row xs={1} md={2} className="g-2">
                {[product.image, ...product.images].map((x) => (
                  <Col key={x}>
                    <Card>
                      <Button
                        className="thumbnail"
                        type="button"
                        variant="light"
                        onClick={() => setSelectedImage(x)}
                      >
                        <Card.Img variant="top" src={x} alt="product" />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </ListGroup.Item> */}
          </ListGroup>

          <Card style={{ boxShadow: '1px 1px 20px 0px rgba(0, 0, 0, 0.3)' }}>
            <Card.Body className="p-0">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row className="align-items-center">
                    <h2>{product.name}</h2>
                  </Row>

                  <Row>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                      slug={product.slug}
                    />
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <p>{product.description}</p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">Available</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button variant="primary" onClick={addToCartHandler}>
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div id="reviews">
        {product.reviews.length > 0 ? (
          <div>test</div>
        ) : (
          <MessageBox variant="info">
            {' '}
            There are no Reviews for this product...{' '}
          </MessageBox>
        )}
        {/* {userInfo ? (
          <Link to={`/product/${product.slug}`}>Leave a review</Link>
        ) : (
          <Link to="/signin">Sign in to leave a review</Link>
        )} */}
      </div>
    </main>
  );
}
