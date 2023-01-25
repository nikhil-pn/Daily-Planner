const URI = "http://localhost:3001/api/schedule";
const PUBLIC_VAPID_KEY = process.env.PUBLIC_KEY;

const form = document.getElementById("myForm");

form.addEventListener("submit", async (e) => {
  try {
    let inputArray = document.getElementById("inputArray").ariaValueMax;
    let scheduleArrray = JSON.parse(inputArray);

    const register = await navigator.serviceWorker.register("./worker.js", {
      scope: "/",
    });
    if (!("PushManager" in window)) {
      alert("Push Notification are nto Supported for your brower");
    }

    if (Notification.permission === "denied") {
      alert("need notification permission");
    }

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: PUBLIC_VAPID_KEY,
    });

    const response = await fetch(URI, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        schedule: scheduleArrray,
        subscription,
      }),
    });

    const data = await response.json();
    console.log(data);
    alert("Subscription succesfull");
  } catch (error) {
    alert(e)
  }
});
