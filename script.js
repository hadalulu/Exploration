document.querySelectorAll('.filters button').forEach(button=>button.addEventListener('click',()=>{const filter=button.dataset.filter;document.querySelectorAll('.filters button').forEach(b=>b.classList.toggle('active',b===button));document.querySelectorAll('.card').forEach(card=>card.hidden=filter!=='all'&&!card.dataset.category.split(' ').includes(filter))}));

const stops=[
  {day:1,name:'Home in Hermosillo',note:'Early-afternoon arrival + backyard carne asada',lat:29.0729,lng:-110.9559},
  {day:'2-3',name:'Dunas de San Nicolás',note:'Guided sandboarding',lat:28.55,lng:-111.43},
  {day:'2-3',name:'Bahía de Kino',note:'Beach walk + seafood',lat:28.828,lng:-111.94},
  {day:'2-3',name:'Cañón del Nacapule',note:'Morning canyon hike',lat:28.006,lng:-111.065},
  {day:'2-3',name:'San Carlos',note:'Beachfront seafood + sunset',lat:27.958,lng:-111.036},
  {day:4,name:'Restaurant Bugambilias',note:'Tamales on the road to Ures',lat:29.385,lng:-110.447},
  {day:4,name:'Ures',note:'Pueblo Mágico stroll',lat:29.428,lng:-110.386},
  {day:5,name:'Casa Garmendia — Morelos',note:'Early brunch + late-morning departure',lat:29.119,lng:-110.95},
  {day:'flex',name:'Downtown Hermosillo',note:'Historic center + Plaza Zaragoza',lat:29.075,lng:-110.957},
  {day:'flex',name:'Casa Oaxaca 28',note:'A meal at Av. Oaxaca 48, Centro',lat:29.083,lng:-110.958},
  {day:'flex',name:'Cerro del Bachoco',note:'Morning hike',lat:29.145,lng:-110.932},
  {day:4,name:'Parque Madero + Jaris',note:'Park walk + vegan lunch at Jaris',lat:29.079,lng:-110.95},
  {day:'flex',name:'Cerro de la Campana',note:'Sunset viewpoint',lat:29.068,lng:-110.947},
  {day:4,name:'Bosque Urbano La Sauceda',note:'Forest walk, workshop, market, or evening event',lat:29.065,lng:-110.921},
  {day:'flex',name:'Golf at Los Lagos + Calafate',note:'Golf followed by lunch at Calafate',lat:29.109,lng:-111.015},
  {day:'flex',name:'Terrazza Organic Farm',note:'Farm tour followed by brunch or lunch',lat:29.205,lng:-110.833}
];

if(window.L){
  const map=L.map('map',{scrollWheelZoom:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
  const markers=stops.map(stop=>{
    const label=stop.day==='flex'?'F':stop.day==='2-3'?'2/3':stop.day;
    const timing=stop.day==='flex'?'Remaining idea':stop.day==='2-3'?'Days 2–3':`Day ${stop.day}`;
    const icon=L.divIcon({className:'',html:`<div class="day-marker"><span>${label}</span></div>`,iconSize:[34,34],iconAnchor:[17,34]});
    return {stop,marker:L.marker([stop.lat,stop.lng],{icon}).bindPopup(`<strong>${stop.name}</strong><small>${timing} · ${stop.note}</small>`)};
  });
  const showDay=day=>{
    markers.forEach(({stop,marker})=>{const visible=day==='all'||String(stop.day)===day;if(visible&&!map.hasLayer(marker))marker.addTo(map);if(!visible&&map.hasLayer(marker))map.removeLayer(marker)});
    const visible=markers.filter(({stop})=>day==='all'||String(stop.day)===day).map(({marker})=>marker.getLatLng());
    if(visible.length)map.fitBounds(L.latLngBounds(visible),{padding:[38,38],maxZoom:day==='1'?12:10});
  };
  document.querySelectorAll('.day-filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.day-filters button').forEach(b=>{const selected=b===button;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',selected)});showDay(button.dataset.day)}));
  showDay('all');
}
