// LanguagePicker.js                                                                                                                   

import { useState } from 'react'

function getFlagEmoji(countryCode) {
    const offset = 127397
    return [...countryCode].map(char => String.fromCodePoint(char.charCodeAt(0) + offset)).join('')
}

const LanguagePicker = ({ handleChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('english')

    const handleLanguageChange = (event) => {
        const language = event.target.value
        setSelectedLanguage(language)
        handleChange(language)
    };

    return (
        <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en">{getFlagEmoji('GB')} | English</option>
            <option value="jp">{getFlagEmoji('JP')} | Japanese</option>
            {/* other language options here */}
        </select>
    );
};

export default LanguagePicker;     