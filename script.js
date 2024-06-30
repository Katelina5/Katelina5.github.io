// Initialize Firebase
const firebaseConfig = {
    apiKey: window.env.FIREBASE_API_KEY,
    authDomain: window.env.FIREBASE_AUTH_DOMAIN,
    projectId: window.env.FIREBASE_PROJECT_ID,
    storageBucket: window.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: window.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: window.env.FIREBASE_APP_ID,
    measurementId: window.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics ? firebase.analytics() : null;

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
