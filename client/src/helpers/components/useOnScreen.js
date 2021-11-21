import React, { useState, useEffect } from 'react';

function useOnScreen() {
  const elem = document.getElementById("headerWrapper");

  if(!elem) {
    return false;
  }

  const [isIntersecting, setIntersecting] = useState(false)

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    {
      // root: document.getElementById("app"),
      // rootMargin: "0px",
      threshold: 0.75
    }
  )

  useEffect(() => {
    observer.observe(elem)
    return () => {
      observer.disconnect()
    }
  }, [])

  return isIntersecting;
}

export default useOnScreen;