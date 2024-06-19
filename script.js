// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAeIQI7-YLdcpz9j7dj84aMmLTP80W3R50",
    authDomain: "test-625b9.firebaseapp.com",
    projectId: "test-625b9",
    storageBucket: "test-625b9.appspot.com",
    messagingSenderId: "652111460325",
    appId: "1:652111460325:web:5f0b319907429b6770a10c",
    measurementId: "G-1BM530WDZ6"
};
firebase.initializeApp(firebaseConfig);

let mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Function to dynamically add images to the gallery
function loadImages() {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const gallery = document.getElementById('gallery');

    // List all files in the storage bucket
    storageRef.listAll().then(function(result) {
        const images = result.items.map(item => item.getDownloadURL());
        return Promise.all(images);
    }).then(urls => {
        let rowDiv;
        urls.forEach((url, index) => {
            if (index % 2 === 0) {
                rowDiv = document.createElement('div');
                rowDiv.className = 'row';
                gallery.appendChild(rowDiv);
            }
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.alt = "Photo";
            rowDiv.appendChild(imgElement);
        });
    }).catch(function(error) {
        console.log("Error listing files: ", error);
    });
}

// Load images when the page loads
window.onload = loadImages;