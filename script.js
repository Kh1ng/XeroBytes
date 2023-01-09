// const hbBtn = document.getElementsById("hamburger");
const list = document.querySelector(".list");
// const dropdownmenu = document.querySelector(".dropdownmenu");
let nextPageToken = "";

fetch(
  "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=PLeTlEEB2MZX4DD7AekVNw2bwBUz4uNBad&key=AIzaSyAxN5HNU7dCj1AUh6p4IOXB0ZdpdKwlkJU"
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let videos = data.items;
    nextPageToken = data.nextPageToken;

    for (video of videos) {
      let title = video.snippet.title;
      let imgURL = video.snippet.thumbnails.high.url;
      let descriptionTxt = video.snippet.description;
      list.innerHTML += `
      <div class="gallery">
                <img src="${video.snippet.thumbnails.default.url}">
            </div>
                `;
    }
  });

function dropDown() {
  console.log("click");
}
