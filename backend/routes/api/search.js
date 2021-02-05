const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const fetch = require('node-fetch');

router.get('/', asyncHandler(async (req, res) => {
  const { query: { query } } = req;
  if (!query) return res.json({ predictions: [] });
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${process.env.API_KEY}`
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

module.exports = router;
