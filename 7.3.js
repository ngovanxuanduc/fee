function isTextValid(str) {
  return /^[\d\w]+$/.test(str);
}

function isPhoneValid(phone) {
  return /^\d{10}$/.test(phone);
}

function isZipCodeValid(zipCode) {
  return /^\d{5}$/.test(zipCode);
}

function isCVVValid(cvv) {
  return /^\d{3}$/.test(cvv);
}

function isEmailValid(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function isExpMonth(month) {
  return /^(0?[1-9]|1[012])$/.test(month);
}

function isExpYear(month) {
  return /^2\d{3}$/.test(month);
}

function creditCard(card) {
  return /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(
    (card || "").replace(/[^0-9]/g, "")
  );
}

function validState(stateCode) {
  return stateCode !== "--none--";
}

const validators = [
  {
    ids: ["first-name", "last-name", "address", "city", "name-on-card"],
    exec: isTextValid,
  },
  {
    ids: ["zip-code"],
    exec: isZipCodeValid,
  },
  {
    ids: ["phone"],
    exec: isPhoneValid,
  },
  {
    ids: ["cvv"],
    exec: isCVVValid,
  },
  {
    ids: ["email"],
    exec: isEmailValid,
  },
  {
    ids: ["exp-month"],
    exec: isExpMonth,
  },
  {
    ids: ["exp-year"],
    exec: isExpYear,
  },
  {
    ids: ["customControlAutosizing"],
    exec: (x) => x,
  },
  {
    ids: ["credit-card"],
    exec: creditCard,
  },
  {
    ids: ["state"],
    exec: validState,
  },
];

function fnSubmit() {
  const nodes = document.querySelectorAll("form input, select");

  nodes.forEach((x) => {
    document.getElementById(x.id).classList.remove("is-invalid");
  });

  const invalids = getInvalidIds();

  invalids.forEach((id) => {
    document.getElementById(id).classList.add("is-invalid");
  });

  invalids.length === 0 || event.preventDefault();

  console.log("Invalid Ids: ", invalids);
}

function getInvalidIds() {
  const nodes = document.querySelectorAll("form input, select");
  const invalidIds = [];
  nodes.forEach((x) => {
    const validator = validators.find((v) => v.ids.includes(x.id));
    if (
      validator &&
      !validator.exec(
        x.getAttribute("type") === "checkbox" ? x.checked : x.value
      )
    ) {
      invalidIds.push(x.id);
    }
  });

  return invalidIds;
}

function reformatCreditNumber() {
  const credit = document.getElementById("credit-card");

  credit.value = (
    (credit.value || "")
      .replace(/[^0-9]/g, "")
      .substring(0, 16)
      .match(/.{1,4}/g) || []
  ).join("-");
}
