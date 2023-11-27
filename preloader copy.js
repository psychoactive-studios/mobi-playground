window.addEventListener("load", (e) => {
  new SplitType("[text-split]", { types: "lines, chars", tagName: "span" }),
    $("[heading-load-up]").each(function () {
      let e = $(this),
        t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });
      t.from(e.find(".line"), {
        opacity: 0,
        y: "120%",
        ease: "Power1.easeOut",
        stagger: { each: 0.08 },
        duration: 0.5,
        delay: 0,
      });
    }),
    $("[subpara-load-up]").each(function () {
      let e = $(this),
        t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });
      t.from(e.find(".line"), {
        opacity: 0,
        y: "120%",
        ease: "Power1.easeOut",
        stagger: { each: 0.08 },
        duration: 0.5,
        delay: 0.3,
      });
    }),
    $("[element-load-up]").each(function () {
      let e = $(this),
        t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });
      t.from(e, {
        opacity: 0,
        y: "120%",
        ease: "Power1.easeOut",
        duration: 0.5,
      }),
        t.to(e, { opacity: 1, y: "0%", ease: "Power1.easeIn" });
    }),
    $("[lines-slide-up]").each(function () {
      let e = $(this),
        t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });
      t.from(e.find(".line"), {
        opacity: 0,
        y: "120%",
        ease: "Power1.easeOut",
        stagger: { each: 0.08 },
        duration: 0.5,
        delay: 0.2,
      });
    }),
    $("[image-slide-up]").each(function () {
      let e = $(this),
        t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 60%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });
      t.fromTo(
        e,
        {
          opacity: 0,
          scaleY: 1.15,
          transformOrigin: "center top",
          ease: "Power1.easeInOut",
        },
        { opacity: 1, scaleY: 1, duration: 0.7 }
      );
    }),
    $(".image_border.is-left").each(function () {
      let e = $(this),
        t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });
      t.fromTo(
        e,
        { x: "-10px", y: "-10px" },
        { x: "0", y: "0", duration: 0.86, ease: "Power1.easeInOut", delay: 0.7 }
      );
    }),
    $(".image_border.is-right").each(function () {
      let e = $(this),
        t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });
      t.fromTo(
        e,
        { x: "10px", y: "-10px" },
        { x: "0", y: "0", duration: 0.86, ease: "Power1.easeInOut", delay: 0.7 }
      );
    }),
    $("[slide-up]").each(function () {
      let e = $(this),
        t = gsap.timeline({
          scrollTrigger: {
            trigger: e,
            start: "top 80%",
            end: "bottom top",
            toggleActions: "play none none none",
          },
        });
      t.from(e, {
        opacity: 0,
        y: "120%",
        ease: "Power1.easeOut",
        stagger: { each: 0.08 },
        duration: 0.5,
        delay: 0.2,
      });
    }),
    gsap.set("[text-split]", { opacity: 1 });
});
const splitType = new SplitType("[hoverstagger='text']", {
  types: "words,chars",
  tagName: "span",
});
("use strict");
if (
  ($("[hoverstagger='link']").each(function () {
    let e = $(this),
      t = e.find("[hoverstagger='text']").eq(0),
      i = e.find("[hoverstagger='text']").eq(1),
      o = gsap.timeline({ paused: !0 });
    o.to(t.find(".char"), {
      yPercent: -100,
      duration: 0.3,
      stagger: { amount: 0.2 },
    }),
      o.from(
        i.find(".char"),
        { yPercent: 100, duration: 0.3, stagger: { amount: 0.2 } },
        0
      ),
      e.on("mouseenter", () => {
        o.restart();
      });
  }),
  void 0 === Webflow.env("editor"))
) {
  let e = new Lenis({
    lerp: 0.1,
    wheelMultiplier: 0.7,
    infinite: !1,
    gestureOrientation: "vertical",
    normalizeWheel: !1,
    smoothTouch: !1,
  });
  function t(i) {
    e.raf(i), requestAnimationFrame(t);
  }
  function i() {
    e.on("scroll", ScrollTrigger.update),
      gsap.ticker.add((t) => {
        e.raf(1e3 * t);
      });
  }
  requestAnimationFrame(t),
    $("[data-lenis-start]").on("click", () => {
      e.start();
    }),
    $("[data-lenis-stop]").on("click", () => {
      e.stop();
    }),
    $("[data-lenis-toggle]").on("click", function () {
      let t = $(this);
      t.toggleClass("stop-scroll"),
        t.hasClass("stop-scroll") && !t.attr("enable-scroll")
          ? e.stop()
          : e.start();
    });
}
function getSiblingsWithClass(e, t) {
  return Array.from(e.parentNode.children).find((e) => e.classList.contains(t));
}

function checkWindowSize() {
  window.innerWidth > 992 && (document.body.classList.add("overflow-hidden"),

    window.addEventListener("load", () => {
      setTimeout(() => {
        (document.querySelector(".loader_lottie-flicker").style.display =
          "none"),
          (document.querySelector(".loader_v1").style.display = "flex");
        let e = document.getElementById("bgVideo1");
        e.play();
      }, 2160);

      let e = document.getElementById("bgVideo1");

      e.addEventListener("ended", () => {
        document.querySelector(".loader_v1").style.display = "none";
        let e = document.querySelector(".loader");
        (e.style.position = "absolute"),
          (e.style.top = "0"),
          (e.style.right = "0"),
          (e.style.zIndex = "-1");

        let t = document.querySelector(".loader_v2");

        t.style.display = "flex";

        let i = document.getElementById("bgVideo2");
        
        i.play(),
          (i.loop = !0),
          setTimeout(() => {
            t.style.transform = "translateX(10%)";
          }, 1e3),





          $("[home-header-heading]").each(function () {
            let e = $(this),
              t = gsap.timeline({
                scrollTrigger: {
                  trigger: e,
                  start: "top 80%",
                  end: "bottom top",
                  toggleActions: "play none none none",
                },
              });
            t.from(e.find(".line"), {
              opacity: 0,
              y: "120%",
              ease: "Power1.easeOut",
              stagger: { each: 0.08 },
              duration: 0.5,
              delay: 0,
            });
          }),
          $("[home-header-subpara]").each(function () {
            let e = $(this),
              t = gsap.timeline({
                scrollTrigger: {
                  trigger: e,
                  start: "top 80%",
                  end: "bottom top",
                  toggleActions: "play none none none",
                },
              });
            t.from(e.find(".line"), {
              opacity: 0,
              y: "120%",
              ease: "Power1.easeOut",
              stagger: { each: 0.08 },
              duration: 0.5,
              delay: 0.3,
            });
          }),
          $("[header-element]").each(function () {
            let e = $(this),
              t = gsap.timeline({
                scrollTrigger: {
                  trigger: e,
                  start: "top 80%",
                  end: "bottom top",
                  toggleActions: "play none none none",
                },
              });
            t.from(e, {
              opacity: 0,
              y: "120%",
              ease: "Power1.easeOut",
              duration: 0.5,
            }),
              t.to(e, { opacity: 1, y: "0%", ease: "Power1.easeIn" });
          }),
          document.body.classList.remove("overflow-hidden");
      });
    }));
}










$(".slider-main_component").each(function () {
  let e = $(this),
    t = "true" === e.attr("loop-mode"),
    i = +e.attr("slider-duration") || 300;
  new Swiper(e.find(".swiper")[0], {
    speed: i,
    loop: t,
    autoHeight: !1,
    centeredSlides: !e.hasClass("is-left") && t,
    followFinger: !0,
    freeMode: !1,
    slideToClickedSlide: !1,
    slidesPerView: 1,
    spaceBetween: "4%",
    rewind: !1,
    mousewheel: { forceToAxis: !0 },
    keyboard: { enabled: !0, onlyInViewport: !0 },
    breakpoints: {
      480: { slidesPerView: 1, spaceBetween: "4%" },
      768: { slidesPerView: 2, spaceBetween: "4%" },
      992: {
        slidesPerView: e.hasClass("is-left") ? 2.5 : 2,
        spaceBetween: "5%",
      },
    },
    pagination: {
      el: e.find(".swiper-bullet-wrapper")[0],
      bulletActiveClass: "is-active",
      bulletClass: "swiper-bullet",
      bulletElement: "button",
      clickable: !0,
    },
    navigation: {
      nextEl: e.find(".swiper-next")[0],
      prevEl: e.find(".swiper-prev")[0],
      disabledClass: "is-disabled",
    },
    scrollbar: {
      el: e.find(".swiper-drag-wrapper")[0],
      draggable: !0,
      dragClass: "swiper-drag",
      snapOnRelease: !0,
    },
    slideActiveClass: "is-active",
    slideDuplicateActiveClass: "is-active",
  });
}),
  $(document).ready(function () {
    $(".navbar_menu-button-wrapper").click(function () {
      "hidden" == $("html, body").css("overflow")
        ? $("html, body").css("overflow", "auto")
        : $("html, body").css("overflow", "hidden");
    });
  }),
  $(".navbar_menu-insights-content-wrapper").on("wheel", function (e) {
    e.preventDefault();
    var t = e.originalEvent.deltaY,
      i = $(this).scrollTop();
    $(this).scrollTop(i + t);
  }),
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("is-submit-hover")) {
      let t = getSiblingsWithClass(e.target, "is-form-submit");
      t && t.click();
    }
  }),
  document.addEventListener("DOMContentLoaded", function () {
    function e(e) {
      let i = e.progress,
        o = document.querySelectorAll(".services-pillar.is-tech"),
        n = document.querySelectorAll(".services-pillar-content.is-tech"),
        l = document.querySelectorAll(".services-pillar.is-media"),
        s = document.querySelectorAll(".services-pillar-content.is-media"),
        a = document.querySelectorAll(".services-pillar.is-ip"),
        r = document.querySelectorAll(".services-pillar-content.is-ip");
      i >= 0 && i <= 0.3333333333333333
        ? (t(o, "is-pillar-active", !0),
          t(n, "is-content-active", !0),
          t(l, "is-pillar-active", !1),
          t(s, "is-content-active", !1),
          t(a, "is-pillar-active", !1),
          t(r, "is-content-active", !1))
        : i > 0.3333333333333333 && i <= 0.6666666666666666
        ? (t(o, "is-pillar-active", !1),
          t(n, "is-content-active", !1),
          t(l, "is-pillar-active", !0),
          t(s, "is-content-active", !0),
          t(a, "is-pillar-active", !1),
          t(r, "is-content-active", !1))
        : i > 0.6666666666666666 &&
          (t(o, "is-pillar-active", !1),
          t(n, "is-content-active", !1),
          t(l, "is-pillar-active", !1),
          t(s, "is-content-active", !1),
          t(a, "is-pillar-active", !0),
          t(r, "is-content-active", !0));
    }
    function t(e, t, i) {
      e.forEach((e) => {
        i ? e.classList.add(t) : e.classList.remove(t);
      });
    }
    gsap.registerPlugin(ScrollTrigger),
      ScrollTrigger.create({
        trigger: ".section_services-pillars",
        start: "top top",
        end: "bottom bottom",
        onEnter: e,
        onLeaveBack: e,
        onUpdate: e,
      });
  }),
  checkWindowSize(),
  window.addEventListener("resize", checkWindowSize);
