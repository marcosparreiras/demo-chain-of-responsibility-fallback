export interface PaymentGateway {
  process(token: string): Promise<void>;
}

export abstract class PaymentGatewayChain implements PaymentGateway {
  private next?: PaymentGatewayChain;

  public constructor(next?: PaymentGatewayChain) {
    this.next = next;
  }

  public async process(token: string): Promise<void> {
    try {
      await this.execute(token);
    } catch {
      if (this.next) {
        await this.next.process(token);
        return;
      }
      console.log("Payment gateway could not be reached");
    }
  }

  abstract execute(token: string): Promise<void>;
}
