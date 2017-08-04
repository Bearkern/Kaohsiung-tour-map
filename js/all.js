var siteInfoTab = document.querySelector('.siteInfoTab');
var siteLocationTab = document.querySelector('.siteLocationTab');
var mapStyle = document.querySelector('.mapStyle');
var siteList = document.querySelector('.siteList');
var zoneTitle = document.getElementById('zoneTitleId');

siteInfoTab.addEventListener('click', function() {
	zoneTitle.textContent = '';
	selectZone.style.display = 'block';
	selectLocation.style.display = 'none';
	mapStyle.style.display = 'none';
	siteList.style.display = 'block';
	siteInfoTab.className = 'siteInfoTab active';
	siteLocationTab.className = 'siteLocationTab';
}, false)

siteLocationTab.addEventListener('click', function() {
	zoneTitle.textContent = '';
	selectZone.style.display = 'none';
	selectLocation.style.display = 'block';
	mapStyle.style.display = 'block';
	siteList.style.display = 'none';
	siteInfoTab.className = 'siteInfoTab';
	siteLocationTab.className = 'siteLocationTab active';
}, false)

var map;
var data;
var dataLen
var marker;
var markers = [];

// Initialize Map
function initMap() {
	var kaosiung = {
		lat: 22.665768464,
		lng: 120.32489392799998
	}

	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: kaosiung
	});

	getData();
}

function getData() {
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'data.json', true);
	xhr.send();
	xhr.onload = function() {
		data = JSON.parse(xhr.responseText);
		dataLen = data.length;
	}
}

// 旅遊資訊列表Tab
var selectZone = document.getElementById('selectZoneId');

selectZone.addEventListener('change', updateList, false);

function updateList(e) {
	var selectedZone = e.target.value;
	zoneTitle.textContent = selectedZone;
	var siteListLi = '';

	for (var i = 0; i < dataLen; i++) {
		if (selectedZone == data[i].Zone) {
			siteListLi += '<li>';
			siteListLi += '<div class="sitePic" style="background-image:url(' + data[i].Picture1 + ')">';
			siteListLi += '<p class="name">' + data[i].Name + '</p>';
			siteListLi += '<em class="zone">' + data[i].Zone + '</em>';
			siteListLi += '</div>';
			siteListLi += '<div class="siteInfo">';
			siteListLi += '<p><img src="assets/icons_clock.png">' + data[i].Opentime + '</p>';
			siteListLi += '<p><img src="assets/icons_pin.png">' + data[i].Add + '</p>';
			siteListLi += '<p><img src="assets/icons_phone.png">' + data[i].Tel + '</p>';
			siteListLi += '<p><img src="assets/icons_tag.png">' + data[i].Ticketinfo + '</p>';
			siteListLi += '</div>';
			siteListLi += '</li>';
		};
	}
	siteList.innerHTML = siteListLi;
}

// 區域景點位置Tab
var selectLocation = document.getElementById('selectLocationId');

selectLocation.addEventListener('change', updateMap, false);

function updateMap(e) {

	for (i = 0; i < markers.length; i++) {
		markers[i].setMap(null)
	}
	markers = [];

	for(var i = 0; i < dataLen; i++) {
		if(e.target.value == data[i].Zone) {
			loadData(data[i].Py, data[i].Px, data[i].Name);
		}
	}

	var selectedZone = e.target.value;
	zoneTitle.textContent = selectedZone;
}

function loadData(lat, lng, title) {
	var str = {};
	var location = {};

	location.lat = Number(lat);
	location.lng = Number(lng);

	str.map = map;
	str.title = title;
	str.position = location;
	marker = new google.maps.Marker(str);
	showData(marker, str.title);
	markers.push(marker);
}

var currentInfoWindow = '';
function showData(marker, siteName) {
	var infowindow = new google.maps.InfoWindow({
		content: siteName
	});

	marker.addListener('click', function () {
		if (currentInfoWindow != '') {
			currentInfoWindow.close();
			currentInfoWindow = '';
		}

		infowindow.open(map, marker);
		currentInfoWindow = infowindow;
	});
}

