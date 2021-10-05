// Import stylesheets
import './style.css';
import { gsap, TweenMax } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Костыль
// import ScrollMagic from 'scrollmagic';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
// import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

// ScrollMagicPluginGsap(ScrollMagic, TweenMax);

gsap.registerPlugin(ScrollTrigger);

// const controller = new ScrollMagic.Controller();
const photoWrappers = gsap.utils.toArray('.photo-wrapper');
const lastIndex = photoWrappers.length;

const DURATION_IN_SECONDS = 2 * Math.floor(lastIndex / 2);
const DURATION_FOR_DESCRIPTION = DURATION_IN_SECONDS / lastIndex;
const tween = gsap.timeline({ duration: DURATION_IN_SECONDS });
// gsap.to(`body`, {
//   duration: DURATION_IN_SECONDS,
//   scrollTrigger: {
//     trigger: `.animation`,
//     start: `top center`,
//     end: `bottom 30%`,
//     toggleActions: `restart none reverse none`,

//     markers: {
//       startColor: `green`,
//       endColor: `black`,
//       fontSize: `18px`,
//       indent: 500,
//     },
//     toggleClass: { targets: [`body`, `.animation`], className: `black` },
//   },
// });

gsap.to(`.front`, {
  x: `+200vw`,
  duration: 5,
  repeat: -1,
  ease: `none`,
});
gsap.to(`.back`, {
  x: `-200vw`,
  duration: 5,
  repeat: -1,
  ease: `none`,
});

photoWrappers.forEach((el, i) => {
  // Top offset
  if (i !== 0) {
    el.style.top = `${110 * i}vh`;
  }
});

// const a = gsap.timeline();

photoWrappers.forEach((container, i) => {
  const descriptions = container.querySelectorAll(`.description`);

  container.classList.add(`photo-wrapper-${i}`);

  descriptions.forEach((el) => {
    el.classList.add(`description-${i}`);
  });
});

photoWrappers.forEach((container, i) => {
  if (i > 0) {
    // const prevContainer = photoWrappers[i - 1];
    // const prevDescription = prevContainer.querySelectorAll(`.description`);

    // console.log(prevContainer);

    // a.add(
    const a = gsap.to(`.description-${i - 1}`, {
      y: `-20vh`,
      alpha: 0,
      duration: DURATION_FOR_DESCRIPTION,
      ease: `none`,
    });

    console.log(a);
    // );
    // a.add(
    //   gsap.to(prevDescription, {
    //     y: `+20vh`,
    //     alpha: 0,
    //     duration: DURATION_FOR_DESCRIPTION,
    //     ease: `none`,
    //   })
    // );

    if (i !== 2) {
      ScrollTrigger.create({
        trigger: `.photo-${i}`,
        // scroller: `body`,
        animation: a,
        start: `top bottom`,
        end: `top 60%`,
        // scrub: true,
        pin: `.description-${i - 1}`,
        toggleActions: `restart none reverse none`,
        // markers: {
        //   fontSize: `20px`,
        //   indent: 100 * i,
        // },
      });
    } else {
      ScrollTrigger.create({
        trigger: `.photo-${i}`,
        // scroller: `body`,
        animation: a,
        start: `top bottom`,
        end: `top 20%`,
        // scrub: true,
        pin: `.description-${i - 1}`,
        toggleActions: `restart none reverse none`,
        markers: {
          fontSize: `20px`,
          indent: 100,
        },
      });
    }
  }
});

photoWrappers.forEach((container, i) => {
  if (i !== 0) {
    // For nextContainers
    const containerAnimation = gsap.to(container, {
      top: 0,
      duration: 1,
    });
    tween.add(containerAnimation);
  }
});

ScrollTrigger.create({
  trigger: `section`,
  animation: tween,
  scrub: true,
  pin: `.animation`,
  toggleActions: `restart none reverse none`,
  //
  // markers: {
  //   startColor: `blue`,
  //   endColor: `red`,
  //   fontSize: `18px`,
  //   indent: 200,
  // },
});

// Main Scroller
ScrollTrigger.create({
  trigger: `section`,
  start: `top center`,
  end: `80% 30%`,
  endTrigger: `photo-${lastIndex - 1}`,
  toggleActions: `restart none reverse none`,

  // markers: {
  //   startColor: `green`,
  //   endColor: `black`,
  //   fontSize: `18px`,
  //   indent: 500,
  // },
  toggleClass: { targets: [`body`, `.animation`], className: `black` },
});

// const scene = new ScrollMagic.Scene({
//   triggerElement: `.animation`,
//   duration: 10,
//   triggerHook: 0,
//   reverse: true,
// })
//   .setTween(tween)
//   .setPin(`.animation`)
//   .addIndicators({
//     fontSize: `20px`,
//     indent: 100,
//   })
//   .addTo(controller);
