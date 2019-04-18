var APP_ID = 'HCvcsO4BR07NaFVLHsiEu1gW-gzGzoHsz';
var APP_KEY = 'EfobIcGHRYQ8iBflM5KAVrro';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find().then(
    function (messages) {
        let array = messages.map((item) => item.attributes)
        array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}: ${item.content}`
            let messageList = document.querySelector('#messageList')
            messageList.append(li)
        })
    }
)   

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message')
    var message = new Message()
    message.save({
        'name': name,
        'content': content
    }).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}: ${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.append(li)
        myForm.querySelector('input[name=content]').value = ''
    })
})

/*example
// 创建 TestObject 表 
var TestObject = AV.Object.extend('TestObject');
// 在表中创建一行数据
var testObject = new TestObject();
// 数据内容为 words: 'Hello World!' 保存
// 保存成功 则运行 alert('')
testObject.save({
    words: 'Hello World!'
}).then(function (object) {
    
})
*/