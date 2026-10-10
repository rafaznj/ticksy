export interface IGetUnreadNotificationCountRepository {
  execute(userId: string): Promise<number>;
}
