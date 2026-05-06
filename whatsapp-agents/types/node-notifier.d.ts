declare module "node-notifier" {
  interface NotificationOptions {
    title?: string;
    message?: string;
  }

  const notifier: {
    notify(options: NotificationOptions): void;
  };

  export default notifier;
}
