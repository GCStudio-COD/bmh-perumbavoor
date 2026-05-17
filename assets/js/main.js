/**
 * BMH Hospital Website - Core UI Interactions
 * Custom High-Performance Navigation Drawer Controller and modern layout scripting.
 */
const lenis = new Lenis({
    autoRaf: true,
});

document.addEventListener('DOMContentLoaded', () => {


    const toggler = document.querySelector('.navbar-toggler');
    const collapse = document.querySelector('.navbar-collapse');

    if (toggler && collapse) {
        // Toggle active classes on click
        toggler.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = toggler.getAttribute('aria-expanded') === 'true';
            toggler.setAttribute('aria-expanded', !isExpanded);
            collapse.classList.toggle('show');
        });

        // Closes drawer on clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (toggler.getAttribute('aria-expanded') === 'true' &&
                !collapse.contains(e.target) &&
                !toggler.contains(e.target)) {
                toggler.setAttribute('aria-expanded', 'false');
                collapse.classList.remove('show');
            }
        });
    }

    // High-performance animated counter function
    const startCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // IntersectionObserver to trigger counter when visible
    const statsSection = document.querySelector('.about-stats-row');
    if (statsSection) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        observer.observe(statsSection);
    }

    // Initialize World-Class Facilities Swiper Carousel
    const facilitiesSwiper = new Swiper('.facilities-swiper', {
        slidesPerView: 1.2,
        spaceBetween: 16,
        grabCursor: true,
        loop: false,
        pagination: {
            el: '.facilities-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            576: {
                slidesPerView: 1.8,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2.3,
                spaceBetween: 24,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 30,
            }
        }
    });

    // Initialize Our Specialties Swiper Carousel (Common for Desktop and Mobile)
    if (document.querySelector('.specialties-swiper')) {
        const specialtiesSwiper = new Swiper('.specialties-swiper', {
            slidesPerView: 1.2,
            spaceBetween: 16,
            grabCursor: true,
            loop: false,
            navigation: {
                nextEl: '.specialties-next',
                prevEl: '.specialties-prev',
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.8,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2.3,
                    spaceBetween: 24,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            }
        });
    }

    // Refresh ScrollTrigger to ensure Swiper slide size changes do not affect downstream coordinates
    setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 100);



    // Force ScrollTrigger refresh on window load to ensure absolute alignment accuracy
    window.addEventListener('load', () => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    });

    // Form Validation and Submission Handling for Appointment Modal
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (appointmentForm.checkValidity()) {
                const submitButton = appointmentForm.querySelector('button[type="submit"]');

                // Show a modern submitting spinner
                submitButton.disabled = true;
                submitButton.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin me-2"></i> Booking...`;

                setTimeout(() => {
                    const modalBody = appointmentForm.closest('.modal-body');

                    appointmentForm.style.transition = 'opacity 0.3s';
                    appointmentForm.style.opacity = '0';

                    setTimeout(() => {
                        appointmentForm.classList.add('d-none');

                        const successAlert = document.createElement('div');
                        successAlert.className = 'text-center py-5';
                        successAlert.innerHTML = `
                            <div class="mb-4">
                                <i class="fa-regular fa-circle-check text-success" style="font-size: 64px;"></i>
                            </div>
                            <h3 class="text-white font-weight-bold mb-3" style="font-family: 'Montserrat', sans-serif;">Appointment Requested!</h3>
                            <p class="text-muted mx-auto mb-4" style="max-width: 450px;">Thank you for choosing BMH Perumbavoor. Our medical coordinator will call you back within 2-4 business hours to finalize your appointment schedule.</p>
                            <button type="button" class="btn btn-primary rounded-pill px-5 py-2" data-bs-dismiss="modal">Close Window</button>
                        `;
                        modalBody.appendChild(successAlert);
                    }, 300);
                }, 1500);
            }

            appointmentForm.classList.add('was-validated');
        }, false);
    }

    // Premium Infrastructure Gallery Filtering System
    const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');

    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Toggle active button style
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    item.style.transition = 'all 0.4s ease';
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        item.classList.remove('d-none');
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.classList.add('d-none');
                        }, 400);
                    }
                });
            });
        });
    }

    // Dynamic Lightbox Modal Image Handlers
    const lightboxModal = document.getElementById('lightboxModal');
    if (lightboxModal) {
        lightboxModal.addEventListener('show.bs.modal', (event) => {
            const triggerButton = event.relatedTarget;
            const imgSrc = triggerButton.getAttribute('data-src');
            const imgTitle = triggerButton.getAttribute('data-title');

            const lightboxImage = lightboxModal.querySelector('#lightboxImage');
            const lightboxTitle = lightboxModal.querySelector('#lightboxTitle');

            if (lightboxImage && lightboxTitle) {
                lightboxImage.src = imgSrc;
                lightboxTitle.textContent = imgTitle;
            }
        });
    }

    // Custom Date Picker Calendar Logic
    const datepickerWrapper = document.getElementById('datepickerWrapper');
    const modalDateInput = document.getElementById('modalDateInput');
    const customCalendarPopover = document.getElementById('customCalendarPopover');
    const calendarMonthYear = document.getElementById('calendarMonthYear');
    const calendarDaysGrid = document.getElementById('calendarDaysGrid');
    const prevMonthBtn = document.getElementById('prevMonthBtn');
    const nextMonthBtn = document.getElementById('nextMonthBtn');

    if (datepickerWrapper && modalDateInput && customCalendarPopover) {
        let currentDate = new Date();
        let selectedDate = null;

        // Toggle popover visibility
        modalDateInput.addEventListener('click', (e) => {
            e.stopPropagation();
            customCalendarPopover.classList.toggle('d-none');
            renderCalendar(currentDate);
        });

        datepickerWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            customCalendarPopover.classList.remove('d-none');
            renderCalendar(currentDate);
        });

        // Hide popover when clicking outside
        document.addEventListener('click', (e) => {
            if (!datepickerWrapper.contains(e.target) && !customCalendarPopover.contains(e.target)) {
                customCalendarPopover.classList.add('d-none');
            }
        });

        // Month navigation
        prevMonthBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });

        nextMonthBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        function renderCalendar(date) {
            const year = date.getFullYear();
            const month = date.getMonth();

            calendarMonthYear.textContent = `${months[month]} ${year}`;

            // Clear days grid
            calendarDaysGrid.innerHTML = '';

            // First day of the month (0 = Sunday, 6 = Saturday)
            const firstDayIndex = new Date(year, month, 1).getDay();

            // Total days in current month
            const totalDays = new Date(year, month + 1, 0).getDate();

            // Render empty cells for leading weekday padding
            for (let i = 0; i < firstDayIndex; i++) {
                const emptyCell = document.createElement('div');
                calendarDaysGrid.appendChild(emptyCell);
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Render actual calendar days
            for (let day = 1; day <= totalDays; day++) {
                const dayCell = document.createElement('div');
                dayCell.className = 'calendar-day';
                dayCell.textContent = day;

                const cellDate = new Date(year, month, day);
                cellDate.setHours(0, 0, 0, 0);

                // Disable past dates
                if (cellDate < today) {
                    dayCell.classList.add('disabled');
                } else {
                    // Check if selected
                    if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
                        dayCell.classList.add('selected');
                    }
                    // Check if today
                    if (cellDate.getTime() === today.getTime()) {
                        dayCell.classList.add('today');
                    }

                    dayCell.addEventListener('click', (e) => {
                        e.stopPropagation();
                        selectedDate = cellDate;

                        // Format: YYYY-MM-DD
                        const formattedDay = String(day).padStart(2, '0');
                        const formattedMonth = String(month + 1).padStart(2, '0');
                        modalDateInput.value = `${year}-${formattedMonth}-${formattedDay}`;

                        customCalendarPopover.classList.add('d-none');

                        // Force Bootstrap validation check
                        modalDateInput.dispatchEvent(new Event('input'));
                    });
                }

                calendarDaysGrid.appendChild(dayCell);
            }
        }
    }
    // Stop background scroll (Lenis) when any Bootstrap modal is opened
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            if (typeof lenis !== 'undefined') {
                lenis.stop();
            }
        });
        modal.addEventListener('hidden.bs.modal', () => {
            if (typeof lenis !== 'undefined') {
                lenis.start();
            }
        });
    });
    // Careers / Work With Us File Attachment & Submission Logic (Dummy Underline Sync)
    const careersFileWrapper = document.getElementById('careersFileWrapper');
    const careersFile = document.getElementById('careersFile');
    const careersFileDummy = document.getElementById('careersFileDummy');

    if (careersFileWrapper && careersFile && careersFileDummy) {
        // Click wrapper triggers the hidden native file input
        careersFileWrapper.addEventListener('click', (e) => {
            if (e.target !== careersFile) {
                careersFile.click();
            }
        });

        // Mirror the chosen file name to the custom read-only underline field
        careersFile.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                careersFileDummy.value = fileName;
                // Trigger input event to update validation state
                careersFileDummy.dispatchEvent(new Event('input'));
            } else {
                careersFileDummy.value = '';
            }
        });
    }

    const careersForm = document.getElementById('careersForm');
    const careersFormContainer = document.getElementById('careersFormContainer');
    const careersSuccessState = document.getElementById('careersSuccessState');

    if (careersForm && careersFormContainer && careersSuccessState) {
        careersForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!careersForm.checkValidity()) {
                careersForm.classList.add('was-validated');
                return;
            }

            const submitBtn = careersForm.querySelector('button[type="submit"]');

            // Trigger premium loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Submitting CV...`;

            setTimeout(() => {
                // Fade out form and fade in success tick card
                careersFormContainer.style.transition = 'opacity 0.4s ease';
                careersFormContainer.style.opacity = '0';

                setTimeout(() => {
                    careersFormContainer.classList.add('d-none');
                    careersSuccessState.classList.remove('d-none');
                    careersSuccessState.style.opacity = '0';
                    careersSuccessState.style.transition = 'opacity 0.4s ease';

                    setTimeout(() => {
                        careersSuccessState.style.opacity = '1';
                    }, 50);
                }, 400);

            }, 1800);
        });
    }

    // Initialize Events Swiper (Mobile Only - Under 768px Viewports)
    let eventsSwiperInstance = null;

    const initEventsSwiper = () => {
        const eventsContainer = document.querySelector('.events-swiper');
        if (!eventsContainer) return;

        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            if (!eventsSwiperInstance) {
                eventsSwiperInstance = new Swiper('.events-swiper', {
                    slidesPerView: 1,
                    spaceBetween: 15,
                    grabCursor: true,
                    loop: false,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    scrollbar: {
                        el: '.events-scrollbar',
                        draggable: true,
                        snapOnRelease: true,
                    }
                });
            }
        } else {
            if (eventsSwiperInstance) {
                // Completely dismantle Swiper and clean inline styling elements
                eventsSwiperInstance.destroy(true, true);
                eventsSwiperInstance = null;
            }
        }
    };

    // Initialize state immediately
    initEventsSwiper();

    // Debounced listener to re-evaluate Swiper bounds on viewport transitions
    let eventsResizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(eventsResizeTimeout);
        eventsResizeTimeout = setTimeout(initEventsSwiper, 150);
    });
});
