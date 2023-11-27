gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  // const parceled = true;
  // console.log(parceled);
  // alert("we live baby");
  const currentPage = window.location.pathname;
  const homePage = currentPage == "/";

  if (homePage) loadAndInitCanvas("canvas");
  loadAndInitCanvas("footer_canvas");

  function loadAndInitCanvas(canvasID) {
    const images = [];
    const frameCount = 200;
    let imagesLoaded = 0;

    function handleImageLoad(img) {
      imagesLoaded++;
      if (imagesLoaded === frameCount) {
        initCanvas(canvasID, images);

        // Add a console.log statement when all images are loaded
        console.log("All images are loaded for canvasID: " + canvasID);
      }
    }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i, canvasID);
      img.onload = handleImageLoad.bind(null, img);
      img.onerror = function () {
        console.error("Failed to load image:", img.src);
        imagesLoaded++; // Increment imagesLoaded even in case of an error
        if (imagesLoaded === frameCount) {
          initCanvas(canvasID, images);

          // Add a console.log statement when all images are loaded
          console.log("All images are loaded for canvasID: " + canvasID);
        } else {
          // Retry the failed request after a brief delay (e.g., 2 seconds)
          setTimeout(function () {
            img.src = currentFrame(i, canvasID);
          }, 1000); // 2000 milliseconds (2 seconds)
        }
      };
      images.push(img);
    }
  }

  function currentFrame(index, canvasID) {
    const screenWidth = window.innerWidth;
    const isFooter = canvasID === "footer_canvas";
    let desktopBaseUrl;
    let mobileBaseUrl;
    let baseUrl;
    const breakpoint = 991;

    if (isFooter) {
      desktopBaseUrl =
        "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Footer/v02/desktop";
      mobileBaseUrl =
        "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Footer/v02/mobile";
    } else {
      desktopBaseUrl =
        "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Rolling_Ball/v04/desktop";
      mobileBaseUrl =
        "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Rolling_Ball/v04/mobile";
    }

    if (screenWidth < breakpoint) {
      baseUrl = mobileBaseUrl;
    } else {
      baseUrl = desktopBaseUrl;
    }

    const frameUrl = `${baseUrl}/MOBI_${
      isFooter ? "Footer" : "RollingBall_viewport"
    }_${screenWidth < breakpoint ? "9-16" : "16-9"}_${index
      .toString()
      .padStart(5, "0")}.jpg`;

    return frameUrl;
  }

  function initCanvas(canvasID, images) {
    const isFooter = canvasID === "footer_canvas";
    const canvas = document.querySelector(`#${canvasID}`);
    const context = canvas.getContext("2d");
    const triggerElement = isFooter
      ? document.querySelector(".scrub-wrapper-footer")
      : document.querySelector(".scrub-wrapper");
    const frameCount = 200;
    const airpods = {
      frame: 0,
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      const aspectRatio =
        images[airpods.frame].width / images[airpods.frame].height;
      canvas.height = window.innerWidth / aspectRatio;
      renderImage();
      ScrollTrigger.refresh();
    }

    resizeCanvas();

    // Add an event listener for the window's resize event
    window.addEventListener("resize", resizeCanvas);

    gsap.to(canvas, {
      width: "100%",
      ease: "none",
      onUpdate: resizeCanvas,
      scrollTrigger: {
        trigger: triggerElement,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        //ease: "linear", // Set the easing to "linear"
      },
    });

    gsap.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
        //ease: "linear", // Set the easing to "linear"
      },
      onUpdate: renderImage,
    });

    images[0].onload = function () {
      renderImage();
    };

    images[0].onerror = function () {
      console.error(`Failed to load the initial image for ${canvasID}`);
    };

    function renderImage() {
      if (isFooter) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const currentImage = images[airpods.frame];
        const aspectRatio = currentImage.width / currentImage.height;
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        let drawnWidth, drawnHeight;
        if (canvasWidth / aspectRatio > canvasHeight) {
          drawnWidth = canvasWidth;
          drawnHeight = canvasWidth / aspectRatio;
        } else {
          drawnHeight = canvasHeight;
          drawnWidth = canvasHeight * aspectRatio;
        }
        const x = (canvasWidth - drawnWidth) / 2;
        const y = (canvasHeight - drawnHeight) / 2;
        // const x = 0;
        // const y = 0;

        context.drawImage(currentImage, x, y, drawnWidth, drawnHeight);
      } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const currentImage = images[airpods.frame];
        const aspectRatio = currentImage.width / currentImage.height;
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const desiredHeight = canvasHeight * 0.5; // Adjust the multiplier as needed
        let drawnWidth, drawnHeight;

        // Calculate drawnHeight to fill the desired height without stretching
        drawnHeight = desiredHeight;

        // Calculate drawnWidth based on the aspect ratio
        drawnWidth = drawnHeight * aspectRatio;

        // Ensure that drawnWidth fills the full width of the viewport
        if (drawnWidth < canvasWidth) {
          drawnWidth = canvasWidth;
          drawnHeight = drawnWidth / aspectRatio;
        }

        // Calculate x and y to center the image horizontally and vertically
        const x = 0;
        const y = 0;

        context.drawImage(currentImage, x, y, drawnWidth, drawnHeight);
      }
    }
  }
});
