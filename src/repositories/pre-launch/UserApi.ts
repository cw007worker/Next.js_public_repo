import HttpClient from 'inflastructure/HttpClient';

type postUserParams = {
  invite_token: string | null;
};
type postUserResponse = { message: string } | { messages: [] };

class UserApi {
  private readonly httpClient: HttpClient;

  constructor({ httpClient }: { httpClient: HttpClient }) {
    this.httpClient = httpClient;
  }

  public postUser = async ({ invite_token }: postUserParams) => {
    const res = this.httpClient.request<postUserResponse>({
      method: 'POST',
      url: 'pre_register/users',
      params: {
        invite_token,
      },
    });

    return res;
  };
}
export default UserApi;
