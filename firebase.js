import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAuth } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKUiFGB5OZ6EAFgMCdCJvC5hNGtYZxmQo",
  authDomain: "cloudcanvas-editor.firebaseapp.com",
  projectId: "cloudcanvas-editor",
  storageBucket: "cloudcanvas-editor.firebasestorage.app",
  messagingSenderId: "348875321676",
  appId: "1:348875321676:web:5d7584c7b7b234cdc75fe9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);