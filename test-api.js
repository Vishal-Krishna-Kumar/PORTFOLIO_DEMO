// Simple test script to verify API endpoints
async function testApis() {
  console.log("Testing API endpoints...\n");

  // Test 1: Health check
  try {
    const healthRes = await fetch("http://localhost:3000/api/health");
    const health = await healthRes.json();
    console.log("✅ /api/health:", health);
  } catch (err) {
    console.log("❌ /api/health failed:", err.message);
  }

  // Test 2: Ask endpoint
  try {
    const askRes = await fetch("http://localhost:3000/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] })
    });
    const ask = await askRes.json();
    console.log("✅ /api/ask:", ask);
  } catch (err) {
    console.log("❌ /api/ask failed:", err.message);
  }

  // Test 3: Now playing
  try {
    const now = await nowRes.json();
  } catch (err) {
  }

  // Test 4: Top tracks
  try {
    const top = await topRes.json();
  } catch (err) {
  }
}

testApis();
