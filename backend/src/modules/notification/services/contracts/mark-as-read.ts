export interface IMarkNotificationAsReadService {
  execute(notificationId: string, userId: string): Promise<boolean>;
}
