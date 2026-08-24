$(document).ready(function () {
  ShowCalendar();
});

var events = [];
var calendarEl = document.getElementById("calendar");
var calendar = new FullCalendar.Calendar(calendarEl, {
  initialView: "dayGridMonth",

  events: function (info, successCallback, failureCallback) {
    successCallback(events);
  },
});

function ShowCalendar() {
  calendar.render();
}

$("#addEvent").on("click", function () {
  let startDate = $("#fromDate").val();
  let endDate = new Date($("#toDate").val());

  // Add one day to make it inclusive
  endDate.setDate(endDate.getDate() + 1);

  // Format the date to yyyy-mm-dd
  let endDateFormatted = endDate.toISOString().split("T")[0];

  events.push({
    title: $("#eventName").val(),
    start: startDate,
    end: endDateFormatted,
  });

  calendar.refetchEvents();
});

