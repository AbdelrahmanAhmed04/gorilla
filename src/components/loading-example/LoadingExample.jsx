import { useLoading } from "../loading-context/LoadingContext";

function LoadingExample() {
  const { showLoading, hideLoading } = useLoading();

  const handleSimulateLoading = () => {
    showLoading("Simulating data fetch...");

    // Simulate an API call
    setTimeout(() => {
      hideLoading();
    }, 3000);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h3>Loading Screen Example</h3>
      <p>Click the button below to see the loading screen in action:</p>
      <button
        onClick={handleSimulateLoading}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Simulate Loading
      </button>
    </div>
  );
}

export default LoadingExample;
