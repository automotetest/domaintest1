const dns = require('dns');

// Function to verify email address existence using DNS MX lookup
async function verifyEmailAddress(email) {
    try {
        const [, domain] = email.split('@'); // Extract domain from email address
        if (!domain) {
            throw new Error('Invalid email address');
        }

        // Perform DNS MX lookup for the domain
        const mxRecords = await dns.promises.resolveMx(domain);

        // If we have any MX records, assume email domain is valid
        if (mxRecords && mxRecords.length > 0) {
            return true;
        } else {
            return false;
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
