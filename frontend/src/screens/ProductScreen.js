import { Canvas } from '@react-three/fiber';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Environment, OrbitControls } from '@react-three/drei';
import LoaderTHREE from '../components/LoaderTHREE';
import Model from '../components/TestCubes';

export default function ProductDelailsScreen() {
  const params = useParams();
  const { slug } = params;
  const [three, setThree] = useState(false);

  // const buttonRef = React.forwardRef((props, ref)=>{
  useEffect(() => {
    console.log();
  });

  return (
    <div>
      <Link to="/">home</Link>
      <Row>
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
            <li>testing header</li>
            <li>
              <p>
                psum dolor sit amet consectetur adipiscing elit tempus, gravida
                felis et platea convallis lacinia etiam facilisi in, id a ut ac
                enim luctus penatibus. Inceptos taciti facilisis lobortis montes
                ridiculus pharetra dis tristique primis parturient nec aptent
                ullamcorper quisque, purus pulvinar mauris a et risus posuere
                placerat cum pellentesque proin at. Sem porta placerat dictumst
                primis suspendisse ve
              </p>
            </li>
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
    </div>
  );
}
