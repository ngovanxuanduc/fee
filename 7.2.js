$("#btn").click(() => {
  console.log("bam nut");
  let tbody = $("tbody");
  console.log(tbody.html());
  tbody.append(getRow());
});

function getRow() {
  var row = document.createElement("tr");
  row.insertCell(0);
  row.insertCell(1);
  row.insertCell(2);
  row.insertCell(3);
  row.insertCell(4);
  return row;
}
