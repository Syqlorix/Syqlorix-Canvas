document.addEventListener('DOMContentLoaded', () => {
        const exportCodeBtn = document.getElementById('exportCodeBtn');
        const syqlorixCodePre = document.getElementById('syqlorixCode');
        const htmlPreviewFrame = document.getElementById('htmlPreviewFrame');
        const tabButtons = document.querySelectorAll('#output-tabs .tab-button');
        const tabContents = document.querySelectorAll('#output-area .tab-content');

        exportCodeBtn.addEventListener('click', async () => {
            syqlorixCodePre.textContent = 'Generating code...';
            htmlPreviewFrame.srcdoc = '';

            const designData = {
                message: "Hello from the frontend!",
                title: "My Syqlorix Design"
            };

            try {
                const response = await fetch('/generate_code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(designData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                syqlorixCodePre.textContent = data.syqlorix_code;
                htmlPreviewFrame.srcdoc = data.rendered_html; // Update iframe content

            } catch (error) {
                syqlorixCodePre.textContent = `Error: ${error.message}\nCheck backend console.`;
                console.error('Error generating code:', error);
            }
        });

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                button.classList.add('active');
                document.getElementById(`${button.dataset.tab}-output-area`).classList.add('active');
            });
        });

        exportCodeBtn.click();
    });