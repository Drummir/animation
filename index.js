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

const a = gsap.timeline();

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

a.to(`.description-1`, {
  y: `-20vh`,
  alpha: 0,
  duration: 1,
  ease: `none`,
});

ScrollTrigger.create({
  trigger: `.photo-2`,
  scroller: `body`,
  animation: a,
  start: `top bottom`,
  end: `top 60%`,
  scrub: true,
  pin: `.description-1`,
  toggleActions: `restart none reverse none`,
  // markers: {
  //   fontSize: `20px`,
  //   indent: 100,
  // },
});

// Костыль

const tween = gsap.timeline();
tween.add(gsap.to(`.photo-wrapper-2`, { top: 0, duration: 1 }));

const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
  triggerElement: `.animation`,
  duration: 500,
  triggerHook: 0,
  reverse: true,
})
  .setTween(tween)
  .setPin(`.animation`)
  .addTo(controller);

// End Костыль
