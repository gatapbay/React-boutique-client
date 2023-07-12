'use strict';
//** SETUP
// Thời gian mỗi thông báo hiển thị trên màn hình
const NOTIFY_DEFAULT_DELAY = 5;
// Template mặc định của thông báo
const NOTIFY_DEFAULT_ADDON = 'primary';

//** POPUP
const popup = function (id) {
    const popupId = document.getElementById(id);
    const closeEl = document.querySelectorAll('.close');
    const overlays = document.querySelectorAll('.overlay');

    popupId.classList.remove('hidden');
    for (let i = 0; i < closeEl.length; i++) {
        closeEl[i].addEventListener('click', function () {
            popupId.classList.add('hidden');
        });
    }
    overlays.forEach(el => {
        el.addEventListener('click', function () {
            popupId.classList.add('hidden');
        });
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !popupId.classList.contains('hidden')) {
            popupId.classList.add('hidden');
        }
    });
    return popupId;
};

//** NOTIFI
const notify = function (set) {
    if (!document.getElementById('app__notifies')) {
        const na = document.createElement('div');
        na.setAttribute("id", "app__notifies");
        na.classList.add('notify-area');
        document.body.appendChild(na);
    }
    const notifyData = Object.assign({
        message: '',
        link: null,
        delay: NOTIFY_DEFAULT_DELAY,
        close: true,
        addon: NOTIFY_DEFAULT_ADDON
    }, set);
    const area_notifies = document.getElementById('app__notifies');
    const n = document.createElement('div');
    n.setAttribute('class', 'notify ' + notifyData.addon);
    n.innerHTML = `
        <div class="notify-message">${notifyData.message}</div>
        <div class="notify-close">&times;</div>
    `;
    if (notifyData['delay'] != 0) {
        let live = false;
        let max = notifyData['delay'];
        let timer;

        n.addEventListener('mouseover', function () {
            live = true;
        });
        n.addEventListener('mouseout', function () {
            live = false;
            if (max < 5) max = 5;
        });
        timer = setInterval(function () {
            if (!live) {
                if (max > 0) {
                    max -= 1;
                } else {
                    n.classList.add('done');
                    setTimeout(function () {
                        n.remove();
                    }, 1000);
                }
            }
        }, 1000);
    }
    area_notifies.appendChild(n);
    document.querySelectorAll('.notify-close').forEach(cl => {
        cl.addEventListener('click', function (e) {
            this.closest('.notify').remove();
        })
    });

    return n;
}