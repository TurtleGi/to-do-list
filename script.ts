interface itemType {
  id: number
  msg: string
}
class Item implements itemType {
  id: number
  msg: string
  constructor(id: number, msg: string) {
    this.id = id
    this.msg = msg
  }
}
class methods {
  public static addItem(data: itemType, msg: string, count: number): void {
    data.id = count
    data.msg = msg
    const item = new Item(data.id, data.msg)
    const div: HTMLDivElement = document.createElement('div')
    div.className = 'item'
    div.innerHTML = `
      <div class="item-msg">${item.id}.${item.msg}</div>
      <div class="item-check"><input type="checkbox" class="checkbox" /></div>
      <a class="item-delete">X</a>
      `
    list?.appendChild(div)
  }
  public static removeItem(data: HTMLDivElement): void {
    let parent = data.parentElement
    parent?.removeChild(data) //不能用list remove 会报错
    count--
    resetNum()
  }

  /*   勾选了已完成的事件后修改css样式 */
  public static setLineThrough(data: HTMLInputElement): void {
    let parent = data.parentNode as HTMLDivElement
    let content = parent.previousElementSibling as HTMLDivElement
    if (data.checked) {
      content?.classList.add('check')
    } else {
      content?.classList.remove('check')
    }
  }
}
/* 删除了中间的某一项后需要将后面div的序号重新编排 */
const resetNum = () => {
  list = document.querySelector('main')
  let arr = list?.children as HTMLCollection
  for (let i = 0; i < arr.length; i++) {
    /* 分割字符串 */
    let msg = arr[i].children[0] as HTMLDivElement
    let strArr: string[] = msg.innerHTML.split('.')
    strArr[0] = (i + 1).toString()
    let newStr: string = strArr.join('.')
    msg.innerHTML = newStr
  }
}

let add: HTMLButtonElement | null = document.querySelector('.remind')
let list: HTMLElement | null = document.querySelector('main')
let count: number = 1
let input = document.querySelector('.msg') as HTMLInputElement
let data: itemType = {
  id: 0,
  msg: '',
}
let checkBoxList: NodeListOf<HTMLInputElement> =
  document.querySelectorAll('.checkbox')
let deleteBtn: NodeListOf<HTMLAnchorElement> =
  document.querySelectorAll('.item-delete')
/* 对已有的事件进行勾选事件和删除事件的初始化 */
const init = () => {
  checkBoxList.forEach((item) => {
    item.addEventListener('click', () => {
      methods.setLineThrough(<HTMLInputElement>item)
    })
  })
  deleteBtn.forEach((item) => {
    item.addEventListener('click', () => {
      let data = item.parentElement as HTMLDivElement
      methods.removeItem(data)
    })
  })
}
init()
/* 新增后的item也要绑定勾选事件和删除事件 */
const afterAddCheckEvent = (): void => {
  checkBoxList = document.querySelectorAll('.checkbox')
  let checkBox = <HTMLInputElement>checkBoxList[checkBoxList.length - 1]
  checkBox.addEventListener('click', () => {
    methods.setLineThrough(checkBox)
  })
}
const afterAddDeleteEvent = (): void => {
  deleteBtn = document.querySelectorAll('.item-delete')
  let item = deleteBtn[deleteBtn.length - 1]
  item.addEventListener('click', () => {
    let data = <HTMLDivElement>item.parentElement
    methods.removeItem(data)
  })
}
add?.addEventListener<'click'>('click', () => {
  let msg: string = input.value
  count++
  methods.addItem(data, msg, count)
  afterAddCheckEvent()
  afterAddDeleteEvent()
})
