async function verifyEmailAddress(email) {
    try {
        const [, domain] = email.split('@'); // Extract domain from email address
        if (!domain) {
            throw new Error('Invalid email address');
        }

        // Perform DNS MX lookup using a DNS-over-HTTPS (DoH) service
        const dnsApiUrl = `https://dns.google/resolve?name=${domain}&type=MX`;
        const response = await fetch(dnsApiUrl);
        const data = await response.json();

        // Check if MX records exist in the response
        const mxRecords = data.Answer;
        if (mxRecords && mxRecords.length > 0) {
            return true; // Email domain is valid
        } else {
            return false; // No MX records found
        }
    } catch (error) {
        console.error('Error verifying email address:', error.message);
        return false; // Return false on any error
    }
}

// Example usage
const emailToVerify = 'example@example.com';
verifyEmailAddress(emailToVerify)
    .then(valid => {
        if (valid) {
            console.log(`Email address ${emailToVerify} is valid`);
        } else {
            console.log(`Email address ${emailToVerify} is invalid or domain does not exist`);
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
