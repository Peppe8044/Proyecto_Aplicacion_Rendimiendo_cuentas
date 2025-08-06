document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(mobileMenu.offsetParent !== null){
                 mobileMenu.classList.add('hidden');
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const header = document.getElementById('header');
    
    const options = {
        rootMargin: `-${header.offsetHeight}px`,
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    const tabsContainer = document.getElementById('tabs-container');
    const tabsContent = document.getElementById('tabs-content');

    tabsContainer.addEventListener('click', (e) => {
        const tabButton = e.target.closest('.tab');
        if (!tabButton) return;

        tabsContainer.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
        tabButton.classList.add('active');

        tabsContent.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        tabsContent.querySelector(`[data-content="${tabButton.dataset.tab}"]`).classList.remove('hidden');
    });

    const slider = document.getElementById('hoursSlider');
    const hoursValue = document.getElementById('hoursValue');
    const ctx = document.getElementById('timeSavedChart').getContext('2d');
    
    const chartData = {
        labels: ['Gestión Manual', 'Con GastoÁgil'],
        datasets: [{
            label: 'Horas por Mes',
            data: [16, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        }]
    };

    const timeSavedChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw} horas`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Horas Mensuales'
                    }
                }
            }
        }
    });

    function updateChart() {
        const weeklyHours = parseInt(slider.value);
        hoursValue.textContent = `${weeklyHours} hrs`;
        const manualMonthlyHours = weeklyHours * 4;
        const agileMonthlyHours = manualMonthlyHours * 0.125;
        
        timeSavedChart.data.datasets[0].data[0] = manualMonthlyHours;
        timeSavedChart.data.datasets[0].data[1] = agileMonthlyHours.toFixed(1);
        timeSavedChart.update();
    }

    slider.addEventListener('input', updateChart);
    updateChart();

    // --- Escanear Boleta: Lógica de formulario ---
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('fileInput');
    const resultado = document.getElementById('resultado');
    const textoExtraido = document.getElementById('textoExtraido');

    if (uploadForm && fileInput && resultado && textoExtraido) {
        uploadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const file = fileInput.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('file', file);
            // Mostrar cargando
            textoExtraido.textContent = 'Procesando...';
            resultado.classList.remove('hidden');
            try {
                const response = await fetch('http://127.0.0.1:8000/ocr', {
                    method: 'POST',
                    body: formData
                });
                if (!response.ok) {
                    throw new Error('Error al procesar la imagen');
                }
                const data = await response.json();
                textoExtraido.textContent = data.texto_extraido || '(Sin texto extraído)';
            } catch (err) {
                textoExtraido.textContent = 'Ocurrió un error: ' + err.message;
            }
        });
    }
});