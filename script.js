// =========================================
// SCRIPT.JS - LOGIKA WEBSITE LENGKAP (FINAL)
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi Icon (Mengubah tag <i data-lucide> jadi gambar SVG)
    lucide.createIcons();

    // 2. Animasi Scroll (Reveal)
    // Elemen muncul pelan-pelan saat di-scroll ke bawah
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});

// =========================================
// A. LOGIKA NAVIGASI DESKTOP (DROPDOWN KLIK)
// =========================================
function toggleNavbar() {
    const menu = document.getElementById('navDropdown');
    const icon = document.getElementById('navChevron');
    
    // Tambah/Hapus kelas 'active' pada menu dropdown
    menu.classList.toggle('active');
    
    // Putar ikon panah kecil
    if (menu.classList.contains('active')) {
        if(icon) icon.style.transform = 'rotate(180deg)';
    } else {
        if(icon) icon.style.transform = 'rotate(0deg)';
    }
}

// =========================================
// B. LOGIKA NAVIGASI MOBILE (HAMBURGER)
// =========================================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
}

// =========================================
// C. LOGIKA TAB (KHUSUS HALAMAN INTI)
// =========================================
function openTab(tabName) {
    // 1. Sembunyikan SEMUA konten tab (OSIS, MPK, PKS)
    const allContents = document.querySelectorAll('.tab-content');
    allContents.forEach(content => {
        content.classList.add('hidden'); 
        content.classList.remove('block');
    });

    // 2. Reset warna SEMUA tombol jadi putih
    const allBtns = document.querySelectorAll('.tab-btn');
    allBtns.forEach(btn => {
        btn.classList.remove('bg-slate-800', 'text-white', 'active');
        btn.classList.add('bg-white', 'text-slate-600');
    });

    // 3. Tampilkan konten yang DIPILIH
    const targetContent = document.getElementById('view-' + tabName);
    if (targetContent) {
        targetContent.classList.remove('hidden');
        targetContent.classList.add('block');
        
        // Trik agar animasinya ulang dari awal (Reflow)
        targetContent.classList.remove('reveal'); 
        void targetContent.offsetWidth; 
        targetContent.classList.add('reveal', 'active');
    }

    // 4. Ubah tombol yang DITEKAN jadi gelap
    const targetBtn = document.getElementById('btn-' + tabName);
    if (targetBtn) {
        targetBtn.classList.remove('bg-white', 'text-slate-600');
        targetBtn.classList.add('bg-slate-800', 'text-white', 'active');
    }
}

// =========================================
// D. LOGIKA BUKA-TUTUP (ACCORDION - BIDANG)
// =========================================
function toggleSection(id) {
    const section = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    
    if (section.classList.contains('hidden')) {
        // Buka
        section.classList.remove('hidden');
        if(icon) icon.style.transform = "rotate(180deg)";
    } else {
        // Tutup
        section.classList.add('hidden');
        if(icon) icon.style.transform = "rotate(0deg)";
    }
}

// =========================================
// E. LOGIKA POPUP MODAL (LENGKAP DENGAN KELAS)
// =========================================

// 1. Fungsi Buka Modal
function openModal(name, role, kelas, desc, imgUrl) {
    const modal = document.getElementById('infoModal');
    const content = document.getElementById('modalContent');
    
    // Isi Data ke Elemen HTML
    document.getElementById('modalName').innerText = name;
    document.getElementById('modalRole').innerText = role;
    
    // Cek jika elemen modalClass ada (untuk menghindari error di halaman lain)
    const classElement = document.getElementById('modalClass');
    if (classElement) {
        classElement.innerText = kelas; // Isi Teks Kelas
    }

    document.getElementById('modalDesc').innerText = desc;
    document.getElementById('modalImg').src = imgUrl;

    // Tampilkan
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
    }, 10);
}

// 2. Fungsi Tutup Modal
function closeModal() {
    const modal = document.getElementById('infoModal');
    const content = document.getElementById('modalContent');

    // Sembunyikan dengan animasi
    modal.classList.add('opacity-0');
    content.classList.add('scale-95');
    content.classList.remove('scale-100');
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// =========================================
// F. GLOBAL CLICK HANDLER (KLIK DI LUAR)
// =========================================
window.onclick = function(event) {
    // 1. Jika klik di luar Modal Popup -> Tutup Modal
    const modal = document.getElementById('infoModal');
    if (event.target == modal) {
        closeModal();
    }

    // 2. Jika klik di luar Tombol Struktur -> Tutup Dropdown Desktop
    if (!event.target.closest('.dropdown-trigger')) {
        const navDropdown = document.getElementById('navDropdown');
        const navIcon = document.getElementById('navChevron');
        
        // Jika menu sedang terbuka, tutup paksa
        if (navDropdown && navDropdown.classList.contains('active')) {
            navDropdown.classList.remove('active');
            if(navIcon) navIcon.style.transform = 'rotate(0deg)';
        }
    }

    // 3. Jika klik di luar Menu Mobile -> Tutup Menu Mobile
    // Cek apakah klik BUKAN di tombol menu & BUKAN di dalam menu itu sendiri
    if (!event.target.closest('button[onclick="toggleMobileMenu()"]') && !event.target.closest('#mobile-menu')) {
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    }
}
