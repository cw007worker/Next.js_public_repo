import HttpClient from 'inflastructure/HttpClient';

type getHomeResponse = {
  total_member_count: number;
};

class HomeApi {
  private readonly httpClient: HttpClient;

  constructor({ httpClient }: { httpClient: HttpClient }) {
    this.httpClient = httpClient;
  }

  public getHome = async () => {
    const res = this.httpClient.request<getHomeResponse>({
      method: 'GET',
      url: 'pre_register',
    });

    return res;
  };
}
export default HomeApi;
