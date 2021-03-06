const LOCAL_KEY_NAME = " token";
export default class TokenService {
  public static get(): string | null {
    return localStorage.getItem(LOCAL_KEY_NAME);
  }
  public static set(token: string): void {
    localStorage.setItem(LOCAL_KEY_NAME, token);
  }
  public static remove(): void {
    localStorage.removeItem(LOCAL_KEY_NAME);
  }
}
