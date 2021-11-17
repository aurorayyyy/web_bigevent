$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //从layui中获取ui对象
    var form = layui.form
    var layer = layui.layer
        //通过form.veryfy()函数自定义校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

            //校验两次密码是否一致
            repwd: function(value) {
                //value是密码框中的内容
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
        //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
                //自动跳转到登录页面
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                    //将登录成功得到的token字符串保存到LocalStorage中
                localStorage.setItem('token', res.token)

                //登录成功之后跳转到主页面
                location.href = '/index.html'


            }
        })
    })
})