import fs from 'fs';

async function test() {
  console.log("Waiting for server to start...");
  await new Promise(r => setTimeout(r, 5000));

  console.log("1. Testing file upload...");
  try {
    // 1x1 transparent PNG
    const pngBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
    const buffer = Buffer.from(pngBase64, 'base64');
    
    // Create form data using Blob
    const formData = new FormData();
    const blob = new Blob([buffer], { type: 'image/png' });
    formData.append('file', blob, 'test-image.png');

    const uploadRes = await fetch("http://localhost:3000/api/upload", {
      method: "POST",
      body: formData
    });

    const uploadData = await uploadRes.json();
    console.log("Upload Response:", uploadData);

    if (!uploadData.success) {
      console.error("Upload failed! Check Cloudinary credentials.");
      return;
    }

    console.log("\n2. Testing database submission...");
    const paperRes = await fetch("http://localhost:3000/api/papers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectName: "Test Subject 2",
        subjectCode: "TEST102",
        branch: "CSE",
        semester: 1,
        year: 2025,
        month: "January",
        examType: "SEE",
        pdfUrl: uploadData.data.pdfUrl,
        cloudinaryId: uploadData.data.cloudinaryId
      })
    });

    const paperData = await paperRes.json();
    console.log("Database Response:", paperData);

    if (paperData.success) {
      console.log("\n✅ ALL TESTS PASSED! Cloudinary and PostgreSQL are working.");
    } else {
      console.error("\n❌ Database submission failed! Check PostgreSQL credentials.");
    }

  } catch (error) {
    console.error("Test error:", error);
  }
}

test();
