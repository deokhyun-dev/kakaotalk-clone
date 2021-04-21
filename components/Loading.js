import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img
          src="/img/kakao-talk-logo.png"
          alt="loading"
          height={200}
          style={{ marginBottom: 10 }}
        />
        <Circle color="#ffe812" size={70} />
      </div>
    </center>
  );
}

export default Loading;
