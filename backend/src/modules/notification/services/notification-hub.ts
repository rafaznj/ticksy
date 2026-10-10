import { Injectable, MessageEvent } from "@nestjs/common";
import { Subscriber, Observable, interval, map, merge } from "rxjs";
import { NotificationViewModel } from "../view-models/notification.vm";

@Injectable()
export class NotificationHub {
  private readonly connections = new Map<string, Set<Subscriber<MessageEvent>>>();

  subscribe(userId: string): Observable<MessageEvent> {
    const live = new Observable<MessageEvent>((subscriber) => {
      const userConnections = this.connections.get(userId) ?? new Set();
      userConnections.add(subscriber);
      this.connections.set(userId, userConnections);

      return () => {
        userConnections.delete(subscriber);
        if (userConnections.size === 0 && this.connections.get(userId) === userConnections) {
          this.connections.delete(userId);
        }
      };
    });

    const heartbeat = interval(25_000).pipe(
      map((): MessageEvent => ({ type: "ping", data: "ping" })),
    );

    return merge(live, heartbeat);
  }

  publish(userId: string, notification: NotificationViewModel) {
    this.connections
      .get(userId)
      ?.forEach((connection) =>
        connection.next({ id: notification.id, type: "notification", data: notification }),
      );
  }
}
