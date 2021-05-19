function sendMessage() {
  var request = new XMLHttpRequest();
  var username = document.getElementById("discord").value;
  var product = document.getElementById("product").value;

  if (username !== "" && product !== "") {
    document.getElementById("discord").value = "";
    document.getElementById("product").value = "";
    
    var webhook_url = process.env['WEBHOOK'];

    request.open(
      "POST",
      webhook_url
    );

    request.setRequestHeader("Content-type", "application/json");

    var params = {
      username: "New Order Submitted",
      content:
        "**A new order was placed by ** " +
        username +
        "\n**Product in question:** " +
        product
    };

    request.send(JSON.stringify(params));

    event.preventDefault();
  } else {
    event.preventDefault();
  }
}
