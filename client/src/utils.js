export default class {
  constructor({ store, settings }) {
    Object.assign(this, { store, settings });
    this.state = this.store.state;
  }
}
