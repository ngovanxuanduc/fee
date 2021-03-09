$(document).ready(() => {
  show();
});

let edtAmount = $("#edt-amount");
let price = $("#price");
let amoutBefore;

function isNumber(str) {
  return /^\d+$/.test(str);
}

$("#plus").click(() => {
  //   console.log("plus");
  edtAmount.val(parseInt(edtAmount.val()) + 1);
  show();
});

$("#minus").click(() => {
  //   console.log("minus");
  let amountCurrent = edtAmount.val();
  if (amountCurrent <= 1) {
    alert("Số lượng sản phẩm cần mua tối thiểu là 1");
    return;
  }
  edtAmount.val(parseInt(edtAmount.val()) - 1);
  show();
});

$("#edt-amount").change(() => {
  let amountCurrent = edtAmount.val();
  console.log("amountCurrent: " + amountCurrent + " " + typeof amountCurrent);
  if (!isNumber(amountCurrent)) {
    edtAmount.val(amoutBefore);
    console.log("nhap so di cha noi");
  }
  if (amountCurrent < 1) {
    edtAmount.val(amoutBefore);
    alert("Số lượng sản phẩm cần mua tối thiểu là 1");
    return;
  }
  //---------------------------
  //   if (amountCurrent < 1) console.log("input: " + edtAmount.val());
  show();
});

$("#edt-amount").focus(() => {
  amoutBefore = edtAmount.val();
  console.log("focus: " + edtAmount.val());
});

function show() {
  //   $("#total").text("duc dep trai");
  //   console.log(edtAmount.val());
  //   console.log(price.text());
  //   console.log(parseInt(price.text()));
  let postfix = price.text().substr(price.text().length - 1);
  $("#total").text(edtAmount.val() * parseInt(price.text()) + postfix);
}
