import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './HomePagination.css';

const HomePagination = ({ pageCurrent, pageCount, keyword }) =>
  pageCount > 1 && (
    <div className="home-pagination">
      {[...Array(pageCount).keys()].map((_, index) => {
        const pageNumber = index + 1;

        const pageLink = keyword
          ? `/search/${keyword}/page/${pageNumber}`
          : `/page/${pageNumber}`;

        const isPageActive = pageNumber === pageCurrent ? 'page-active' : '';

        return (
          <Link key={pageNumber} to={pageLink}>
            <span className={isPageActive}>{pageNumber}</span>
          </Link>
        );
      })}
    </div>
  );

HomePagination.defaultProps = {
  pageCurrent: null,
  pageCount: null,
  keyword: '',
};

HomePagination.propTypes = {
  pageCurrent: PropTypes.number,
  pageCount: PropTypes.number,
  keyword: PropTypes.string,
};

export default HomePagination;
