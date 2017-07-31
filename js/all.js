var xhr = new XMLHttpRequest();
xhr.open('get', 'data.json', true);
xhr.send();
xhr.onload = function() {
	var data = JSON.parse(xhr.responseText);
	var selectZone = document.getElementById('selectZoneId');
	var zoneTitle = document.getElementById('zoneTitleId');
	var siteList = document.querySelector('.siteList');

	selectZone.addEventListener('change', updateList, false)

	var dataLen = data.length;

	function updateList(e) {
		var selectedZone = e.target.value;
		zoneTitle.textContent = selectedZone;
		var siteListLi = '';

		for(var i = 0; i < dataLen; i++) {
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
}