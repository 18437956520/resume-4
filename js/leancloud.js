! function () {
    var view = document.querySelector('section.message')

    var controller = {
        view: null,
        messageList: null,
        init: function (view) {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.initAV()
            this.loadMessages()
            this.bindEvents()
        },
        initAV: function () {
            var APP_ID = 'HCvcsO4BR07NaFVLHsiEu1gW-gzGzoHsz';
            var APP_KEY = 'EfobIcGHRYQ8iBflM5KAVrro';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            })
            console.log(1)
        },
        loadMessages: function () {
            var query = new AV.Query('Message');
            query.find().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}: ${item.content}`
                        this.messageList.append(li)
                    })
                }
            )
            console.log(2)
        },
        bindEvents: function () {
            let myForm = this.form
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
                    messageList.appendChild(li)
                    myForm.querySelector('input[name=content]').value = ''
                })
                console.log(4)
            })
            console.log(3)
        },
    }
    controller.init(view)
}.call()