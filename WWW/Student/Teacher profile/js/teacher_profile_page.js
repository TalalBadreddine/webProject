// Grap elements
const selectElement = selector => {
    const element = document.querySelector(selector);
    if(element) return element;
    throw new Error(`Something went, make sure that $(selector) exists or is typed correctly.`);
};

//pop-up report

const reportBtn = selectElement('#report-btn');
const closeBtn = selectElement('#close-btn-report');
const reportPage = selectElement('#report-container');
const messageBtn = selectElement('#message-btn')

reportBtn.addEventListener('click', () => reportPage.classList.add('activated'));
closeBtn.addEventListener('click', () => reportPage.classList.remove('activated'));
// messageBtn.addEventListener('click', () => window. )




