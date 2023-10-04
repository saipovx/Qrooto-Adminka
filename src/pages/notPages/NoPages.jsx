import React from 'react';
import n from './NoPages.module.scss'

const NotFound = () => {

  return (

    <div className={n.none}>

      <h2 className={n.none__title}>404 - Page Not Found</h2>

      <p className={n.none__subtitle}>Sorry, the page you are looking for does not exist.</p>

    </div>

  );
};

export default NotFound;