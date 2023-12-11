import React from 'react';
import  Helmet from'react-helmet';

const metadata = (props) => {
  return (
    <Helmet> 
        <title>{props.title}</title>
    </Helmet>
  )
}

export default metadata