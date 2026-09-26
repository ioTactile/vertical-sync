export type NotifyPayload = {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
};

export type Notifier = {
  notify: (payload: NotifyPayload) => void;
};

const noopNotifier: Notifier = {
  notify: () => undefined,
};

let notifier: Notifier = noopNotifier;

/** Injection du notificateur (adapter UI) au boot de l'app. */
export function setNotifier(next: Notifier): void {
  notifier = next;
}

/** Port de notification utilisé par les mutations core. */
export function notify(payload: NotifyPayload): void {
  notifier.notify(payload);
}
