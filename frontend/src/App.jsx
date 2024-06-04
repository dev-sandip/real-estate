const App = () => {
  const data = {
    name: "John Doe",
    age: 25,
  };
  console.log(data);
  return (
    <div>
      App
      <h2 className="text-red-500"> Name is {data.name}</h2>
    </div>
  );
};

export default App;
