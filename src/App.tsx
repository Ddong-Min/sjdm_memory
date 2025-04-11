import {Status, Wrapper} from "@googlemaps/react-wrapper";
import GoogleMap from "./components/GoogleMap";
import Invetory from "./components/Inventory";
const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return <>로딩중...</>;
    case Status.FAILURE:
      return <>에러 발생</>;
    case Status.SUCCESS:
      return <GoogleMap />;
  }
};

function App() {

  return (
    <div style={{
      position:"relative",
    }}>
      <Invetory/>
      <Wrapper 
      apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ""} 
      render={render} 
      libraries={["marker", 'geometry']}
      />
    </div>

  )
}

export default App