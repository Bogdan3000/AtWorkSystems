import React from 'react';

export function Contact() {
    return (
        <div className="section">
            <h2>Contact Us</h2>
            <form>
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea placeholder="Your Message" rows="5"></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}