const parceled = true;
const currentPage = window.location.pathname;
const homePage = currentPage == "/";
const integrationsPage = currentPage == "/integrations";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  // alert("we local baby");

  if (homePage) loadAndInitCanvas("canvas");
  loadAndInitCanvas("footer_canvas");

  function loadAndInitCanvas(canvasID) {
    const images = [];
    const frameCount = homePage ? 300 : 200;
    let imagesLoaded = 0;

    function handleImageLoad(img) {
      imagesLoaded++;
      if (imagesLoaded === frameCount) {
        initCanvas(canvasID, images);
        console.log("All images are loaded for canvasID: " + canvasID);
      }
    }

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i, canvasID);
      img.onload = handleImageLoad.bind(null, img);
      img.onerror = function () {
        console.error("Failed to load image:", img.src);
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
          initCanvas(canvasID, images);
          console.log("All images are loaded for canvasID: " + canvasID);
        } else {
          setTimeout(function () {
            img.src = currentFrame(i, canvasID);
          }, 1000);
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
        "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Rolling_Ball/v05/desktop";
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
        //ease: "linear",
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
        //ease: "linear",
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

  // integrations category filter fix
  if (integrationsPage) {
    let lastItem;
    const filterLinks = document.querySelectorAll(".category-filter");
    const defaultIntro = document.querySelector("#default-intro");

    categorySwitcher();

    filterLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setTimeout(() => {
          categorySwitcher();
        }, 100);
      });
    });

    function categorySwitcher() {
      const url = window.location.href;
      const urlParams = new URLSearchParams(url.split("?")[1]);
      const integrationCategory = urlParams.get("integration-category");
      const showDefault = integrationCategory == null;

      if (showDefault) {
        displaySwap(defaultIntro, "block", true);
        if (lastItem != undefined) {
          displaySwap(lastItem, "none");
          lastItem = undefined;
        }
      } else {
        const currentCategory = capitalizeFirstLetter(integrationCategory);
        displaySwap(defaultIntro, "none", true);
        displaySwap(currentCategory, "block");

        if (lastItem != currentCategory) {
          if (lastItem != undefined) {
            displaySwap(lastItem, "none");
          }
          lastItem = currentCategory;
        }
      }
    }

    function capitalizeFirstLetter(string) {
      if (string == "pos") {
        return string.toUpperCase();
      } else {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    }

    function displaySwap(id, displayState, isDefault) {
      if (isDefault) {
        defaultIntro.style.display = displayState;
      } else {
        document.querySelector(`#${id}`).style.display = displayState;
      }
    }
  }
});
