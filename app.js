async function processImage() {
  const imageInput = document.getElementById("imageInput");
  const mode = document.getElementById("modeSelect").value;
  const resultText = document.getElementById("resultText");
  const isPremium = localStorage.getItem("premium") === "true";

  if (!imageInput.files[0]) {
    alert("من فضلك ارفع صورة الدرس.");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageInput.files[0]);
  formData.append("mode", mode);
  formData.append("isPremium", isPremium);

  resultText.innerHTML = "⏳ جاري المعالجة...";

  try {
    const response = await fetch("https://homos-learn-ai-server.replit.app/process", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.result) {
      resultText.innerText = data.result;
    } else {
      resultText.innerText = data.error;
    }
  } catch (error) {
    resultText.innerText = "❌ حصلت مشكلة في الاتصال.";
  }
}

function subscribe(type) {
  const phone = "+201016553764";
  const message = type === "monthly"
    ? "مرحبًا، أريد الاشتراك الشهري في HOMOS Learn بقيمة 25 جنيه"
    : "مرحبًا، أريد الاشتراك السنوي في HOMOS Learn بقيمة 200 جنيه";

  window.location.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
