import type { WeatherData } from '@/modules/core/model/Weather';
import { getWeatherConditionLabelFr } from '@/modules/core/utils/weather';

type WeatherPanelProps = {
  weather?: WeatherData;
  isLoading: boolean;
};

const WeatherPanel = ({ weather, isLoading }: WeatherPanelProps) => {
  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Chargement de la météo…</div>;
  }

  if (!weather) {
    return (
      <div className="text-sm text-muted-foreground">
        Aucune donnée météo disponible pour ce spot.
      </div>
    );
  }

  const { current } = weather;

  return (
    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
      <div>
        {current.temperatureC.toFixed(1)}°C, {getWeatherConditionLabelFr(current.condition)}
      </div>
      <div>Ressentie: {current.feelsLikeC.toFixed(1)}°C</div>
      <div>Vent: {current.windSpeedKmh.toFixed(0)} km/h</div>
      <div>Humidité: {current.humidity}%</div>
    </div>
  );
};

export default WeatherPanel;
