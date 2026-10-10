export interface IMarkAllNotificationsAsReadService {
  execute(userId: string): Promise<boolean>;
}
