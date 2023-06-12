document.querySelector("#record-button").addEventListener("click", async function() {
	document.querySelector("#record-button").style.display = "none"
	document.querySelector("#stop-button").style.display = "block"
	document.getElementById('video').style.display = "none"
	document.getElementById('curvid').style.display = "block"
	document.getElementById('curvid').srcObject = await navigator.mediaDevices.getDisplayMedia({
		video: true,
		audio: true,
	})

	let mediaRecorder = new MediaRecorder(document.getElementById('curvid').srcObject, {
		mimeType: "video/webm"
	})

	let chunks = []
	mediaRecorder.addEventListener('dataavailable', function(e) {
		chunks.push(e.data)
	})

	mediaRecorder.addEventListener('stop', function() {
		let video = document.getElementById('video')
		video.src = URL.createObjectURL(new Blob(chunks, {
			type: chunks[0].type
		}))
		document.getElementById('dl').href = video.src
		document.getElementById('dl').style.display = "block"
		document.getElementById('curvid').style.display = "none"
		document.getElementById('video').style.display = "block"
		document.querySelector("#record-button").style.display = "block"
		document.querySelector("#stop-button").style.display = "none"

	})

	mediaRecorder.start()
	document.querySelector("#stop-button").addEventListener("click", async function() {
		mediaRecorder.stop();
		stopCapture()
	})

})

function stopCapture() {
	let tracks = document.getElementById('curvid').srcObject.getTracks();
	tracks.forEach((track) => track.stop());
	document.getElementById('curvid').srcObject = null
}