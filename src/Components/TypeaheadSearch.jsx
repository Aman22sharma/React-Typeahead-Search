import React, { useState } from 'react'

export default function TypeaheadSearch({ onSearch }) {

    const [input, setInput] = useState('')

    // Runs whenever the user types
    const handleChange = (e) => {
        const value = e.target.value;
        setInput(value);
        onSearch(value);
    };

    // Runs when the Search button is clicked or Enter is pressed
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input);
    };

    return (
        <form class="d-flex" role="search" onSubmit={handleSubmit}>
            <input value={input} onChange={handleChange} class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
    )
}
