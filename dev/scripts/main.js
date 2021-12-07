(function() {
    if(document.getElementById('cookieButton')) {
        document.querySelectorAll('#cookieButton, #cookieButton2').forEach((element) => {
            element.addEventListener('click', () => {
                console.log('ran')
                document.getElementById('cookieMessage').classList.add('js-hidden');
            });
        })
    }
})();
