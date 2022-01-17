import React, { useCallback, useEffect, useRef, useState } from "react";

import useIdle from "./useIdle";

import SlideLink from "./SlideLink";
import Wrapper from "./Wrapper";
import Slide from "./Slide";

const BlogPostCardSlider = ({ children }) => {
  // console.log("render"); //Note -> when we hit "prev" or "next" and we are in the minimum/maximum value,
  //the component does not get rendered again. That's because the targetSlide state value does not change!
  // console.log(children);

  //State and refs:
  const [visibleSlide, setVisibleSlide] = useState(0);
  const [targetSlide, setTargetSlide] = useState(0);
  const wrapperRef = useRef(null);
  const targetSlideRef = useRef(null);

  /*
    As we can see, we are using useCallback in every function defined.
    That's not always a clever use of useCallback(). useCallback() should
    be used in cases where the children component are way to heavy and we don't
    want function objects recreations.
    See: https://dmitripavlutin.com/dont-overuse-react-usecallback/
  */
  const scrollToTargetSlide = useCallback(() => {
    const targetSlide = targetSlideRef.current; //gets html tag of slide to be scrolled to (Slide component below)
    const wrapper = wrapperRef.current; //gets html tag of wrapper of that slide (Wrapper component below -> Wrapper for Slide component)

    // console.log("targetSlide:");
    // console.log(targetSlide);
    // console.log("wrapper:");
    // console.log(wrapper);
    console.log("targetSlide.offsetLeft:");
    console.log(targetSlide.offsetLeft);
    // console.log("targetSlide.scrollWidth:");
    // console.log(targetSlide.scrollWidth);
    // console.log("wrapper.offsetLeft:");
    // console.log(wrapper.offsetLeft);
    // console.log("wrapper.scrollWidth:");
    // console.log(wrapper.scrollWidth);

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
    [targetSlide]
  );
  const moveRight = useCallback(
    (targetSlide) => Math.min(targetSlide + 1, children.length - 1),
    [children]
  );

  const handleScroll = useCallback(() => {
    // console.log("wrapperRef.current.getBoundingClientRect():");
    // console.log(wrapperRef.current.getBoundingClientRect());

    let { width } = wrapperRef.current.getBoundingClientRect(); //This is always the width of the visible wrapper.
    let { scrollLeft } = wrapperRef.current;

    // console.log("scrollLeft:");
    // console.log(scrollLeft); //scrollLeft scrolls through all the width of the wrapper, including the non visible parts (which are scrollable)

    setVisibleSlide(Math.round(scrollLeft / width)); //is we are at 51% of the next div, then we will scroll when idle. If not, will remain in the same slide.
    touchScroll();
  }, [touchScroll]);

  useEffect(scrollToTargetSlide, [targetSlide]);

  /*
    For SlideLink Component:
    1. key will get the key of the mapping.
    2. isActive will be a bool -> true if the index of the mapping is equal to the visibleSlide, false elsewhere.
    3. Each of this components will have an onClick event listener. When I click it, targetSlide component gets his number.
    4. The name of the SlideLink component will be {i + 1} because the array starts from 0 (and we want 1 to 4 numeration).
    ---
    For Wrapper Component:
    1. Wrapper is the div wrapping the Slide<s> components.
    ---
    For Slide Component:
    1. ref is assigned dynamically depending on the targetSlide. 
  */
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
