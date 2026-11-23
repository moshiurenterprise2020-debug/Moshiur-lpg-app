মশিউর এন্টারপ্রাইজ LPG — প্রাথমিক PWA ফাইল

গুরুত্বপূর্ণ:
1) এটি APK নয়; এটি একটি প্রাথমিক ওয়েব অ্যাপের ফাইল।
2) বর্তমান সংস্করণে হিসাব এই ফোনের browser storage-এ থাকে। অন্য ফোনে নিজে থেকে sync হবে না।
3) Firebase config যুক্ত করা হয়েছে, কিন্তু Firebase Authentication/Firestore sync এখনো সংযুক্ত নয়।
4) APK বানানোর আগে এই ফাইলগুলো HTTPS ওয়েব হোস্টিংয়ে প্রকাশ করতে হবে; তারপর PWABuilder দিয়ে Android package তৈরি ও পরীক্ষা করতে হবে।

মোবাইল দিয়ে পরবর্তী ধাপ:
- ZIP ফাইলটি Extract করতে হবে।
- Extract করা ফোল্ডারের সব ফাইল Firebase Hosting বা অন্য HTTPS static hosting-এ deploy করতে হবে।
- Deploy করার পর পাওয়া https:// লিংক PWABuilder-এ দিতে হবে।
- এই কাজের জন্য সাধারণত hosting deploy করার উপযুক্ত build/upload workflow প্রয়োজন; শুধু Firebase Console-এ config বসালেই প্রকাশ হয় না।

নিরাপত্তা:
- Firebase Service Account private key, password, বা login code কারও সঙ্গে শেয়ার করবেন না।
