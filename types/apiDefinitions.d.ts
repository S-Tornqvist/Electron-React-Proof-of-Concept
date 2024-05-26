/**
 * Api for frontend to backend communication, one-way request/response.
 */
export default interface Api {
  /**
   * Returns promise of `"pong"`.
   */
  ping(): Promise<'pong'>;

  /**
   * Returns promise of `n + 1`.
   */
  plusOne(n: number): Promise<number>;
}
