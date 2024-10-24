import { randomUUID } from "node:crypto";
import { type PaymentGateway, paymentChain } from "./payment-gateway";

async function main() {
  const paymentGateway: PaymentGateway = paymentChain;
  await paymentGateway.process(randomUUID());
}

main();
