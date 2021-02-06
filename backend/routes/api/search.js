const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');

router.get('/autocomplete', asyncHandler(async (req, res) => {
  const { query: { query } } = req;
  if (!query) return res.json({ predictions: [] });
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
      query
    }&key=${
      process.env.API_KEY
    }`
  );
  const failedPredictions = {
    predictions: [
      'Sorry, something went wrong.',
      `Status: ${resp.status} ${resp.statusText}`
    ]
  };
  const { predictions } = resp.ok
    ? await resp.json()
    : failedPredictions;
  res.json({ predictions });
}));

router.get('/details', asyncHandler(async (req, res) => {
  const { query: { placeId } } = req;
  if (!placeId) return res.json({ lng: 0, lat: 0 });
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${process.env.API_KEY}`
  );
  const failedGeometry = {
    geometry: {
      location: {
        lat: 0,
        lng: 0
      }
    },
    message: `Detail request failed. ${resp.status} ${resp.statusText}`
  };
  const { result: { geometry: { location } } } = resp.ok
    ? await resp.json()
    : failedGeometry;
  return res.json({ location });
}));

router.get('/raw', asyncHandler(async (req, res) => {
  const { query: { query } } = req;
  if (!query.length) return res.json({ location: { lat: 0, lng: 0 } });
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.API_KEY}`
  );
  const { geometry: { location } } = resp.ok
    ? (await resp.json()).results[0]
    : { geometry: { location: { lat: 0, lng: 0 } } };
  res.json({ location });
}));

module.exports = router;
