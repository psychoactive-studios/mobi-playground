function checkWindowSize() {
  alert("local");
  // window.innerWidth > 992 && (document.body.classList.add("overflow-hidden"),
  window.addEventListener("load", () => {
    // setTimeout(() => {
    // (document.querySelector(".loader_lottie-flicker").style.display = "none"),
    document.querySelector(".loader_v1").style.display = "flex";
    let e = document.getElementById("bgVideo1");
    e.play();
    // }, 2160);

    // let e = document.getElementById("bgVideo1");

    e.addEventListener("ended", () => {
      setTimeout(() => {
        document.querySelector(".loader_v1").style.display = "none";
        // let e = document.querySelector(".loader");
        // (e.style.position = "absolute"),
        //   (e.style.top = "0"),
        //   (e.style.right = "0"),
        //   (e.style.zIndex = "-1");

        let t = document.querySelector(".loader_v2");

        t.style.display = "flex";

        let i = document.getElementById("bgVideo2");

        i.play();
      }, 6000);
      // (i.loop = !0),
      // setTimeout(() => {
      //   t.style.transform = "translateX(10%)";
      // }, 1e3),
      // document.body.classList.remove("overflow-hidden");
    });
  });
  // );
}
checkWindowSize(), window.addEventListener("resize", checkWindowSize);
