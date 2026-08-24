$(document).ready(function () {
  $(".ct_menu_bar").click(function () {
    $(".ct_navbar").addClass("ct_show");
  });
  $(".ct_close_menu").click(function () {
    $(".ct_navbar").removeClass("ct_show");
  });

  // AOS.init();

  // $(".ct_testimonial_slider").owlCarousel({
  //   loop: true,
  //   margin: 0,
  //   nav: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 2,
  //     },
  //     1350: {
  //       items: 3,
  //     },
  //   },
  // });

  // $(".ct_user_slider").owlCarousel({
  //   loop: true,
  //   margin: 10,
  //   nav: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 1,
  //     },
  //     1000: {
  //       items: 1,
  //     },
  //   },
  // });
  // $(".ct_product_gallary_slider").owlCarousel({
  //   loop: true,
  //   margin: 10,
  //   nav: true,
  //   responsive: {
  //     0: {
  //       items: 1,
  //     },
  //     600: {
  //       items: 1,
  //     },
  //     1000: {
  //       items: 1,
  //     },
  //   },
  // });
});
$(window).on("load", function () {
  $(".ct_loader_main").fadeOut();
});
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 300) {
    $(".ct_header").addClass("ct_sticky_menu");
  } else {
    $(".ct_header").removeClass("ct_sticky_menu");
  }
}); //missing );

const swiper = new Swiper(".mySwiper", {
  loop: false,
  slidesPerView: 4, // Show 4 slides
  slidesPerGroup: 4,
  speed: 600,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },

    576: {
      slidesPerView: 2,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },

    768: {
      slidesPerView: 2,
    },

    992: {
      slidesPerView: 3,
    },

    1200: {
      slidesPerView: 4,
    },
  },
});
const swiper2 = new Swiper(".ct_apartment_slider", {
  loop: true,

  centeredSlides: false,
  speed: 600,

  spaceBetween: 20,
  breakpoints: {
    // when window width is >= 0px
    0: {
      slidesPerView: 1,
    },
    // when window width is >= 576px
    576: {
      slidesPerView: 2,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 3,
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 3,
    },
  },
});

$(document).ready(function () {

  $(".ct_apply_filter_btn").click(function () {
    $(".ct_mobile_filter_category_content").addClass("active");
  });
  $(".ct_category_close_btn").click(function () {
    $(".ct_mobile_filter_category_content").removeClass("active");
  });
});

$(document).ready(function () {
  $("#ct_destination_id").focus(function () {
    $(this).addClass("active");
    $(".ct_location_filter").toggleClass("active");
  });
  $("#ct_member_numbers").click(function () {
    $(this).addClass("active");
    $(".ct_member_filter").addClass("active");
  });

  // $("#Amenities").click(function () {
  //   $("#ct_Amenities_drop").toggleClass("active");
  // });
  // $("#price_range").click(function () {
  //   $("#ct_price_range_drop").toggleClass("active");
  // });
  // $("#filter_price").click(function () {
  //   $("#ct_filter_price_drop").toggleClass("active");
  // });
  // $("#bhk").click(function () {
  //   $("#ct_bhk_drop").toggleClass("active");
  // });
  // $("#bed_bath").click(function () {
  //   $("#ct_bed_bath_drop").toggleClass("active");
  // });
  // $('.ct_custom_price_select_dropdown').click(function(){
  //   $('.ct_custom_drop_mega').removeClass('active');
  //   $(this).toggleClass('active');

  //    })
  $('.ct_custom_price_select_dropdown').click(function (e) {
    e.stopPropagation(); // Prevent event from bubbling to document

    // Close all dropdowns except the clicked one
    $('.ct_custom_price_select_dropdown').not(this).removeClass('active');
    $('.ct_custom_drop_mega').not($(this).next('.ct_custom_drop_mega')).removeClass('active');

    // Toggle the clicked dropdown
    $(this).toggleClass('active');
    $(this).next('.ct_custom_drop_mega').toggleClass('active');
  });

  const rangeInput = document.querySelectorAll(".range-input input"),
    priceInput = document.querySelectorAll(".ct_price-input input"),
    range = document.querySelector(".ct_range_slider1 .ct_range_progress");
  let priceGap = 1000;
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
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
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

  // Optional: Click outside to close all dropdowns
  // $(document).click(function () {
  //     $('.ct_custom_price_select_dropdown').removeClass('active');
  //     $('.ct_custom_drop_mega').removeClass('active');
  // });
  // $("#multiDatePicker").multiDatesPicker({
  //   dateFormat: "yy-mm-dd",
  //   maxPicks: 2,
  // });
});



$(".create_listing_2").click(function () {
  $(this).addClass("active");
  $(".create_listing_1").removeClass("active");
  $(".create_listing_1_btn").addClass("d-none");
  $(".create_listing_2_btn").removeClass("d-none");
  $(".create_listing_2_btn").addClass("d-block");
});
$(".create_listing_1").click(function () {
  $(this).addClass("active");
  $(".create_listing_2").removeClass("active");
  $(".create_listing_2_btn").addClass("d-none");
  $(".create_listing_1_btn").removeClass("d-none");
  $(".create_listing_1_btn").addClass("d-block");
});
