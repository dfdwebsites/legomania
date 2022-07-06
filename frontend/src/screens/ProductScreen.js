import { Canvas } from '@react-three/fiber';
import React, {
  Suspense,
  useEffect,
  useReducer,
  useRef,
  useState
} from 'react';
import { Link, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Environment, OrbitControls } from '@react-three/drei';
import LoaderTHREE from '../components/LoaderTHREE';
import Model from '../components/TestCubes';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios';

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
  }, []);

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
      <Row style={{ minHeight: '500px' }}>
        <Col md={6} style={{ position: 'relative' }}>
          <button
            className="setting-three d-flex justify-content-center align-items-center"
            disabled={three}
            style={{ display: three ? 'none' : 'block' }}
            onClick={() => setThree(!three)}
          >
            3D
          </button>
          {three ? (
            <Canvas>
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
              <img className="img-large" src="/images/test.jpg" alt="testing" />
            </>
          )}
        </Col>
        <Col md={3}>
          <ul>
            <li>{product.name}</li>
            <li>{product.description}</li>
            <li>
              <Button> Add to cart</Button>
            </li>
          </ul>
        </Col>
        <Col md={3}>
          <ul>
            <li>testing header</li>
            <li>
              <p>psum dolor situere pnmis suspendisse ve</p>
            </li>
            <li>
              <Button> Add to cart</Button>
            </li>
          </ul>
        </Col>
      </Row>
    </main>
  );
}
