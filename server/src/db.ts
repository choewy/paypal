export class OrderDB {
  private maps: Record<string, string> = {};

  async findByOrderID(orderID: string): Promise<string | null> {
    return this.maps[orderID];
  }

  async insert(orderID: string, paypalRequestID: string): Promise<void> {
    this.maps[orderID] = paypalRequestID;
  }
}
