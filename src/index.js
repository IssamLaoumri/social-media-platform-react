import React from 'react';
import './index.css';
import App from './App';
import {store} from "./store";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";

import global_en from "./i18next/en/global.json";
import global_ar from "./i18next/ar/global.json";
import i18next from "i18next";
import {I18nextProvider} from "react-i18next";
import setupInterceptors from "./services/setupInterceptors";

i18next.init({
    interpolation: {escapeValue: false},
    lng: "en",
    resources: {
        en: {
            global: global_en
        },
        ar: {
            global: global_ar
        }
    }
})

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <I18nextProvider i18n={i18next}>
                <App />
            </I18nextProvider>
        </Provider>
    </React.StrictMode>
);

console.log("Calling setupInterceptors...");
setupInterceptors(store);




