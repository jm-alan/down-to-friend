export default function Predictions ({ predictions }) {
  return predictions.length
    ? (
      <ul className='search-prediction-container'>
        {predictions.map((prediction, idx) => (
          <li
            key={idx}
            className='search-prediction'
          >
            <div>
              {prediction.description}
            </div>
          </li>
        ))}
      </ul>
      )
    : null;
}
