import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #f0f2f5;
        --red: #E52E4D;
        --green: #33CC95;
        --blue: #5429CC;
        --blue-light: #6933FF;
        --text-title: #363f5f;
        --text-body: #969cb2;
        --shape: #FFFFFF;
        --light: #FFF;
    }

    * {
        margin: 0;
        padding: 0;

        transition: all 0.2s;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }
        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }

    body {
        background: var(--background);
        -webkit-font-smoothing: antialised; 
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
        outline: none;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    .react-modal-overlay{
        background: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        bottom:0;
        left:0;
        right:0;
        
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .react-modal-content{
        position: relative;
        width: 100%;
        max-width: 576px;
        background: var(--background);
        padding: 3rem;
        border-radius: 0.25rem;
    }

    .btn-ract-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: 0;
        background: transparent;

        &:hover {
            filter: brightness(0.9);
        }
    }
`;
