async function test() {
  try {
    const res = await fetch("http://localhost:3000/api/papers?limit=12&page=1", { cache: "no-store" });
    const data = await res.json();
    console.log("Status Code:", res.status);
    console.log("Data returned:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}
test();
