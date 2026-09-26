export type NotifyPayload = {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export type Notifier = {
  notify: (payload: NotifyPayload) => void;
};

const noopNotifier: Notifier = {
  notify: () => undefined,
};

let notifier: Notifier = noopNotifier;

/** Inject the notifier (UI adapter) at app boot. */
export function setNotifier(next: Notifier): void {
  notifier = next;
}

/** Notification port used by core mutations. */
export function notify(payload: NotifyPayload): void {
  notifier.notify(payload);
}
