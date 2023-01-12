const list = document.querySelector(".list");
const content = document.querySelector(".content");
let nextPageToken = "";
let playlist = [];
let featuredHTML = "";

fetch(
  "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLeTlEEB2MZX4DD7AekVNw2bwBUz4uNBad&key=AIzaSyAxN5HNU7dCj1AUh6p4IOXB0ZdpdKwlkJU"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let videos = data.items;
    nextPageToken = data.nextPageToken;
    let i = 0;
    for (video of videos) {
      let title = video.snippet.title;
      let imgURL = video.snippet.thumbnails.medium.url;
      let descriptionTxt = video.snippet.description;
      playlist[i] = video;
      list.innerHTML += `
      <div class="gallery img-fluid m-1">
                <img class="tn img-fluid"  id="${String(i)}" src="${
        playlist[i].snippet.thumbnails.high.url
      }" onclick=videoClicked(${String(i)})>
            </div>
                `;
      i++;
    }
  });

let selection = playlist.length;
function videoClicked(id) {
  let tnURL = document.getElementById(id).src;
  tnURL = tnURL.replace("https://i.ytimg.com/vi/", "");
  let vidId = tnURL.slice(0, -14);
  console.log(vidId);
  getSelectedVideo(vidId);
}

function getSelectedVideo(videoID) {
  for (i = 0; i < playlist.length; i++) {
    console.log(videoID + " = " + playlist[i].snippet.resourceId.videoId);
    if (videoID == playlist[i].snippet.resourceId.videoId) {
      setEmbeddedVideo(videoID);
    }
  }

  function setEmbeddedVideo(selection) {
    content.innerHTML = `
    <div class="container">
      <iframe
            class="embedded-responsive-item"
            src="https://www.youtube.com/embed/${selection}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
    </div>
    `;
  }
}
