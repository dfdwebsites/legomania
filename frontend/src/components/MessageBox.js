import { Alert } from 'bootstrap';
import React from 'react';

export default function MessageBox(props) {
  return <Alert variant={props.variant || 'info'}>{props.children}</Alert>;
}
