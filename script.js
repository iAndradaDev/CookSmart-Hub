const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqkar4CdhsOgeVLf1Yjj34YqplgsSgTwlHJ3zJCKs4eXnPURQsqDH7yh5vZDx8Qg3Yvw/exec';

            document.getElementById('feedbackForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                const form = e.target;
                const submitBtn = document.getElementById('submitBtn');
                const statusMsg = document.getElementById('formStatus');
                
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
                statusMsg.className = 'form-status-msg processing';
                statusMsg.innerText = 'Submitting your entry...';

                const formData = new FormData(form);

                fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    statusMsg.className = 'form-status-msg success';
                    statusMsg.innerText = 'Thank you! Your feedback has been successfully recorded.';
                    form.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    statusMsg.className = 'form-status-msg error';
                    statusMsg.innerText = 'Oops! Something went wrong. Please check your connection and try again.';
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Submit Feedback';
                });
            });