import HttpClient from 'inflastructure/HttpClient';

type getMypageResponse = {
  email: string;
  invite_token: string;
  invite_member_count: number;
  invite_member_count_last_access?: number;
  invite_rank: number;
  invite_rank_last_access?: number;
  invite_count_top100?: number;
  invite_count_top10?: number;
};

class MypageApi {
  private readonly httpClient: HttpClient;

  constructor({ httpClient }: { httpClient: HttpClient }) {
    this.httpClient = httpClient;
  }

  public getMypage = async () => {
    const res = this.httpClient.request<getMypageResponse>({
      method: 'GET',
      url: 'pre_register/users/info',
    });

    return res;
  };
}
export default MypageApi;
