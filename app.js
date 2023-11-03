// IMAGE SEQUENCE CODE
// alert("Hello World");
// const parceled = true;
// gsap.registerPlugin(ScrollTrigger); // install ScrollTrigger plugin

// document.addEventListener("DOMContentLoaded", function () {

//   renderImgSeq("canvas");
//   renderImgSeq("footer_canvas");

//   function renderImgSeq(canvasID) {
//     const isFooterCanvas = canvasID === "footer_canvas";

//     const canvas = document.querySelector(`#${canvasID}`); // get the canvas from the DOM via ID
//     const context = canvas.getContext("2d"); // method returns an object with tools for drawing on canvas in 2D
//     const triggerElement = isFooterCanvas
//       ? document.querySelector(".scrub-wrapper-footer")
//       : document.querySelector(".scrub-wrapper");
//     const frameCount = 200; // set frame count variable

//     /*new url loader*/
//     const currentFrame = (index) => {
//       // Detect screen width
//       const screenWidth = window.innerWidth;

//       // Define different base URLs for desktop and mobile
//       let desktopBaseUrl;
//       let mobileBaseUrl;

//       if (isFooterCanvas) {
//         desktopBaseUrl =
//           "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Footer/v02/desktop";
//         mobileBaseUrl =
//           "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Footer/v02/mobile";
//       } else {
//         desktopBaseUrl =
//           "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Rolling_Ball/v04/desktop";
//         mobileBaseUrl =
//           "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Rolling_Ball/v04/mobile";
//       }

//       // Determine the base URL based on screen width
//       let baseUrl;
//       const breakpoint = 991;

//       if (screenWidth < breakpoint) {
//         /*IS MOBILE DEVICE*/
//         baseUrl = mobileBaseUrl;

//         const frameUrl = `${baseUrl}/MOBI_${
//           isFooterCanvas ? "Footer" : "RollingBall_viewport"
//         }_9-16_${index.toString().padStart(5, "0")}.jpg`;

//         return frameUrl;
//       } else {
//         /*IS DESKTOP DEVICE*/
//         baseUrl = desktopBaseUrl;

//         const frameUrl = `${baseUrl}/MOBI_${
//           isFooterCanvas ? "Footer" : "RollingBall_viewport"
//         }_16-9_${index.toString().padStart(5, "0")}.jpg`;

//         return frameUrl;
//       }
//     };

//     const images = [];
//     const airpods = {
//       frame: 0,
//     };

//     // loop through framecount and push each image to images array
//     for (let i = 0; i < frameCount; i++) {
//       const img = new Image(); // create new image element
//       img.src = currentFrame(i); // set source to current frame
//       images.push(img); // push new image to images array
//     }

//     // const preloadImages = () => {
//     //   const imagesToPreload = [];
//     //   for (let i = 0; i < frameCount; i++) {
//     //     const img = new Image();
//     //     img.src = currentFrame(i);
//     //     img.onload = function () {
//     //       imagesToPreload.push(img);
//     //       if (imagesToPreload.length === frameCount) {
//     //         // All images have been preloaded, you can now safely use them
//     //         images = imagesToPreload;
//     //         renderImage();
//     //       }
//     //     };
//     //     img.onerror = function () {
//     //       console.error(`Failed to preload image ${i}`);
//     //       // Handle the error, such as displaying a placeholder image
//     //     };
//     //   }
//     // };

//     // preloadImages();

//     function resizeCanvas() {
//       canvas.width = window.innerWidth;
//       const aspectRatio =
//         images[airpods.frame].width / images[airpods.frame].height;
//       canvas.height = window.innerHeight;
//       renderImage(); // Call renderImage after resizing
//     }

//     resizeCanvas();

//     // Add an event listener for the window's resize event
//     window.addEventListener("resize", resizeCanvas);

//     gsap.to(canvas, {
//       width: "100%",
//       onUpdate: resizeCanvas,
//       scrollTrigger: {
//         trigger: triggerElement, // Use the trigger element
//         start: "top center", // Start when the trigger element is at the center of the viewport
//         end: "bottom center", // End when the trigger element is at the center of the viewport
//         scrub: 3,
//       },
//     });

//     gsap.to(airpods, {
//       frame: frameCount - 1,
//       snap: "frame",
//       ease: "none",
//       scrollTrigger: {
//         trigger: triggerElement, // Use the trigger element
//         start: "top center", // Start when the trigger element is at the center of the viewport
//         end: "bottom center", // End when the trigger element is at the center of the viewport
//         scrub: 3,
//       },
//       onUpdate: renderImage,
//     });

//     images[0].onload = function () {
//       renderImage();
//     };

//     images[0].onerror = function () {
//       // Handle image loading error (e.g., show a placeholder or a message)
//       console.error("Failed to load the initial image.");
//     };

//     function renderImage() {
//       context.clearRect(0, 0, canvas.width, canvas.height);
//       // Get the current frame image
//       const currentImage = images[airpods.frame];
//       // Calculate the aspect ratio of the source image
//       const aspectRatio = currentImage.width / currentImage.height;
//       // Get the canvas dimensions
//       const canvasWidth = window.innerWidth;
//       const canvasHeight = window.innerHeight;
//       // Calculate the drawn width and height to maintain aspect ratio
//       let drawnWidth, drawnHeight;
//       if (canvasWidth / aspectRatio > canvasHeight) {
//         // Image width exceeds canvas width
//         drawnWidth = canvasWidth;
//         drawnHeight = canvasWidth / aspectRatio;
//       } else {
//         // Image height exceeds canvas height
//         drawnHeight = canvasHeight;
//         drawnWidth = canvasHeight * aspectRatio;
//       }
//       // Calculate the position to center the image on the canvas
//       const x = (canvasWidth - drawnWidth) / 2;
//       const y = (canvasHeight - drawnHeight) / 2;
//       // Draw the image with the calculated dimensions and position
//       context.drawImage(currentImage, x, y, drawnWidth, drawnHeight);
//     }
//   }
// });
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  loadAndInitCanvas("canvas");
  loadAndInitCanvas("footer_canvas");

  function loadAndInitCanvas(canvasID) {
    const images = [];
    const frameCount = 200;
    let imagesLoaded = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i, canvasID);
      img.onload = function () {
        imagesLoaded++;
        if (imagesLoaded === frameCount) {
          initCanvas(canvasID, images);
        }
      };
      img.onerror = function () {
        console.error("Failed to load image:", img.src);
        // Handle the error as needed, e.g., displaying a placeholder image
        imagesLoaded++; // Increment imagesLoaded even in case of an error
        if (imagesLoaded === frameCount) {
          initCanvas(canvasID, images);
        }
      };
      images.push(img);
    }
  }

  function currentFrame(index, canvasID) {
    const screenWidth = window.innerWidth;
    let desktopBaseUrl;
    let mobileBaseUrl;
    let baseUrl;
    const breakpoint = 991;

    if (canvasID === "footer_canvas") {
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
      canvasID === "footer_canvas" ? "Footer" : "RollingBall_viewport"
    }_${screenWidth < breakpoint ? "9-16" : "16-9"}_${index
      .toString()
      .padStart(5, "0")}.jpg`;

    return frameUrl;
  }

  function initCanvas(canvasID, images) {
    const canvas = document.querySelector(`#${canvasID}`);
    const context = canvas.getContext("2d");
    const triggerElement =
      canvasID === "footer_canvas"
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
      canvas.height = window.innerHeight;
      renderImage();
    }

    resizeCanvas();

    // Add an event listener for the window's resize event
    window.addEventListener("resize", resizeCanvas);

    gsap.to(canvas, {
      width: "100%",
      onUpdate: resizeCanvas,
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center",
        end: "bottom center",
        scrub: 3,
      },
    });

    gsap.to(airpods, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center",
        end: "bottom center",
        scrub: 3,
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
      context.drawImage(currentImage, x, y, drawnWidth, drawnHeight);
    }
  }
});
