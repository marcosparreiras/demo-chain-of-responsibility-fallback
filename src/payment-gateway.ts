export interface PaymentGateway {
  process(token: string): Promise<void>;
}

abstract class PaymentGatewayChain implements PaymentGateway {
  constructor(public next?: PaymentGatewayChain) {}

  async process(token: string): Promise<void> {
    try {
      await this.imp(token);
    } catch {
      if (this.next) {
        await this.next.process(token);
        return;
      }
      console.log("Payment gateway could not be reached");
    }
  }

  abstract imp(token: string): Promise<void>;
}

class Fake1PaymentGateway extends PaymentGatewayChain {
  async imp(token: string): Promise<void> {
    if (Math.random() > 0.5) throw new Error();
    console.log("FAKE 1 PAYEMENT-GATEWAY " + token);
  }
}

class Fake2PaymentGateway extends PaymentGatewayChain {
  async imp(token: string): Promise<void> {
    if (Math.random() > 0.5) throw new Error();
    console.log("FAKE 2 PAYEMENT-GATEWAY " + token);
  }
}

const fake2PaymentGateway = new Fake2PaymentGateway();
export const paymentChain = new Fake1PaymentGateway(fake2PaymentGateway);
