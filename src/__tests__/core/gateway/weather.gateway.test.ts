import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axiosInstance } from '@/lib/globals';
import { weatherGateway } from '@/modules/core/gateway-infra/api.weather-gateway';
import { WeatherData } from '@/modules/core/model/Weather';

vi.mock('@/lib/globals', () => ({
  axiosInstance: {
    get: vi.fn(),
  },
}));

describe('WeatherGateway', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('devrait récupérer la météo par coordonnées', async () => {
    const mockWeather: WeatherData = {
      current: {
        at: new Date(),
        temperatureC: 18,
        feelsLikeC: 17,
        windSpeedKmh: 10,
        humidity: 60,
        condition: 'CLEAR',
        precipitationMm: 0,
      },
      nextHours: [],
      nextDays: [],
    };

    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockWeather,
    });

    const lat = 45.0;
    const lng = 6.0;

    const result = await weatherGateway.getWeatherByCoords(lat, lng);

    expect(result).toEqual(mockWeather);
    expect(axiosInstance.get).toHaveBeenCalledWith('/api/weather', {
      params: {
        lat,
        lng,
      },
    });
  });
});
