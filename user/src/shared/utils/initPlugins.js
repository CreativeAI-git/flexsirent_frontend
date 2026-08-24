import $ from "jquery";
// import AOS from "aos";
// import Swiper from "swiper";
// import "owl.carousel";
// import "swiper/swiper-bundle.css";
// import "owl.carousel/dist/assets/owl.carousel.css";

// src/utils/initPlugins.js
export function initPlugins() {
  
  $(".ct_menu_bar").off("click").on("click", function () {
    $(".ct_navbar").addClass("ct_show");
  });
  $(".ct_close_menu").off("click").on("click", function () {
    $(".ct_navbar").removeClass("ct_show");
  });

  // AOS
  // AOS.init();

  // Owl Carousel
  // $(".ct_testimonial_slider").owlCarousel({
  //   loop: true,
  //   margin: 0,
  //   nav: true,
  //   responsive: {
  //     0: { items: 1 },
  //     600: { items: 2 },
  //     1350: { items: 3 },
  //   },
  // });

  // $(".ct_user_slider, .ct_product_gallary_slider").owlCarousel({
  //   loop: true,
  //   margin: 10,
  //   nav: true,
  //   responsive: {
  //     0: { items: 1 },
  //     600: { items: 1 },
  //     1000: { items: 1 },
  //   },
  // });

  // Swiper
  // new Swiper(".mySwiper", {
  //   loop: false,
  //   slidesPerView: 4,
  //   slidesPerGroup: 4,
  //   speed: 600,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  //   spaceBetween: 20,
  //   breakpoints: {
  //     0: { slidesPerView: 1 },
  //     576: { slidesPerView: 2, slidesPerGroup: 1 },
  //     768: { slidesPerView: 2 },
  //     992: { slidesPerView: 3 },
  //     1200: { slidesPerView: 4 },
  //   },
  // });

  // new Swiper(".ct_apartment_slider", {
  //   loop: true,
  //   speed: 600,
  //   spaceBetween: 20,
  //   breakpoints: {
  //     0: { slidesPerView: 1 },
  //     576: { slidesPerView: 2 },
  //     768: { slidesPerView: 2 },
  //     992: { slidesPerView: 3 },
  //     1200: { slidesPerView: 3 },
  //   },
  // });

  // Custom Dropdowns
  $(document).off("click", ".ct_custom_price_select_dropdown").on("click", ".ct_custom_price_select_dropdown", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".ct_custom_price_select_dropdown").not(this).removeClass("active");
    $(".ct_custom_drop_mega").not($(this).next()).removeClass("active");

    $(this).toggleClass("active");
    $(this).next(".ct_custom_drop_mega").toggleClass("active");
    $(this).next(".ct_custom_drop_mega_menus").toggleClass("active");
  });

  // Close dropdowns when clicking outside
  $(document).off("click.ct_dropdown_close").on("click.ct_dropdown_close", function () {
    $(".ct_custom_price_select_dropdown").removeClass("active");
    $(".ct_custom_drop_mega").removeClass("active");
    $(".ct_custom_drop_mega_menus").removeClass("active");
  });

  // Prevent closing when clicking inside the dropdown menu
  $(document).off("click", ".ct_custom_drop_mega_menus").on("click", ".ct_custom_drop_mega_menus", function (e) {
    e.stopPropagation();
  });

  // Create listing switch
  $(".create_listing_2").off("click").on("click", function () {
    $(this).addClass("active");
    $(".create_listing_1").removeClass("active");
    $(".create_listing_1_btn").addClass("d-none");
    $(".create_listing_2_btn").removeClass("d-none").addClass("d-block");
  });

  $(".create_listing_1").off("click").on("click", function () {
    $(this).addClass("active");
    $(".create_listing_2").removeClass("active");
    $(".create_listing_2_btn").addClass("d-none");
    $(".create_listing_1_btn").removeClass("d-none").addClass("d-block");
  });

  // Price Range Slider
  const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".ct_price-input input"),
    range = document.querySelector(".ct_range_slider1 .ct_range_progress");
  let priceGap = 1000;

  if (rangeInput.length && priceInput.length && range) {
    priceInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minPrice = parseInt(priceInput[0].value),
          maxPrice = parseInt(priceInput[1].value);

        if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
          if (e.target.className === "input-min") {
            rangeInput[0].value = minPrice;
            range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
          } else {
            rangeInput[1].value = maxPrice;
            range.style.right =
              100 - (maxPrice / rangeInput[1].max) * 100 + "%";
          }
        }
      });
    });

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        let minVal = parseInt(rangeInput[0].value),
          maxVal = parseInt(rangeInput[1].value);
        if (maxVal - minVal < priceGap) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxVal - priceGap;
          } else {
            rangeInput[1].value = minVal + priceGap;
          }
        } else {
          priceInput[0].value = minVal;
          priceInput[1].value = maxVal;
          range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
          range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
      });
    });
  }

  // Multi Date Picker
  // if ($("#multiDatePicker").length) {
  //   $("#multiDatePicker").multiDatesPicker({
  //     dateFormat: "yy-mm-dd",
  //     maxPicks: 2,
  //   });
  // }

  // Sticky Header
  $(window).off("scroll").on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 300) {
      $(".ct_header").addClass("ct_sticky_menu");
    } else {
      $(".ct_header").removeClass("ct_sticky_menu");
    }
  });
}
