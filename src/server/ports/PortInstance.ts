export class PortInstance {
  constructor(public readonly port: number, public readonly free: () => void) {}
}
