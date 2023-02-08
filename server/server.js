const express = require("express");
const app = express();
const barRouter = require("./routes/bar");
const concessionRouter = require("./routes/concession");
const stripe = require("stripe")(
  "sk_test_51MZ12jJEa84ywZCmIu3IIUicd1jXzhBHN6yIcgWEzKNgm5MnF69cIhL8wCpOngAoHqN8kHo8prhDuJvWxXYCjI4a00W0pA8Zi3"
);

const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

require("dotenv").config();
const { PORT } = process.env;

app.use("/bar", barRouter);
app.use("/concession", concessionRouter);

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log("Press CTRL + C to stop server");
});
