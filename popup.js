document.getElementById('verifyButton').addEventListener('click', () => {
    const urlInput = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('result');

    if (isValidGoogleSheetsUrl(urlInput)) {
        verifyGoogleSheetsUrl(urlInput)
            .then(isValid => {
                resultDiv.textContent = isValid ? 'Valid Google Sheet URL!' : 'Invalid Google Sheet URL.';
            })
            .catch(() => {
                resultDiv.textContent = 'Error verifying the URL.';
            });
    } else {
        resultDiv.textContent = 'Invalid URL format.';
    }
});

function isValidGoogleSheetsUrl(url) {
    const regex = /^https:\/\/docs\.google\.com\/spreadsheets\/d\/.+\/edit$/;
    return regex.test(url);
}

async function verifyGoogleSheetsUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
