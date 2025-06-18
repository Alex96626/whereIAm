// TYPES

// API

type Geoocoding = {
  "place_id": string,
  "licence": string,
  "osm_type": "relation",
  "osm_id": "1879842",
  "lat": string,
  "lon": string,
  "display_name": string,
  "address": {
    "attraction": string,
    "house_number": string,
    "road": string,
    "quarter": string,
    "suburb": string,
    "city": string,
    "state_district": string,
    "state": string,
    "postcode": string,
    "country": string,
    "country_code":string
  },
  "boundingbox": string[],
}

type Coordinates = {
  latitude: number;
  longitude: number;
};

type reverseGeoocodongParams = {
  key: string,
  format: 'json',
  lat: string,
  lon: string
}

const ACCES_TOKEN = "pk.17f81e87c76631ba2dac75d77f04274a";

const getCurrentPosition = (position: GeolocationPosition): Coordinates => {
    const { latitude, longitude } = position.coords;

    return {
      latitude,
      longitude,
    };
};

const startPosition = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(getCurrentPosition(position)))
    })  
  };

const reverseGeoocodng = async ({ latitude, longitude }: Coordinates): Promise<Geoocoding> => {
  const params: reverseGeoocodongParams = {
    key: ACCES_TOKEN,
    lat: String(latitude),
    lon: String(longitude),
    format: "json",
  };

  const paramsToString = new URLSearchParams(params);

  const request = await fetch(`https://us1.locationiq.com/v1/reverse?${paramsToString}`);
  const result: Geoocoding  = await request.json();

  return result;
};

const app = document.querySelector<HTMLDivElement>('.app');

if(!app) {
  throw new Error('erfsdf')
}

app?.addEventListener('click', async ({ target }: MouseEvent) => {
  if(!(target instanceof HTMLButtonElement)) {
    return
  }

  if(!target.classList.contains('whereI')) {
    return;
  }
  const coords = await startPosition();
  const showaddress = await reverseGeoocodng(coords);
  console.log(showaddress);
})

const whereIButton = document.createElement('button');
whereIButton.classList.add('whereI');
whereIButton.textContent = 'Где я?'

app.append(whereIButton);




