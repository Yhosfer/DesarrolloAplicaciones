import Header from "./components/Header";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <UserProfile />
      </main>
    </div>
  );
}

export default App;
