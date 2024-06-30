var firebaseConfig = {
    apiKey: "AIzaSyAeIQI7-YLdcpz9j7dj84aMmLTP80W3R50",
    authDomain: "test-625b9.firebaseapp.com",
    projectId: "test-625b9",
    storageBucket: "test-625b9.appspot.com",
    messagingSenderId: "652111460325",
    appId: "1:652111460325:web:d9e111ec2ff0b31870a10c",
    measurementId: "G-CFHNLMF97F"
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

function loadImages() {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const gallery = document.getElementById('gallery');

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

window.onload = loadImages;