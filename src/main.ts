import { randomUUID } from "node:crypto";
import { PaymentGatewayChain, type PaymentGateway } from "./payment-gateway";

class PaymentGateway01 extends PaymentGatewayChain {
  async execute(token: string): Promise<void> {
    if (Math.random() > 0.5) throw new Error();
    console.log("FAKE 1 PAYEMENT-GATEWAY " + token);
  }
}

class PaymentGateway02 extends PaymentGatewayChain {
  async execute(token: string): Promise<void> {
    if (Math.random() > 0.5) throw new Error();
    console.log("FAKE 2 PAYEMENT-GATEWAY " + token);
  }
}

class PaymentGatewayFactory {
  public static createChain(): PaymentGatewayChain {
    const secondPaymentGateway = new PaymentGateway02();
    const firstPaymentGateway = new PaymentGateway01(secondPaymentGateway);
    return firstPaymentGateway;
  }
}

async function main() {
  const paymentGateway: PaymentGateway = PaymentGatewayFactory.createChain();
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await paymentGateway.process(randomUUID());
  }
}

main();
