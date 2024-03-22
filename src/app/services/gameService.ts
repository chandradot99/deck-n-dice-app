import ApiService from "./apiService";

class GameService {
  private readonly apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  async createGame(game: any): Promise<{ success: boolean; data: any }> {
    try {
      const { data } = await this.apiService.post("/games", { game });
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }

  async fetchGame(gameId: string): Promise<{ success: boolean; data: any }> {
    try {
      const { data } = await this.apiService.get(`/games/${gameId}`);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        data: error,
      };
    }
  }
}

export default GameService;
