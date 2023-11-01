// alert("Hello World");
const parceled = true;
gsap.registerPlugin(ScrollTrigger); // install ScrollTrigger plugin

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("#canvas"); // get the canvas from the DOM via ID
  const context = canvas.getContext("2d"); // method returns an object with tools for drawing on canvas in 2D
  const triggerElement = document.querySelector(".scrub-wrapper");
  const frameCount = 6; // set frame count variable

  /*new url loader*/
  const currentFrame = (index) => {
    // Detect screen width
    const screenWidth = window.innerWidth;

    // Define different base URLs for desktop and mobile
    const desktopBaseUrl =
      "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Rolling_Ball/v02";
    const mobileBaseUrl =
      "https://general-client-assets.sfo3.digitaloceanspaces.com/MOBI/Home/Rolling_Ball/v02";

    const frameUrl = `${desktopBaseUrl}/MOBI_rollingBall_viewport${index
      .toString()
      .padStart(4, "0")}.jpg`; // set frame url variable
    console.log(frameUrl);
    return frameUrl; // return frame url variable

    // UNCOMMENT BELOW ONCE READY FOR SEPERATE MOPBILE IMPLEMENTATION
    // Determine the base URL based on screen width
    // let baseUrl;
    // const breakpoint = 991;

    // if (screenWidth < breakpoint) {
    //   /*IS MOBILE DEVICE*/
    //   baseUrl = mobileBaseUrl;

    //   const frameUrl = `${baseUrl}/MOBI_rollingBall_viewport${(index + 1)
    //     .toString()
    //     .padStart(4, "0")}.jpg`;

    //   return frameUrl;
    // } else {
    //   /*IS DESKTOP DEVICE*/
    //   baseUrl = desktopBaseUrl;

    //   const frameUrl = `${baseUrl}/MOBI_rollingBall_viewport${(index + 1)
    //     .toString()
    //     .padStart(4, "0")}.jpg`;

    //   return frameUrl;
    // }
  };

  const images = [];
  const airpods = {
    frame: 0,
  };

  // loop through framecount and push each image to images array
  for (let i = 0; i < frameCount; i++) {
    const img = new Image(); // create new image element
    img.src = currentFrame(i); // set source to current frame
    images.push(img); // push new image to images array
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    const aspectRatio =
      images[airpods.frame].width / images[airpods.frame].height;
    canvas.height = window.innerHeight;
    renderImage(); // Call renderImage after resizing
  }

  resizeCanvas();

  // Add an event listener for the window's resize event
  window.addEventListener("resize", resizeCanvas);

  gsap.to(canvas, {
    width: "100%",
    onUpdate: resizeCanvas,
    scrollTrigger: {
      trigger: triggerElement, // Use the trigger element
      start: "center center", // Start when the trigger element is at the center of the viewport
      end: "bottom center", // End when the trigger element is at the center of the viewport
      scrub: 0.5,
    },
  });

  gsap.to(airpods, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: triggerElement, // Use the trigger element
      start: "center center", // Start when the trigger element is at the center of the viewport
      end: "bottom center", // End when the trigger element is at the center of the viewport
      scrub: 0.5,
    },
    onUpdate: renderImage,
  });

  images[0].onload = renderImage;

  function renderImage() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Get the current frame image
    const currentImage = images[airpods.frame];
    // Calculate the aspect ratio of the source image
    const aspectRatio = currentImage.width / currentImage.height;
    // Get the canvas dimensions
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    // Calculate the drawn width and height to maintain aspect ratio
    let drawnWidth, drawnHeight;
    if (canvasWidth / aspectRatio > canvasHeight) {
      // Image width exceeds canvas width
      drawnWidth = canvasWidth;
      drawnHeight = canvasWidth / aspectRatio;
    } else {
      // Image height exceeds canvas height
      drawnHeight = canvasHeight;
      drawnWidth = canvasHeight * aspectRatio;
    }
    // Calculate the position to center the image on the canvas
    const x = (canvasWidth - drawnWidth) / 2;
    const y = (canvasHeight - drawnHeight) / 2;
    // Draw the image with the calculated dimensions and position
    context.drawImage(currentImage, x, y, drawnWidth, drawnHeight);
  }
});
