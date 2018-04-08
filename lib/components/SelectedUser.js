import React from 'react';
import { Label } from 'semantic-ui-react';

export default function({ user }) {
  return (
    <div className="d-flex justify-content-between">
      <p style={{ color: 'black' }} className="m-0">
        Recipient:
      </p>
      <Label
        className="w-100"
        as="a"
        image
        style={{ backgroundColor: '#4296cc' }}
      >
        <img src={`https://robohash.org/${user.email}.png?set=set4`} />
        {user.name}
      </Label>
    </div>
  );
}
