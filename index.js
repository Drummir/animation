// Import stylesheets
import './style.css';
import { gsap, TweenMax } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Костыль
import ScrollMagic from 'scrollmagic';
import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
import { ScrollMagicPluginGsap } from 'scrollmagic-plugin-gsap';

ScrollMagicPluginGsap(ScrollMagic, TweenMax);

gsap.registerPlugin(ScrollTrigger);

gsap.to(`body`, {
  duration: 1,
  scrollTrigger: {
    trigger: `.animation`,
    start: `top center`,
    end: `bottom 30%`,
    toggleActions: `restart none reverse none`,
    //
    // markers: {
    //   startColor: `blue`,
    //   endColor: `red`,
    //   fontSize: `18px`,
    // },
    toggleClass: { targets: [`body`, `.animation`], className: `black` },
  },
});

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

const tween = gsap.timeline();
const controller = new ScrollMagic.Controller();
const photoWrappers = gsap.utils.toArray('.photo-wrapper');
const lastIndex = photoWrappers.length;

photoWrappers.forEach((el, i) => {
  if (i !== 0) {
    el.style.top = `${110 * i}vh`;
  }
  // console.log(el.querySelector(`.description`));
});

photoWrappers.forEach((container, i) => {
  const descriptionsForCurrentContainer =
    container.querySelectorAll(`.description`);

  const a = gsap.timeline();

  a.to(descriptionsForCurrentContainer, {
    y: `-20vh`,
    alpha: 0,
    duration: 0.5,
    ease: `none`,
  });
  a.to(descriptionsForCurrentContainer, {
    y: `+20vh`,
    alpha: 0,
    duration: 0.5,
    ease: `none`,
  });

  // console.log(`description ${i + 1}, photo ${i + 2}`);
  console.log(i, lastIndex);
  if (i < lastIndex - 1) {
    ScrollTrigger.create({
      trigger: `.photo-${i === 5 ? i : i + 1}`,
      scroller: `body`,
      animation: a,
      start: `top bottom`,
      end: `top 60%`,
      // scrub: true,
      pin: descriptionsForCurrentContainer,
      toggleActions: `restart none reverse none`,
      // markers: {
      //   fontSize: `20px`,
      //   indent: 100 * i,
      // },
    });
  }
  // if (i !== 0) {
  // Костыль
  // console.log(`container ${i} of ${lastIndex}`);
  // needs next containe
  // End Костыль
  // }
  if (i < lastIndex - 1) {
    // console.log(i + 1, photoWrappers);
    // const nextContainer = photoWrappers[i + 1];
    // const nextDescriptions = nextContainer.querySelectorAll(`.description`);
    // nextDescriptions.forEach((el) => {
    //   el.style.opacity = 0;
    // });
  }
});

photoWrappers.forEach((container, i) => {
  if (i !== 0) {
    tween.add(
      gsap.to(container, { top: 0, duration: 1 })
      // gsap.to(nextDescriptions, { opacity: 1, duration: 1 })
    );
  }
});

const scene = new ScrollMagic.Scene({
  triggerElement: `.animation`,
  duration: 500,
  triggerHook: 0,
  reverse: true,
})
  .setTween(tween)
  .setPin(`.animation`)
  .addIndicators({
    fontSize: `20px`,
    indent: 100,
  })
  .addTo(controller);
// ScrollTrigger.create({
//   trigger: `.photo-2`,
//   scroller: `body`,
//   animation: a,
//   start: `top bottom`,
//   end: `top 60%`,
//   scrub: true,
//   pin: `.description-1`,
//   toggleActions: `restart none reverse none`,
//   // markers: {
//   //   fontSize: `20px`,
//   //   indent: 100,
//   // },
// });
