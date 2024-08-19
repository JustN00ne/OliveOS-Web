// Login UI Toggle Module
const LoginUIToggle = (function() {
    let originalContent = '';
    let loginFrame;
    let moreOptionsButton;

    function init(loginFrameId, moreOptionsId) {
        loginFrame = document.getElementById(loginFrameId);
        moreOptionsButton = document.getElementById(moreOptionsId);

        if (loginFrame && moreOptionsButton) {
            moreOptionsButton.addEventListener('click', toggleLoginUI);
        } else {
            console.error('Login frame or More options button not found');
        }
    }

    function toggleLoginUI() {
        if (loginFrame.classList.contains('alternate-view')) {
            // Switch back to the original view
            loginFrame.innerHTML = originalContent;
            loginFrame.classList.remove('alternate-view');
            // Reattach event listener to the "More options" button
            moreOptionsButton = document.getElementById('moreoptions');
            if (moreOptionsButton) {
                moreOptionsButton.addEventListener('click', toggleLoginUI);
            }
        } else {
            // Switch to the alternate view
            originalContent = loginFrame.innerHTML;
            loginFrame.innerHTML = `
                <div id="login_inner" class="login_inner">
                    <img src="/assets/img/cls.svg" class="sgnup_close_icon" onclick="LoginUIToggle.toggle()">
                    <button class="loginusingdiscord" type="submit">
                        <i class="fa-brands fa-discord"></i> Log in using Discord
                    </button>
                    <button class="loginusinggoogle" type="submit">
                        <i class="fa-brands fa-google"></i> Log in using Google
                    </button>
                </div>
            `;
            loginFrame.classList.add('alternate-view');
        }
    }

    return {
        init: init,
        toggle: toggleLoginUI
    };
})();

// Usage
document.addEventListener('DOMContentLoaded', function() {
    LoginUIToggle.init('login_frame', 'moreoptions');
});