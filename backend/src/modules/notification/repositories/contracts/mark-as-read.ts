export interface IMarkNotificationAsReadRepository {
  execute(notificationId: string, userId: string): Promise<boolean>;
}
