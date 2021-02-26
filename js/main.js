const img = document.querySelector("img");
img.addEventListener("click", handleClick);

async function handleClick() {
  const ip = document.querySelector(".results-ip-address");
  //   map.remove();
  const input = document.querySelector("input");
  // ip.textContent = input.value;

  const res = await getIPData(input);
  generateMap(res.location.lat, res.location.lng);
  input.value = "";
}

async function getIPData(input) {
  const { data } = await axios.get(
    `https://geo.ipify.org/api/v1?apiKey=at_KUp7WdpeCr5GRG5nua9EnulkGyF2c&ipAddress=${input.value}`
  );
  const ip = document.querySelector(".results-ip-address");
  const location = document.querySelector(".results-location");
  const timezone = document.querySelector(".results-timezone");
  const isp = document.querySelector(".results-isp");
  console.log(ip.childNodes[3].textContent);
  ip.childNodes[3].textContent = data.ip;
  location.childNodes[3].textContent = data.location.city;
  timezone.childNodes[3].textContent = data.location.timezone;
  isp.childNodes[3].textContent = data.isp;
  console.log(data);
  return data;
}

function generateMap(lat, long) {
  const mapDOM = document.querySelector(".map");
  mapDOM.innerHTML = "";
  const iframe = document.createElement("iframe");
  iframe.width = "600";
  iframe.height = "450";
  iframe.loading = "lazy";
  iframe.allowFullscreen = true;
  iframe.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBJ9OkCAlFbibZscHGCri7SYPQltuyLSJs
  &q=${lat},${long}`;
  mapDOM.appendChild(iframe);
}

async function initIP() {
  const { data } = await axios.get(
    "https://geo.ipify.org/api/v1?apiKey=at_KUp7WdpeCr5GRG5nua9EnulkGyF2c"
  );
  //   console.log(data);
  const ip = document.querySelector(".results-ip-address");
  const location = document.querySelector(".results-location");
  const timezone = document.querySelector(".results-timezone");
  const isp = document.querySelector(".results-isp");
  console.log(ip.childNodes[3].textContent);
  ip.childNodes[3].textContent = data.ip;
  location.childNodes[3].textContent = data.location.city;
  timezone.childNodes[3].textContent = data.location.timezone;
  isp.childNodes[3].textContent = data.isp;
  return data;
}

window.onload = async function () {
  const res = await initIP();
  console.log(res);
  generateMap(res.location.lat, res.location.lng);
};
