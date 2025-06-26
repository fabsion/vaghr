// Handler klik untuk tombol pertama
document.getElementById('button1').addEventListener('click', function() {
    console.log("Button 'We're Gonna Be Okay' clicked! Navigating to lyrics.html");
    window.location.href = 'lyrics.html'; // Mengarahkan ke halaman lirik
});

// Handler klik untuk tombol kedua (Messages)
document.getElementById('button2').addEventListener('click', function() {
    console.log("Button 'Messages' clicked! Navigating to messages.html");
    window.location.href = 'messages.html'; // Mengarahkan ke halaman pesan
});

// Variabel untuk menyimpan interval slideshow agar bisa dihentikan/dimulai
let slideshowInterval;

// Logika untuk slideshow latar belakang
document.addEventListener('DOMContentLoaded', function() {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = document.querySelectorAll('.slideshow-background img');
    const dots = document.querySelectorAll('.dot-navigation .dot');

    let currentSlide = 0;
    const slideIntervalTime = 5000; // Interval waktu pergantian slide (5 detik)

    function updateSlide() {
        // Menggeser slides-wrapper ke posisi slide yang aktif
        slidesWrapper.style.transform = `translateX(-${currentSlide * 100 / slides.length}%)`;

        // Memperbarui kelas 'active' pada titik navigasi
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    }

    // Fungsi untuk memulai slideshow
    function startSlideshow() {
        if (slides.length > 1 && !slideshowInterval) { // Hanya mulai jika ada lebih dari 1 gambar dan belum berjalan
            slideshowInterval = setInterval(nextSlide, slideIntervalTime);
        }
    }

    // Fungsi untuk menghentikan slideshow
    function stopSlideshow() {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }

    // Inisialisasi tampilan slide pertama dan titik
    updateSlide();
    startSlideshow(); // Mulai slideshow saat halaman dimuat

    // Tambahkan event listener untuk setiap titik navigasi
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.dataset.slideIndex); // Ambil indeks dari data-slide-index
            currentSlide = index; // Atur slide saat ini ke indeks yang diklik
            updateSlide(); // Perbarui tampilan slide dan titik
            // Reset interval agar tidak langsung berganti setelah klik manual
            stopSlideshow();
            startSlideshow();
        });
    });
});
