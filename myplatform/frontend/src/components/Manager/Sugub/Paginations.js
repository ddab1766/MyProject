import React from 'react';
import {Pagination} from 'rsuite';

const Paginations = ({ postsPerPage,totalPosts,setFilter, filter, paginate,current }) => {
  const page =  Math.ceil(totalPosts / postsPerPage)
  function handleSelect(eventKey) {
    paginate(eventKey);
    setFilter({...filter,['page']:eventKey})

  }

  return (
     <div style={{textAlign:'center'}}>
        <Pagination
          prev
          last
          next
          first
          size="lg"
          pages={page}
          activePage={current}
          onSelect={handleSelect}
        />

      </div>
  );
};

export default Paginations;
