const dateFormat = "MM/DD/YY";

function generateCheckBoxes() {
  const today = moment().format(dateFormat);
  const todayMinusOne = moment().subtract(1, "days");

  const slots = new Array(7).fill("");
  const htmlStrings = [];

  for (i = 0; i < slots.length; i++) {
    const day = moment().subtract(i, "days");
    htmlStrings.push(`
      <div style="margin-top: 8px">
        <input
          data="${day.format(dateFormat)}" type="checkbox">${day.format(
      "dddd"
    )} ${day.format(dateFormat)}</input>
      </div>
    `);
  }

  return htmlStrings.reverse().join("");
}

function formatDateRange(dates) {
  return `${dates[0]} - ${dates[dates.length - 1]}`;
}

function calcPayment(dates) {
  return (dates.length * 16.3).toFixed(2);
}

function main() {
  $("#checkboxes").html(generateCheckBoxes());

  let checkedBoxes = [];
  $("input:checkbox").change(function() {
    if ($(this).is(":checked")) {
      checkedBoxes.push($(this).attr("data"));
    } else {
      const updatedCheckedBoxes = checkedBoxes.filter(
        checkedBox => checkedBox !== $(this).attr("data")
      );
      checkedBoxes = updatedCheckedBoxes;
    }

    $("#output").text(
      `Pay $${calcPayment(checkedBoxes)} for ${formatDateRange(checkedBoxes)}`
    );

    $("#payButton").html(`
      <a href="venmo://paycharge?txn=pay&recipients=kate-attardo&amount=${calcPayment(
        checkedBoxes
      )}&note=${encodeURI("Nikko " + formatDateRange(checkedBoxes))}"><button>Pay dog walk daily</button></a>
    `);
  });
}

$(document).ready(main);
