"use strict";
class Item {
    constructor(id, msg, check = false) {
        this.id = id;
        this.msg = msg;
        this.check = check;
    }
}
class methods {
    static addItem(data, msg, count) {
        data.id = count;
        data.msg = msg;
        const item = new Item(data.id, data.msg, data.check);
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
      <div class="item-msg">${item.id}.${item.msg}</div>
      <div class="item-check"><input type="checkbox" class="checkbox" /></div>
      <a class="item-delete">X</a>
      `;
        list === null || list === void 0 ? void 0 : list.appendChild(div);
    }
    static removeItem(data) {
        let parent = data.parentElement;
        parent === null || parent === void 0 ? void 0 : parent.removeChild(data); //不能用list remove 会报错
        count--;
        resetNum();
    }
    /*   勾选了已完成的事件后修改css样式 */
    static setLineThrough(data) {
        let parent = data.parentNode;
        let content = parent.previousElementSibling;
        if (data.checked) {
            content === null || content === void 0 ? void 0 : content.classList.add('check');
        }
        else {
            content === null || content === void 0 ? void 0 : content.classList.remove('check');
        }
    }
}
/* 删除了中间的某一项后需要将后面div的序号重新编排 */
const resetNum = () => {
    list = document.querySelector('main');
    let arr = list === null || list === void 0 ? void 0 : list.children;
    for (let i = 0; i < arr.length; i++) {
        /* 分割字符串 */
        let msg = arr[i].children[0];
        let strArr = msg.innerHTML.split('.');
        strArr[0] = (i + 1).toString();
        let newStr = strArr.join('.');
        msg.innerHTML = newStr;
    }
};
let add = document.querySelector('.remind');
let list = document.querySelector('main');
let count = 1;
let input = document.querySelector('.msg');
let data = {
    id: 0,
    msg: '',
    check: false,
};
let checkBoxList = document.querySelectorAll('.checkbox');
let deleteBtn = document.querySelectorAll('.item-delete');
/* 对已有的事件进行勾选事件和删除事件的初始化 */
const init = () => {
    checkBoxList.forEach((item) => {
        item.addEventListener('click', () => {
            methods.setLineThrough(item);
        });
    });
    deleteBtn.forEach((item) => {
        item.addEventListener('click', () => {
            let data = item.parentElement;
            methods.removeItem(data);
        });
    });
};
init();
/* 新增后的item也要绑定勾选事件和删除事件 */
const afterAddCheckEvent = () => {
    checkBoxList = document.querySelectorAll('.checkbox');
    let checkBox = checkBoxList[checkBoxList.length - 1];
    checkBox.addEventListener('click', () => {
        methods.setLineThrough(checkBox);
    });
};
const afterAddDeleteEvent = () => {
    deleteBtn = document.querySelectorAll('.item-delete');
    let item = deleteBtn[deleteBtn.length - 1];
    item.addEventListener('click', () => {
        let data = item.parentElement;
        methods.removeItem(data);
    });
};
add === null || add === void 0 ? void 0 : add.addEventListener('click', () => {
    let msg = input.value;
    count++;
    methods.addItem(data, msg, count);
    afterAddCheckEvent();
    afterAddDeleteEvent();
});
