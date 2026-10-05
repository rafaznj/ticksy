export interface IMarkAllNotificationsAsReadRepository {
  execute(userId: string): Promise<boolean>;
}
