import React, {useEffect, useState} from "react";

const useScroll_manager = () => {
  const [state, setState] = useState({ y: 0 });
  const handleFollow = () => {
        setState({y: document.getElementsByClassName('wrapper')[0].scrollTop}); // window 스크롤 값을 ScrollY에 저장
    }
  useEffect(() => {
    document.querySelector('.wrapper').addEventListener('scroll', handleFollow);
    return () => document.querySelector('.wrapper').removeEventListener('scroll', handleFollow);
  }, []);
  return state;
};

export default useScroll_manager;
