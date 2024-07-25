const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = () => {
  return new Promise((resolve) => rl.question("", resolve));
};

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const app = async () => {
  const n = parseInt(await input());
  let orders = [];

  for (let i = 0; i < n; i++) {
    const order = await input();
    const [nx, ny] = order.split(" ").map(Number);
    orders.push({ quantity: nx, price: ny });
  }

  const m = parseInt(await input());
  let suppliers = [];

  for (let i = 0; i < m; i++) {
    const supplier = await input();
    const [mx, my] = supplier.split(" ").map(Number);
    suppliers.push({ stock: mx, price: my });
  }

  const o = parseInt(await input());
  let machines = [];

  for (let i = 0; i < o; i++) {
    const machine = await input();
    const [ox, oy] = machine.split(" ").map(Number);
    machines.push({ maxUsage: ox, overhead: oy });
  }

  let maxProfit = 0;

  for (let order of orders) {
    for (let supplier of suppliers) {
      for (let machine of machines) {
        if (
          order.quantity <= supplier.stock &&
          order.quantity <= machine.maxUsage
        ) {
          let profit =
            (order.price - supplier.price - machine.overhead * 10) *
            order.quantity;
          if (profit > 0) {
            maxProfit += profit;
          }
        }
      }
    }
  }

  console.log(
    `Keuntungan terbesar yang bisa didapat adalah: ${formatRupiah(maxProfit)}`
  );

  rl.close();
};

app();
