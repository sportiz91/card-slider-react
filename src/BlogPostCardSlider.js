import React, { useCallback, useEffect, useRef, useState } from "react";

import useIdle from "./useIdle";

import SlideLink from "./SlideLink";
import Wrapper from "./Wrapper";
import Slide from "./Slide";

const BlogPostCardSlider = ({ children }) => {
  const [visibleSlide, setVisibleSlide] = useState(0);
  const [targetSlide, setTargetSlide] = useState(0);
  const wrapperRef = useRef(null);
  const targetSlideRef = useRef(null);

  const scrollToTargetSlide = useCallback(() => {
    const targetSlide = targetSlideRef.current;
    const wrapper = wrapperRef.current;
    if (wrapper && targetSlide) {
      wrapper.scrollTo({
        top: 0,
        left: targetSlide.offsetLeft,
        behavior: "smooth",
      });
    }
  }, []);

  const finishScrolling = useCallback(() => {
    setTargetSlide(visibleSlide);
    scrollToTargetSlide();
  }, [visibleSlide, scrollToTargetSlide]);
  const touchScroll = useIdle({ timeout: 500, onIdle: finishScrolling });

  const moveLeft = useCallback(
    (targetSlide) => Math.max(0, targetSlide - 1),
    []
  );
  const moveRight = useCallback(
    (targetSlide) => Math.min(targetSlide + 1, children.length - 1),
    [children]
  );

  const handleScroll = useCallback(() => {
    let { width } = wrapperRef.current.getBoundingClientRect();
    let { scrollLeft } = wrapperRef.current;

    setVisibleSlide(Math.round(scrollLeft / width));
    touchScroll();
  }, [touchScroll]);

  useEffect(scrollToTargetSlide, [targetSlide]);

  return (
    <div id="trap" tabIndex="0">
      <button onClick={() => setTargetSlide(moveLeft)}>PREV</button>

      {children.map((_, i) => {
        return (
          <SlideLink
            key={`slideLink-${i}`}
            isActive={visibleSlide === i}
            onClick={() => setTargetSlide(i)}
          >
            {i + 1}
          </SlideLink>
        );
      })}
      <button onClick={() => setTargetSlide(moveRight)}>NEXT</button>

      <Wrapper onScroll={handleScroll} ref={wrapperRef}>
        {children.map((child, i) => (
          <Slide
            key={`slide-${i}`}
            ref={i === targetSlide ? targetSlideRef : null}
          >
            {child}
          </Slide>
        ))}
      </Wrapper>
    </div>
  );
};

export default BlogPostCardSlider;
