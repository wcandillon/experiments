export default class Subscription {
    private open = true;

    isOpen(): boolean {
        return this.open;
    }

    unsubscribe(): void {
        this.open = false;
    }
}