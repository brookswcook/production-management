import { useUserQuery } from "../../generated/graphql";
import "./styles.css";

function App() {
  const { data, loading, error } = useUserQuery({
    variables: {},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <span>Production control app. Hi {data?.user.name}</span>
      </header>
    </div>
  );
}

export default App;
