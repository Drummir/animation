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
  duration: 5,
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

const a = gsap.timeline();

// gsap.to(`.front`, {
//   x: `+200vw`,
//   duration: 5,
//   repeat: -1,
//   ease: `none`,
// });
// gsap.to(`.back`, {
//   x: `-200vw`,
//   duration: 5,
//   repeat: -1,
//   ease: `none`,
// });

a.to(`.description-1`, {
  y: `-20vh`,
  alpha: 0,
  duration: 1,
  ease: `none`,
});

const lastIndex = gsap.utils.toArray('.photo-wrapper').length - 1;
const tween = gsap.timeline();
const controller = new ScrollMagic.Controller();

document.querySelectorAll('.photo-wrapper').forEach((x, i) => {
  if (i !== 0) {
    x.style.top = `${110 * i}vh`;
  }
});

gsap.utils.toArray('.photo-wrapper').forEach((container, i) => {
  if (i < lastIndex) {
    console.log(`description ${i + 1}, photo ${i + 2}`);
    ScrollTrigger.create({
      trigger: `.photo-${i + 2}`,
      scroller: `body`,
      animation: a,
      start: `top bottom`,
      end: `top 60%`,
      scrub: true,
      pin: `.description-${i + 1}`,
      toggleActions: `restart none reverse none`,
      // markers: {
      //   fontSize: `20px`,
      //   indent: 100,
      // },
    });
  }
  if (i !== 0) {
    // Костыль
    console.log(`container ${i} of ${lastIndex}`);
    tween.add(gsap.to(container, { top: 0, duration: 1 }));

    // End Костыль
  }
});

console.log(tween);

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
